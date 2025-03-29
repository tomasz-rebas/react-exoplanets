import { useEffect, useState } from "react";

import { getQuery } from "./helpers/getQuery";
import { parseCsvToObject } from "./helpers/parseCsvToObject";
import { getUniquePlanets } from "./helpers/getUniquePlanets";
import { getInitiallyActiveFilters } from "./helpers/getInitiallyActiveFilters";

import tableColumns from "./data/tableColumns.json";
import fallbackData from "./data/fallbackData.json";

import { Header } from "./components/Header/Header";
import { Filters } from "./components/Filters/Filters";
import { PlanetList } from "./components/PlanetList/PlanetList";
import { FetchAlert } from "./components/FetchAlert/FetchAlert";
import { Footer } from "./components/Footer";

import { ActiveFilter } from "./types/ActiveFilter";
import { useQuery } from "@tanstack/react-query";
import { Entry } from "./types/Entry";
import { TableColumn } from "./types/TableColumn";

const fetchAndParseData = async () => {
  const proxy = import.meta.env.VITE_CORS_PROXY;
  const baseUrl = import.meta.env.VITE_EXOPLANET_ARCHIVE;
  const query = getQuery(tableColumns, false);

  const url = `${proxy}?${baseUrl}?query=${query}&format=csv`;

  console.log(`Fetching data from: ${url}`);

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch");
  const rawData = await response.text();

  const parsedData = parseCsvToObject(rawData);
  const strippedData = getUniquePlanets(parsedData);

  return strippedData;
};

export const App = () => {
  const {
    isLoading,
    data: planetaryData,
    error,
  } = useQuery(["data"], fetchAndParseData);

  const [isSidebarOpened, setIsSidebarOpened] = useState<boolean>(false);
  const [activeFilters, setActiveFilters] = useState<Array<ActiveFilter>>();
  const [shouldShowfallback, setShouldShowFallback] = useState<boolean>(false);

  useEffect(() => {
    if (planetaryData) {
      setActiveFilters(
        getInitiallyActiveFilters(planetaryData, tableColumns as TableColumn[])
      );
    }

    if (error) {
      setActiveFilters(
        getInitiallyActiveFilters(fallbackData, tableColumns as TableColumn[])
      );
      setTimeout(() => setShouldShowFallback(true), 2000);
    }
  }, [planetaryData, error]);

  if (isLoading || !activeFilters) {
    return <FetchAlert />;
  }

  if (error && !shouldShowfallback) {
    return <FetchAlert isLoadingFallback />;
  }

  return (
    <div>
      <Header
        isSidebarOpened={isSidebarOpened}
        setIsSidebarOpened={setIsSidebarOpened}
      />
      <Filters
        isSidebarOpened={isSidebarOpened}
        setIsSidebarOpened={setIsSidebarOpened}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />
      <PlanetList
        planetaryData={
          shouldShowfallback ? fallbackData : (planetaryData as Entry[])
        }
        activeFilters={activeFilters}
        tableColumns={tableColumns as TableColumn[]}
      />
      <Footer />
    </div>
  );
};

import { useEffect, useState } from "react";

import getQuery from "./functions/getQuery";
import parseCsvToObject from "./functions/parseCsvToObject";
import { getUniquePlanets } from "./functions/getUniquePlanets";
import { getInitiallyActiveFilters } from "./functions/getInitiallyActiveFilters";

import tableColumns from "./data/tableColumns.json";
import fallbackData from "./data/fallbackData.json";

import Header from "./components/Header/Header";
import Filters from "./components/Filters/Filters";
import PlanetList from "./components/PlanetList/PlanetList";
import FetchAlert from "./components/FetchAlert/FetchAlert";
import Footer from "./components/Footer";

import { ActiveFilter } from "./interfaces/ActiveFilter";
import { useQuery } from "@tanstack/react-query";
import { Entry } from "./interfaces/Entry";

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

export default function App() {
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
      setActiveFilters(getInitiallyActiveFilters(planetaryData, tableColumns));
    }

    if (error) {
      setActiveFilters(getInitiallyActiveFilters(fallbackData, tableColumns));
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
        tableColumns={tableColumns}
      />
      <Footer />
    </div>
  );
}

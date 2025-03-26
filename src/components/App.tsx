import { useEffect, useState } from "react";

import getQuery from "../functions/getQuery";
import convertCsvToObject from "../functions/convertCsvToObject";
import getUniquePlanets from "../functions/getUniquePlanets";
import getInitiallyActiveFilters from "../functions/getInitiallyActiveFilters";

import tableColumns from "../tableColumns.json";

import Header from "./Header";
import Filters from "./Filters";
import PlanetList from "./PlanetList";
import FetchAlert from "./FetchAlert";
import Footer from "./Footer";

import { ActiveFilter } from "../interfaces/ActiveFilter";
import { useQuery } from "@tanstack/react-query";

const fetchAndParseData = async () => {
  const proxy = import.meta.env.VITE_CORS_PROXY;
  const baseUrl = import.meta.env.VITE_EXOPLANET_ARCHIVE;
  const query = getQuery(tableColumns, true);

  const url = `${proxy}?${baseUrl}?query=${query}&format=csv`;

  console.log(`Fetching data from: ${url}`);

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch");
  const rawData = await response.text();

  const convertedData = convertCsvToObject(rawData);
  const strippedData = getUniquePlanets(convertedData);

  return strippedData;
};

export default function App() {
  const { data: planetaryData, error } = useQuery(["data"], fetchAndParseData);

  const [isSidebarOpened, setIsSidebarOpened] = useState<boolean>(false);
  const [activeFilters, setActiveFilters] = useState<Array<ActiveFilter>>();

  useEffect(() => {
    if (planetaryData) {
      setActiveFilters(getInitiallyActiveFilters(planetaryData, tableColumns));
    }
  }, [planetaryData]);

  return planetaryData && activeFilters ? (
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
        planetaryData={planetaryData}
        activeFilters={activeFilters}
        tableColumns={tableColumns}
      />
      <Footer />
    </div>
  ) : (
    <FetchAlert error={error} />
  );
}

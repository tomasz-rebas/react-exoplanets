import { useState, useMemo } from "react";
import { PlanetCard } from "../PlanetCard/PlanetCard";
import { Paging } from "../Paging/Paging";

import { Entry } from "../../types/Entry";
import { ActiveFilter } from "../../types/ActiveFilter";
import { TableColumn } from "../../types/TableColumn";

import { shouldEntryBeFilteredOut } from "./helpers/shouldEntryBeFilteredOut";
import { Container, List } from "./PlanetList.theme";

type Props = {
  planetaryData: Entry[];
  activeFilters: ActiveFilter[];
  tableColumns: TableColumn[];
};

export const PlanetList = ({
  planetaryData,
  activeFilters,
  tableColumns,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(24);

  const planetaryDataAfterFiltering = useMemo(
    () =>
      planetaryData.filter(
        (element) => !shouldEntryBeFilteredOut(element, activeFilters)
      ),
    [planetaryData, activeFilters]
  );

  const numberOfPages = Math.floor(
    planetaryDataAfterFiltering.length / itemsPerPage + 1
  );

  let planets = [];

  for (
    let i = (currentPage - 1) * itemsPerPage;
    i < currentPage * itemsPerPage;
    i++
  ) {
    if (i < planetaryDataAfterFiltering.length) {
      planets.push(
        <PlanetCard
          data={planetaryDataAfterFiltering[i]}
          key={planetaryDataAfterFiltering[i].pl_name + "_" + i}
          tableColumns={tableColumns}
        />
      );
    }
  }

  return (
    <Container>
      <Paging
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <List>{planets}</List>
      <Paging
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
};

import { styled } from "@mui/system";

import { getRoundedValue } from "../functions/getRoundedValue";

import { Entry } from "../interfaces/Entry";
import { TableColumn } from "../interfaces/TableColumn";
import { Card } from "@mui/material";
import { useMemo } from "react";

type Props = {
  data: Entry;
  tableColumns: TableColumn[];
};

const StyledCard = styled(Card)({
  width: "250px",
  padding: "10px",
  margin: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
});

const PlanetIcon = styled("img")({
  width: "70px",
  height: "70px",
});

const DataRow = styled("div")({
  marginTop: "4px",
  marginBottom: "4px",
});

export default function PlanetCard({ data, tableColumns }: Props) {
  const dataForDisplay = useMemo(() => {
    let dataRows = [];
    for (const property in data) {
      const key = property as keyof Entry;
      for (let i = 0; i < tableColumns.length; i++) {
        if (
          tableColumns[i].databaseColumnName === key &&
          tableColumns[i].databaseColumnName !== "pl_name"
        ) {
          let value;
          if (tableColumns[i].dataType === "number") {
            value = getRoundedValue(Number(data[key]));
          } else {
            value = data[key];
          }

          const label = tableColumns[i].tableLabel;
          const unit = tableColumns[i].unit;
          dataRows.push(
            <DataRow key={label}>
              <strong>{label}: </strong>
              <span>
                {value} {unit}
              </span>
            </DataRow>
          );
        }
      }
    }
    return dataRows;
  }, [data, tableColumns]);

  const { pl_dens, pl_name } = data;

  return (
    <StyledCard variant="outlined">
      <PlanetIcon
        src={parseFloat(pl_dens) < 2 ? "gas-giant.svg" : "rocky-planet.svg"}
        alt="Planet"
      />
      <h4>{pl_name}</h4>
      {dataForDisplay}
    </StyledCard>
  );
}

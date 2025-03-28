import { styled } from "@mui/system";
import { Card } from "@mui/material";

export const StyledCard = styled(Card)({
  width: "250px",
  padding: "10px",
  margin: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
});

export const PlanetIcon = styled("img")({
  width: "70px",
  height: "70px",
});

export const DataRow = styled("div")({
  marginTop: "4px",
  marginBottom: "4px",
});

import { CircularProgress } from "@mui/material";
import { Container } from "./FetchAlert.theme";

type Props = {
  isLoadingFallback?: boolean;
};

export default function FetchAlert({ isLoadingFallback }: Props) {
  return (
    <Container>
      {isLoadingFallback ? (
        <div>
          <p>Error occured during fetch.</p>
          <p>Loading fallback data from 1 Sep 2024...</p>
          <CircularProgress />
        </div>
      ) : (
        <div>
          <p>Fetching data.</p>
          <p>Please wait...</p>
          <CircularProgress />
        </div>
      )}
    </Container>
  );
}

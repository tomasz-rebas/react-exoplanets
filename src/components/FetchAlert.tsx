import { CircularProgress } from "@mui/material";
import { styled } from "@mui/system";

type Props = {
  didFetchFail: boolean;
};

const Container = styled("div")({
  textAlign: "center",
  position: "absolute",
  left: "50%",
  top: "45%",
  transform: "translate(-50%, -50%)",
});

export default function FetchAlert({ didFetchFail }: Props) {
  return (
    <Container>
      {didFetchFail ? (
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

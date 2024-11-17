import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@mui/material";

type Props = {
  didFetchFail: boolean;
};

const useStyles = makeStyles({
  fetchAlert: {
    textAlign: "center",
    position: "absolute",
    left: "50%",
    top: "45%",
    transform: "translate(-50%, -50%)",
  },
});

export default function FetchAlert({ didFetchFail }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.fetchAlert}>
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
    </div>
  );
}

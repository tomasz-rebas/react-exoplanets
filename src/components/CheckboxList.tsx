import { makeStyles } from "@material-ui/core/styles";

import getToggledTextFilters from "../functions/getToggledTextFilters";
import { ActiveFilter } from "../interfaces/ActiveFilter";
import { Button } from "@mui/material";

type Props = {
  tableLabel: string;
  name: string;
  checkboxes: JSX.Element[];
  setActiveFilters: Function;
};

const useStyles = makeStyles({
  selectAllButton: {
    marginTop: "15px",
  },
  inputContainer: {
    paddingTop: "10px",
    paddingBottom: "10px",
  },
});

export default function CheckboxList({
  tableLabel,
  name,
  checkboxes,
  setActiveFilters,
}: Props) {
  const classes = useStyles();

  const selectAllCheckboxes = () => {
    setActiveFilters((previousState: ActiveFilter[]) =>
      getToggledTextFilters(previousState, name)
    );
  };

  return (
    <div className={classes.inputContainer}>
      <h4>{tableLabel}</h4>
      <div>{checkboxes}</div>
      <Button
        variant="contained"
        className={classes.selectAllButton}
        onClick={selectAllCheckboxes}
      >
        Select All
      </Button>
    </div>
  );
}

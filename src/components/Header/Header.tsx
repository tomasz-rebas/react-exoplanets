import { AppBar } from "@mui/material";
import { FilterIcon, StyledToolbar } from "./Header.theme";

type Props = {
  isSidebarOpened: boolean;
  setIsSidebarOpened: Function;
};

export const Header = ({ isSidebarOpened, setIsSidebarOpened }: Props) => (
  <AppBar>
    <StyledToolbar>
      <FilterIcon
        onClick={() => {
          setIsSidebarOpened(!isSidebarOpened);
        }}
        fontSize="large"
      >
        filter_list
      </FilterIcon>
      <h3>Exoplanets Archive</h3>
    </StyledToolbar>
  </AppBar>
);

import { styled } from "@mui/system";
import { AppBar, Icon, Toolbar } from "@mui/material";

type Props = {
  isSidebarOpened: boolean;
  setIsSidebarOpened: Function;
};

const StyledToolbar = styled(Toolbar)({
  justifyContent: "space-between",
});

const FilterIcon = styled(Icon)({
  cursor: "pointer",
});

export default function Header({ isSidebarOpened, setIsSidebarOpened }: Props) {
  return (
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
}

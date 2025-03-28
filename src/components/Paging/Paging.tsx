import { StyledPagination } from "./Paging.theme";

type Props = {
  numberOfPages: number;
  currentPage: number;
  setCurrentPage: Function;
};

export const Paging = ({
  numberOfPages,
  currentPage,
  setCurrentPage,
}: Props) => (
  <StyledPagination
    count={numberOfPages}
    color="primary"
    size="large"
    onChange={(_, page) => {
      setCurrentPage(page);
    }}
    page={currentPage}
  />
);

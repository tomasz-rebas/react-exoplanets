import { StyledPagination } from "./Paging.theme";

type Props = {
  numberOfPages: number;
  currentPage: number;
  setCurrentPage: Function;
};

export default function Paging({
  numberOfPages,
  currentPage,
  setCurrentPage,
}: Props) {
  return (
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
}

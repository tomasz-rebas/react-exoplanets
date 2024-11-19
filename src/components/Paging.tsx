import { styled } from "@mui/system";
import { Pagination } from "@mui/material";

type Props = {
  numberOfPages: number;
  currentPage: number;
  setCurrentPage: Function;
};

const StyledPagination = styled(Pagination)({
  display: "flex",
  justifyContent: "center",
});

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
      onChange={(event, page) => {
        setCurrentPage(page);
      }}
      page={currentPage}
    />
  );
}

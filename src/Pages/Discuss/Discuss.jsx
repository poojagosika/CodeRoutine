// src/components/Discuss.js
import React, { useEffect, useState, useCallback } from "react";
import {
  List,
  Container,
  Box,
  Button,
  InputBase,
  IconButton,
  TablePagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiscussions } from "../../features/discuss/discussAction";
import DiscussList from "./DiscussList";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DiscussLoading from "./Loading/DiscussLoading";
import NewPost from "./NewPost";

const Discuss = () => {
  const dispatch = useDispatch();
  const { discussions, loading, totalPages } = useSelector(
    (state) => state.discussions
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchDiscussionsData = useCallback(() => {
    dispatch(fetchDiscussions({ page, limit, sortBy, order, searchTerm }));
  }, [dispatch, page, limit, sortBy, order, searchTerm]);

  useEffect(() => {
    fetchDiscussionsData();
  }, [fetchDiscussionsData]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setPage(0);
    fetchDiscussionsData();
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    handleSearch(searchTerm);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setOrder("desc"); // Default to descending order when changing sort field
    }
    setPage(1); // Reset to first page on sort change
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, minHeight: "100vh" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <InputBase
          placeholder="Search..."
          style={{ width: 300 }}
          value={searchTerm}
          onChange={handleSearchChange}
          inputProps={{ "aria-label": "search" }}
          sx={{
            border: "1px solid #ced4da",
            borderRadius: "4px",
            padding: "2px 12px",
          }}
          size="small"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialog}
          startIcon={<OpenInNewIcon />}
          size="small"
        >
          New
        </Button>
      </Box>
      <Box
        mt={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" gap={1}>
          <IconButton onClick={() => handleSort("createdAt")} size="small">
            Created {sortBy === "createdAt" && (order === "asc" ? "↑" : "↓")}
          </IconButton>
          <IconButton onClick={() => handleSort("title")} size="small">
            Title {sortBy === "title" && (order === "asc" ? "↑" : "↓")}
          </IconButton>
          <IconButton onClick={() => handleSort("author")} size="small">
            Author {sortBy === "author" && (order === "asc" ? "↑" : "↓")}
          </IconButton>
          <IconButton onClick={() => handleSort("likes")} size="small">
            Likes {sortBy === "likes" && (order === "asc" ? "↑" : "↓")}
          </IconButton>
        </Box>
      </Box>
      {loading ? (
        <DiscussLoading />
      ) : (
        <List>
          {discussions.map((discussion) => (
            <DiscussList key={discussion._id} discussion={discussion} />
          ))}
        </List>
      )}
      <Box
        mt={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalPages * rowsPerPage}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      <NewPost
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        setDiscussions={() => fetchDiscussionsData()}
        setOpenDialog={setOpenDialog}
      />
    </Container>
  );
};

export default Discuss;

import { useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  TableSortLabel,
  styled,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore, User } from "../../../../services/store/counter/appStore";
import { useToastStore } from "../../../../services/store/snackbar/toastStore";
import MotionWrapper from "../../../../components/animations/MotionWrapper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Animation Variants
const rowVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    transition: { ease: "easeInOut", duration: 0.3 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeInOut", duration: 0.3 },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { ease: [0.19, 1, 0.22, 1], duration: 0.4 },
  },
};

const UserTable = () => {
  const { users, deleteUser } = useAppStore();
  const { showToast } = useToastStore();
  const [sortBy, setSortBy] = useState<keyof User>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (column: keyof User) => {
    const isAsc = sortBy === column && sortOrder === "asc";
    setSortOrder(isAsc ? "desc" : "asc");
    setSortBy(column);
  };

  const handleDelete = (userId: string) => {
    deleteUser(userId);
    showToast("User delete", "danger");
  };

  const sortedUsers = [...users].sort((a, b) => {
    return sortOrder === "asc"
      ? a[sortBy] > b[sortBy]
        ? 1
        : -1
      : a[sortBy] < b[sortBy]
      ? 1
      : -1;
  });

  return (
    <MotionWrapper>
      <TableContainer component={Paper} sx={{ overflowX: "auto", mt: 3 }}>
        <Table stickyHeader>
          <TableHead>
            <StyledTableRow
              sx={{
                "& th": { color: "white", fontWeight: "bold" },
              }}
            >
              <StyledTableCell>
                <TableSortLabel
                  active={sortBy === "name"}
                  direction={sortBy === "name" ? sortOrder : "asc"}
                  onClick={() => handleSort("name")}
                >
                  Name
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell align="center">Count</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>

          <TableBody>
            <AnimatePresence>
              {sortedUsers.map((user) => (
                <motion.tr
                  key={user.userId}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={rowVariants}
                  style={{
                    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                    transition:
                      "background 0.3s cubic-bezier(0.19, 1, 0.22, 1)",
                  }}
                  whileHover={{
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                    transition: { duration: 0.2, ease: [0.19, 1, 0.22, 1] },
                  }}
                >
                  <StyledTableCell>{user.name}</StyledTableCell>
                  <StyledTableCell>{user.email}</StyledTableCell>
                  <StyledTableCell>{user.phone}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography fontWeight="bold">{user.count}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      onClick={() => handleDelete(user.userId)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </TableContainer>
    </MotionWrapper>
  );
};

export default UserTable;

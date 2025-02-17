import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useUserStore } from "../../../services/store/counter/userStore";

const RichTextEditor = () => {
  const { users, selectedUserId, setSelectedUser } = useUserStore();
  const selectedUser = users.find((user) => user.userId === selectedUserId);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (selectedUser) {
      const savedContent = localStorage.getItem(
        `richText-${selectedUser.userId}`
      );
      setContent(savedContent || "");
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem(`richText-${selectedUser.userId}`, content);
    }
  }, [content, selectedUser]);

  return (
    <Box sx={{ maxWidth: "800px", margin: "auto", padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Rich Text Editor
      </Typography>

      {/* User Selection Dropdown */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Select User</InputLabel>
        <Select
          value={selectedUserId || ""}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          {users.map((user) => (
            <MenuItem key={user.userId} value={user.userId}>
              {user.name} ({user.email})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedUser ? (
        <>
          <Typography variant="body1">
            <strong>Name:</strong> {selectedUser.name}
          </Typography>
          <ReactQuill
            value={content}
            onChange={setContent}
            theme="snow"
            style={{ height: "200px", marginTop: "20px" }}
          />
        </>
      ) : (
        <Typography variant="body1" color="error">
          Please select a user to edit.
        </Typography>
      )}
    </Box>
  );
};

export default RichTextEditor;

import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Typography } from "@mui/material";
import { useAppStore } from "../../services/store/counter/appStore";
import MotionWrapper from "../../components/animations/MotionWrapper";
import GlobalAutocomplete from "../../components/dropdown/GlobalAutocomplete";

const RichTextEditor = () => {
  const { users, selectedUserId, setSelectedUser } = useAppStore();
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
      <MotionWrapper>
        <Typography variant="h5" gutterBottom>
          Rich Text Editor
        </Typography>
      </MotionWrapper>
      <MotionWrapper>
        <GlobalAutocomplete
          options={users}
          value={selectedUser || null}
          onChange={(user) => setSelectedUser(user?.userId || "")}
          getOptionLabel={(user) => `${user.name} (${user.email})`}
          label="Select User"
        />
      </MotionWrapper>

      <MotionWrapper>
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
      </MotionWrapper>
    </Box>
  );
};

export default RichTextEditor;

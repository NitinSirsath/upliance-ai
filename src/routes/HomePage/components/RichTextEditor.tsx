import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Typography } from "@mui/material";
import { useUserStore } from "../../../services/store/counter/userStore";

const RichTextEditor = () => {
  const { name, address, email, phone } = useUserStore(); // Get user data from store
  const [content, setContent] = useState("");

  // Load saved content from local storage
  useEffect(() => {
    const savedContent = localStorage.getItem("richTextContent");
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  // Save content to local storage
  useEffect(() => {
    localStorage.setItem("richTextContent", content);
  }, [content]);

  return (
    <Box sx={{ maxWidth: "800px", margin: "auto", padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Rich Text Editor
      </Typography>
      <Typography variant="body1" color="textSecondary">
        User Data:
      </Typography>
      <Typography variant="body2">
        <strong>Name:</strong> {name || "N/A"} <br />
        <strong>Address:</strong> {address || "N/A"} <br />
        <strong>Email:</strong> {email || "N/A"} <br />
        <strong>Phone:</strong> {phone || "N/A"}
      </Typography>

      <ReactQuill
        value={content}
        onChange={setContent}
        theme="snow"
        style={{ height: "200px", marginTop: "20px" }}
      />
    </Box>
  );
};

export default RichTextEditor;

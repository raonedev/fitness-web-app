import React, { useState, useEffect, useRef } from "react";
import { askGemini } from "../utils/gemini";
import ReactMarkdown from "react-markdown";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

const ChatBot = ({ exerciseName }) => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { text: userInput, sender: "You" }];
    setMessages(newMessages);
    setUserInput("");
    setIsTyping(true);

    try {
      const aiReply = await askGemini(userInput,exerciseName);
      setMessages([...newMessages, { text: aiReply, sender: "AI" }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { text: "Error: Failed to get AI response.", sender: "AI" },
      ]);
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: 2,
        bgcolor: "#FF2625",
        color: "#fff",
        borderRadius: 2,
      }}
    >
      {/* Header */}
      <Typography
        variant="h6"
        fontWeight="bold"
        textAlign="center"
        mb={2}
        color="#fff"
      >
        🤖 AI Chatbot
      </Typography>

      {/* Messages */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          pr: 1,
          mb: 2,
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.sender === "You" ? "flex-end" : "flex-start",
              mb: 1,
            }}
          >
            <Box
              sx={{
                maxWidth: "75%",
                bgcolor: msg.sender === "You" ? "#1976d2" : "#c62828",
                color: "#fff",
                p: 1.5,
                borderRadius: 2,
              }}
            >
              <Typography variant="body2" fontWeight="bold" gutterBottom>
                {msg.sender}
              </Typography>
              <Typography
                variant="body2"
                component="div"
                sx={{
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </Typography>
            </Box>
          </Box>
        ))}

        {isTyping && (
          <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 1 }}>
            <Box
              sx={{
                maxWidth: "75%",
                bgcolor: "#c62828",
                color: "#fff",
                p: 1.5,
                borderRadius: 2,
              }}
            >
              <Typography variant="body2" fontWeight="bold" gutterBottom>
                AI
              </Typography>
              <Box display="flex" alignItems="center">
                <CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />
                <Typography variant="body2">Typing...</Typography>
              </Box>
            </Box>
          </Box>
        )}

        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Box display="flex" gap={1}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          size="small"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          sx={{
            bgcolor: "#fff",
            borderRadius: 1,
            input: { color: "#000" },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
          sx={{ bgcolor: "#000", color: "#fff", ":hover": { bgcolor: "#333" } }}
        >
          Send
        </Button>
      </Box>
    </Paper>
  );
};

export default ChatBot;

import React from "react";
import { useParams, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { Box, Typography } from "@mui/material";
import ChatBot from "../components/Chatbot";

const VideoPlayerPage = () => {
  const { videoId } = useParams();
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const location = useLocation();
  const exerciseName = location.state?.exerciseName || "Exercise";
  console.log(exerciseName);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "70vh", // Set the height to 80% of the viewport height
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Video Section */}
      <Box
        sx={{
          width: { xs: "100%", md: "75%" },
          padding: { xs: "20px", md: "40px" },
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: { xs: "250px", md: "100%" }, // Maintain the height scaling
            maxWidth: "900px",
            boxShadow: 3,
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <ReactPlayer
            url={videoUrl}
            playing
            controls
            width="100%"
            height="100%"
          />
        </Box>
      </Box>

      {/* Chatbot Section */}
      <Box
        sx={{
          width: { xs: "100%", md: "35%" }, // Full width on mobile, 1/4 width on desktop
          padding: { xs: "20px", md: "20px 20px 20px 0" }, // Add some spacing
          boxSizing: "border-box",
          height: "100%", 
        }}
      >
        <ChatBot exerciseName={exerciseName} />
      </Box>
    </Box>
  );
};

export default VideoPlayerPage;

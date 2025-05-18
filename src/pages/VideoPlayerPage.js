import React from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Box, Typography } from '@mui/material';

const VideoPlayerPage = () => {
  const { videoId } = useParams();
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        height: '80vh', // Set the height to 80% of the viewport height
        backgroundColor: '#f9f9f9',
      }}
    >
      {/* Video Section */}
      <Box
        sx={{
          width: { xs: '100%', md: '75%' },
          padding: { xs: '20px', md: '40px' },
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        {/* <Typography
          fontWeight="700"
          fontSize={{ xs: '28px', md: '36px' }}
          color="#FF2625"
          mb={3}
          textAlign="center"
        >
          Watch Exercise Demo
        </Typography> */}

        <Box
          sx={{
            width: '100%',
            height: { xs: '250px', md: '100%' }, // Maintain the height scaling
            maxWidth: '900px',
            boxShadow: 3,
            borderRadius: '12px',
            overflow: 'hidden',
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
          width: { xs: '100%', md: '25%' },
          backgroundColor: '#FF2625',
          color: '#fff',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Typography fontWeight="700" fontSize="24px" mb={2}>
          Need Help?
        </Typography>
        {/* <ChatBot /> */}
        <Typography fontSize="14px" mt={2} opacity={0.8}>
          Powered by Fitness Club AI
        </Typography>
      </Box>
    </Box>
  );
};

export default VideoPlayerPage;

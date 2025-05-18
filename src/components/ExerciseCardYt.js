import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function ExerciseCardYT({ exercise }) {
  const fallbackImages = [
    'https://media.istockphoto.com/id/1183038884/photo/view-of-a-row-of-treadmills-in-a-gym-with-people.webp?a=1&b=1&s=612x612&w=0&k=20&c=GQuu-wgXULnH03BgZwedZ37_xWZrcOApnQm34vT_API=',
    'https://media.istockphoto.com/id/1427218939/photo/men-and-woman-cycling-at-gym.webp?a=1&b=1&s=612x612&w=0&k=20&c=ycarHxg1VO77iIEaIYLycBLygu7etPLLrYkdHCe4l1w=',
    'https://media.istockphoto.com/id/1093941786/photo/muscular-build-athlete-climbing-up-the-rope-in-a-gym.jpg?a=1&b=1&s=612x612&w=0&k=20&c=7h944wFfYz1Z9pippa6nkJi77gW4lCtb41ojgjkPJ9A=',
    'https://media.istockphoto.com/id/1093941786/photo/muscular-build-athlete-climbing-up-the-rope-in-a-gym.jpg?a=1&b=1&s=170x170&k=20&c=8jTX_IDjf0iDKY1eX-weQDCxqbmJGpRvccUG5tbxPlU=',
  ];

  // Get random fallback image
  const getRandomFallbackImage = () => fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

  // Function to extract video ID from YouTube URLs
  const getVideoId = (url) => {
    let videoId = null;

    // Check for regular YouTube URL with `v`
    if (url.includes('youtube.com')) {
      const params = new URLSearchParams(new URL(url).search);
      videoId = params.get('v');
      // eslint-disable-next-line brace-style
    }
    // Check for shortened `youtu.be` URL
    else if (url.includes('youtu.be')) {
      const parts = url.split('/');
      const [id] = parts.slice(-1);
      const [cleanedId] = id.split('?'); // Destructure and remove query params
      videoId = cleanedId;
    }

    return videoId;
  };

  const videoId = getVideoId(exercise.embed_link);
  const thumbnailUrl = videoId
    ? `https://i.ytimg.com/vi_webp/${videoId}/hqdefault.webp`
    : getRandomFallbackImage();

  return (
    <Box
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px',
        backgroundColor: '#fff',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <Typography color="#FF2625" fontWeight="600" fontSize="20px" mb={1}>
        {exercise.exercise}
      </Typography>
      <Typography fontSize="16px">
        <strong>Primary:</strong> {exercise.primary}
      </Typography>
      <Typography fontSize="16px" mb={1}>
        <strong>Secondary:</strong> {exercise.secondary}
      </Typography>
      {thumbnailUrl && (
      <img
        src={thumbnailUrl}
        alt={exercise.exercise}
        onError={(e) => {
          console.log('an error occur', e);
        }}
        style={{
          width: '100%',
          borderRadius: '8px',
          marginBottom: '12px',
        }}
      />
      )}

      {/* Updated this part to use react-router Link */}
      {videoId && (
        <Link
          to={`/video/${videoId}`} // Navigate to the VideoPlayerPage with videoId
          state={{ exerciseName: exercise.exercise }}
          style={{
            display: 'inline-block',
            marginTop: '10px',
            background: '#FF2625',
            color: 'white',
            padding: '10px 16px',
            borderRadius: '4px',
            textDecoration: 'none',
          }}
        >
          Watch Demo
        </Link>
      )}
    </Box>
  );
}

export default ExerciseCardYT;

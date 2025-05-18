// pages/ExercisesPage.js
import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Stack,
  Pagination,
} from '@mui/material';
import ExerciseCardYT from '../components/ExerciseCardYt';
import data from '../assets/exercises/exercise.json';

const ITEMS_PER_PAGE = 20;

function ExercisesPage() {
  const [exercises, setExercises] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setExercises(data);
    setFiltered(data);
  }, []);

  const handleSearch = () => {
    const results = exercises.filter((ex) => ex.exercise.toLowerCase().includes(query.toLowerCase()));
    setFiltered(results);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedExercises = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <Box
      sx={{ mt: { lg: '120px', xs: '70px' }, px: { sm: '50px', xs: '20px' } }}
      position="relative"
    >
      <Typography color="#FF2625" fontWeight="600" fontSize="26px">
        Fitness Club
      </Typography>
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: '44px', xs: '40px' } }}
        mb="23px"
        mt="30px"
      >
        Sweat, Smile <br />
        And Repeat
      </Typography>
      <Typography
        fontSize="22px"
        fontFamily="Alegreya"
        lineHeight="35px"
        mb={4}
      >
        Check out the most effective exercises personalized to you
      </Typography>

      <Stack direction="row" spacing={2} mb={5}>
        <TextField
          label="Search exercise"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="button"
          onClick={handleSearch}
          style={{
            background: '#FF2625',
            border: 'none',
            padding: '14px 22px',
            color: 'white',
            fontSize: '16px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </Stack>

      <Grid container spacing={4}>
        {paginatedExercises.map((exercise) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={exercise.id}>
            <ExerciseCardYT exercise={exercise} />
          </Grid>
        ))}
      </Grid>

      {filtered.length > ITEMS_PER_PAGE && (
        <Stack alignItems="center" mt={5}>
          <Pagination
            count={Math.ceil(filtered.length / ITEMS_PER_PAGE)}
            color="primary"
            page={currentPage}
            onChange={(e, value) => setCurrentPage(value)}
          />
        </Stack>
      )}
    </Box>
  );
}

export default ExercisesPage;

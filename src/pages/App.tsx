import React, { useCallback } from 'react';
import { AppBar, Box, Button, Typography } from "@mui/material"
import { Route, Routes, useNavigate } from 'react-router';
import Main from './main/main';
import Practice from './practice/practice';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HomeIcon from '@mui/icons-material/Home';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

const styles = {
  root: {
    width: "400px",
    minHeight: "90vh",
    // border: 1
  },
};

function App() {

  const navigate = useNavigate();
  const navHome = useCallback(() => navigate('/', { replace: true }), [navigate]);
  const navPractice = useCallback(() => navigate('/practice', { replace: true }), [navigate]);
  const navLeaderboard = useCallback(() => navigate('/leaderboard', { replace: true }), [navigate]);


  return (
    <Box sx={{ minHeight: "100%" }} display="flex" justifyContent="center">
      <AppBar>
        <Box display="flex" justifyContent="space-between" sx={{ padding: "0.5em" }} >
          <Typography sx={{ fontWeight: "bold", fontSize: "24px" }}>
            WORDLE2
          </Typography>
          <Box display="flex">
            <Button onClick={navHome}>
              <HomeIcon />
            </Button>
            <Button onClick={navPractice}>
              <FitnessCenterIcon />
            </Button>
            <Button onClick={navLeaderboard}>
              <LeaderboardIcon />
            </Button>
          </Box>

        </Box>

      </AppBar>
      <Box sx={styles.root} display="flex" flexDirection="column">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/practice" element={<Practice />} />
        </Routes>
      </Box>
    </Box>

  );
}

export default App;

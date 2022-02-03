import React, { useCallback, useState } from 'react';
import { AppBar, Box, Button, Switch, Typography } from "@mui/material"
import { Route, Routes, useNavigate } from 'react-router';
import Main from './main/main';
import Practice from './practice/practice';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HomeIcon from '@mui/icons-material/Home';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import Leaderboard from './leaderboard/Leaderboard';

const styles = {
  root: {
    width: "400px",
    // minHeight: "85vh",
    // border: 1
  },
};

function App() {

  const navigate = useNavigate();
  const navHome = useCallback(() => navigate('/', { replace: true }), [navigate]);
  const navPractice = useCallback(() => navigate('/practice', { replace: true }), [navigate]);
  const navLeaderboard = useCallback(() => navigate('/leaderboard', { replace: true }), [navigate]);

  const [colourBlind, setColourBlind] = useState(false);


  return (
    <>
    <AppBar position='sticky'>
        <Box display="flex" justifyContent="space-between" sx={{ padding: "0.5em" }} >
          <Typography sx={{ fontWeight: "bold", fontSize: "24px" }}>
            WORDLE2
          </Typography>
          <Box display="flex" alignItems="center">
            <Button onClick={navHome}>
              <HomeIcon />
            </Button>
            <Button onClick={navPractice}>
              <FitnessCenterIcon />
            </Button>
            <Button onClick={navLeaderboard}>
              <LeaderboardIcon />
            </Button>
            <Switch size="small" onChange={() => {setColourBlind(!colourBlind)}} />
          </Box>

        </Box>

      </AppBar>
    <Box display="flex" justifyContent="center">
      <Box sx={styles.root} display="flex" flexDirection="column">
        <Routes>
          <Route path="/" element={<Main colourBlind={colourBlind} />} />
          <Route path="/practice" element={<Practice colourBlind={colourBlind} />} />
          <Route path="/leaderboard" element={<Leaderboard colourBlind={colourBlind} />} />
        </Routes>
      </Box>
    </Box>
</>
  );
}

export default App;

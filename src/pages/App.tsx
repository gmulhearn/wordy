import React, { useCallback, useState } from 'react';
import { AppBar, Box, Button, Switch, Toolbar, Typography } from "@mui/material"
import { Route, Routes, useNavigate } from 'react-router';
import Main from './main/main';
import Practice from './practice/practice';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HomeIcon from '@mui/icons-material/Home';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import Leaderboard from './leaderboard/Leaderboard';
import SportsMmaIcon from '@mui/icons-material/SportsMma';
import Battle from './battle/Battle';

const styles = {
  root: {
    maxWidth: "50em"
    // width: "500px",
    // minHeight: "85vh",
    // border: 1
  },
};

function App() {

  const navigate = useNavigate();
  const navHome = useCallback(() => navigate('/', { replace: true }), [navigate]);
  const navPractice = useCallback(() => navigate('/practice', { replace: true }), [navigate]);
  const navBattle = useCallback(() => navigate('/battle', { replace: true }), [navigate]);
  const navLeaderboard = useCallback(() => navigate('/leaderboard', { replace: true }), [navigate]);

  const [colourBlind, setColourBlind] = useState(false);


  return (
    <>
      <AppBar position='sticky'>
        <Toolbar>
          <Typography sx={{ fontWeight: "bold", fontSize: "24px", flexGrow: 1 }}>
            WORDY
          </Typography>
          <Box display="flex" alignItems="center">
            <Button onClick={navHome} sx={{ minWidth: "0px" }}>
              <HomeIcon />
            </Button>
            <Button onClick={navPractice} sx={{ minWidth: "0px" }}>
              <FitnessCenterIcon />
            </Button>
            <Button onClick={navBattle} sx={{ minWidth: "0px" }}>
              <SportsMmaIcon />
            </Button>
            {/* <Button onClick={navLeaderboard} sx={{ minWidth: "0px" }}>
              <LeaderboardIcon />
            </Button> */}
            <Switch size="small" onChange={() => { setColourBlind(!colourBlind) }} />
          </Box>
        </Toolbar>
      </AppBar>
      <Box display="flex" justifyContent="center">
        <Box sx={styles.root} display="flex" flexDirection="column">
          <Routes>
            <Route path="/" element={<Main colourBlind={colourBlind} />} />
            <Route path="/practice" element={<Practice colourBlind={colourBlind} />} />
            <Route path="/battle" element={<Battle colourBlind={colourBlind} />} />
            <Route path="/leaderboard" element={<Leaderboard colourBlind={colourBlind} />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
}

export default App;

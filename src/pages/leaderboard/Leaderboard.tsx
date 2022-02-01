import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Leaderboard = ({colourBlind}: {colourBlind: boolean}) => {

    console.log("hello!")

  return (<Box display="flex" justifyContent="center" sx={{marginTop: "5em"}}>
      <Typography variant="h4">
          Leaderboard
      </Typography>
  </Box>);
};

export default Leaderboard;

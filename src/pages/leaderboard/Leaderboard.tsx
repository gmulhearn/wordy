import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Leaderboard = ({ colourBlind }: { colourBlind: boolean }) => {

    return (<Box display="flex" justifyContent="center" >
        <Typography variant="h4">
            Leaderboard
        </Typography>
    </Box>);
};

export default Leaderboard;

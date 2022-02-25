import { Paper } from '@mui/material';
import React from 'react';
import { LetterBox } from '../../components/WordGrid';

export interface LeaderboardUserData {
    displayName: string;
    score: number;
    board: LetterBox[][];
}

const LeaderboardEntry = ({ entryData }: { entryData: LeaderboardUserData }) => {
    return (
        <Paper sx={{ padding: "3em" }}>
            {entryData.displayName}
            {entryData.score}
            {entryData.board.toString()}
        </Paper>
    );
};

export default LeaderboardEntry;

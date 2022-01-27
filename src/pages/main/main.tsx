import { Box, Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import Keyboard from '../../components/Keyboard';
import WordGrid, { LetterState } from '../../components/WordGrid';
import { emptyGrid, LetterGridProcessor } from '../../core/LetterGridCore';

const styles = {
    title: {
        fontWeight: "bolder",
        textAlign: "center",
        fontSize: "32px"
    },
    main: {
        // border: 1,
        height: "100%"
    },
    keyboard: {
        // border: 1,
        // height: "30%"
    },
}

const getTodaysWord = (): string => {
    return "DUMMY"
}
const Main = () => {

    const [letterGrid, setLetterGrid] = useState(emptyGrid);

    const [letterGridProcessor, setLetterGridProcessor] = useState(new LetterGridProcessor(getTodaysWord()))

    const handleKeyboardInput = (input: string) => {
        console.log(input)
        const newGrid = letterGridProcessor.processInput(input)
        setLetterGrid(newGrid)
    }

    return (
        <Box display="flex" justifyContent="space-between" flexDirection="column" sx={{minHeight:"100%"}}>
            <Typography sx={styles.title}>
                WORDLE2
            </Typography>
            <Box sx={styles.main} display="flex" alignItems="center" justifyContent="center">
                <WordGrid letterGrid={letterGrid} />
            </Box>
            <Box sx={styles.keyboard}>
                <Keyboard onKeyboardInput={handleKeyboardInput} />
            </Box>
        </Box>

    );
};

export default Main;

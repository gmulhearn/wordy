import { Box, Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import Keyboard from '../../components/Keyboard';
import WordGrid, { LetterState } from '../../components/WordGrid';
import { emptyGrid, LetterGridProcessor } from '../../core/LetterGridCore';

const styles = {
    main: {
        // border: 1,
        height: "75%"
    },
    keyboard: {
        // border: 1,
        height: "25%"
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
        <>
            <Box sx={styles.main} display="flex" alignItems="center" justifyContent="center">
                <WordGrid letterGrid={letterGrid} />
            </Box>
            <Box sx={styles.keyboard}>
                <Keyboard onKeyboardInput={handleKeyboardInput} />
            </Box>
        </>

    );
};

export default Main;

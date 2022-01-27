import { Box, Button, Dialog, Grid, IconButton, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import Keyboard from '../../components/Keyboard';
import WordGrid from '../../components/WordGrid';
import { emptyGrid, LetterGridProcessor } from '../../core/LetterGridCore';
import words from '../../res/5letterwords.json'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const styles = {
    title: {
        fontWeight: "bolder",
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
    const word = words.at(Math.floor(Math.random() * words.length - 1)) || "UNDEF"
    return word.toUpperCase()
}

const Practice = () => {

    const [letterGrid, setLetterGrid] = useState(emptyGrid);

    const [revealWordOpen, setRevealWordOpen] = useState(false);

    const todaysWord = getTodaysWord()
    const [letterGridProcessor, setLetterGridProcessor] = useState(new LetterGridProcessor(todaysWord))

    const handleKeyboardInput = (input: string) => {
        console.log(input)
        const newGrid = letterGridProcessor.processInput(input)
        setLetterGrid(newGrid)
    }

    return (
        <Box display="flex" justifyContent="space-between" flexDirection="column" sx={{ minHeight: "100%" }}>
            <Dialog open={revealWordOpen} onClose={() => { setRevealWordOpen(false) }}>
                <Typography sx={{marginInline: "2em", marginBlock: "1em"}}>
                    {letterGridProcessor.correctWord}
                </Typography>
            </Dialog>Ï
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={{ marginTop: "4em", fontWeight: "bold" }}>
                <Typography >
                    Practice Mode
                </Typography>
                <Button variant="outlined" onClick={() => { setRevealWordOpen(true) }} >
                    Reveal Word
                </Button>
            </Box>

            <Box sx={styles.main} display="flex" alignItems="center" justifyContent="center">
                <WordGrid letterGrid={letterGrid} />
            </Box>
            <Box sx={styles.keyboard}>
                <Keyboard onKeyboardInput={handleKeyboardInput} />
            </Box>
        </Box>

    );
};

export default Practice;

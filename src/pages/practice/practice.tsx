import { Box, Button, Dialog, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import words from '../../res/5letterwords.json'
import RefreshIcon from '@mui/icons-material/Refresh';
import GameBoard from '../../components/GameBoard';

const getWord = (): string => {
    const word = words[Math.floor(Math.random() * words.length - 1)] || "UNDEF"
    return word.toUpperCase()
}

const Practice = ({ colourBlind }: { colourBlind: boolean }) => {

    const [revealWordOpen, setRevealWordOpen] = useState(false);

    const word = getWord()
    const [correctWord, setCorrectWord] = useState(word)

    useEffect(() => {
        setCorrectWord(word)
    }, []);

    const onWordFound = () => {
        console.log("FOUND!")
    }

    return (
        <Box display="flex" flexDirection="column" marginTop="1em">
            <Dialog open={revealWordOpen} onClose={() => { setRevealWordOpen(false) }}>
                <Typography sx={{ paddingInline: "2em", paddingBlock: "1em" }}>
                    {correctWord}
                </Typography>
            </Dialog>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={{ fontWeight: "bold" }}>
                <Typography variant="h5" >
                    Practice Mode
                </Typography>
                <Box display="flex">
                    <Button variant="outlined" onClick={() => { setRevealWordOpen(true) }} >
                        Reveal Word
                    </Button>
                    <IconButton sx={{ marginLeft: "0.2em" }} onClick={() => { window.location.reload() }}>
                        <RefreshIcon color="primary" />
                    </IconButton>
                </Box>

            </Box>
            <GameBoard colourBlind={colourBlind} correctWord={correctWord} onWordFound={onWordFound} />
        </Box>

    );
};

export default Practice;

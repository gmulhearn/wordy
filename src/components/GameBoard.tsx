import { Snackbar } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { GAME_TYPE, getGameboardIfExists, setGameboardCookie } from '../core/CookieCore';
import { getEmptyGrid, LetterGridProcessor } from '../core/LetterGridCore';
import Keyboard from './Keyboard';
import WordGrid, { LetterBox } from './WordGrid';

const styles = {
    main: {
        // border: 1
    },
    keyboard: {
        position: "absolute",
        minWidth: "250px",
        width: "100%",
        maxWidth: "450px",
        bottom: 0
        // border: 1
    },
}

const GameBoard = ({ colourBlind, gameType, correctWord, onWordFound }: { colourBlind: boolean, gameType: GAME_TYPE, correctWord: string, onWordFound: (letterGrid: LetterBox[][]) => void }) => {

    const [letterGrid, setLetterGrid] = useState(getEmptyGrid());
    const [letterGuesses, setLetterGuesses] = useState<LetterBox[]>([])

    const [invalidWordSnackbarOpen, setInvalidWordSnackbarOpen] = useState(false);

    const [letterGridProcessor, setLetterGridProcessor] = useState(
        new LetterGridProcessor(
            correctWord,
            setLetterGuesses,
            () => { setInvalidWordSnackbarOpen(true) },
            onWordFound
        )
    )

    useEffect(() => {
        const gameboard = getGameboardIfExists(gameType)
        if (gameboard) {
            letterGridProcessor.restartFromGrid(gameboard)
            setLetterGrid(gameboard)
        }
    }, [])

    const handleKeyboardInput = (input: string) => {
        const newGrid = letterGridProcessor.processInput(input)
        setGameboardCookie(gameType, newGrid)
        setLetterGrid(newGrid)
    }

    return (
        <Box display="flex" justifyContent="space-between" flexDirection="column" alignItems="center">
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={invalidWordSnackbarOpen}
                onClose={() => { setInvalidWordSnackbarOpen(false) }}
                autoHideDuration={750}
                message="Invalid word"
            />
            <Box sx={styles.main} >
                <WordGrid letterGrid={letterGrid} colourBlind={colourBlind} />
            </Box>
            <Box sx={styles.keyboard}>
                <Keyboard onKeyboardInput={handleKeyboardInput} letterStates={letterGuesses} colourBlind={colourBlind} />
            </Box>
        </Box>
    );
};

export default GameBoard;

import { Box } from '@mui/system';
import React, { useState } from 'react';
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

const GameBoard = ({ colourBlind, correctWord, onWordFound }: { colourBlind: boolean, correctWord: string, onWordFound: (letterGrid: LetterBox[][]) => void }) => {

    const [letterGrid, setLetterGrid] = useState(getEmptyGrid());
    const [letterGuesses, setLetterGuesses] = useState<LetterBox[]>([])

    const [letterGridProcessor, setLetterGridProcessor] = useState(new LetterGridProcessor(correctWord, setLetterGuesses, onWordFound))

    const handleKeyboardInput = (input: string) => {
        const newGrid = letterGridProcessor.processInput(input)
        setLetterGrid(newGrid)
    }

    return (
        <Box display="flex" justifyContent="space-between" flexDirection="column" alignItems="center">
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

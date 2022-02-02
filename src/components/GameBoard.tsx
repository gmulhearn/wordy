import { Box } from '@mui/system';
import React, { useState } from 'react';
import { emptyGrid, LetterGridProcessor } from '../core/LetterGridCore';
import Keyboard from './Keyboard';
import WordGrid, { LetterBox } from './WordGrid';

const styles = {
    main: {
        height: "100%"
    },
    keyboard: {},
}

const GameBoard = ({ colourBlind, correctWord, isPractice }: { colourBlind: boolean, correctWord: string, isPractice: boolean }) => {

    const [letterGrid, setLetterGrid] = useState(emptyGrid);
    const [letterGuesses, setLetterGuesses] = useState<LetterBox[]>([])

    const [letterGridProcessor, setLetterGridProcessor] = useState(new LetterGridProcessor(correctWord, setLetterGuesses))

    const handleKeyboardInput = (input: string) => {
        const newGrid = letterGridProcessor.processInput(input)
        setLetterGrid(newGrid)
    }


    return (
        <Box display="flex" justifyContent="space-between" flexDirection="column" sx={{ minHeight: "100%" }}>
            <Box sx={styles.main} display="flex" alignItems="center" justifyContent="center">
                <WordGrid letterGrid={letterGrid} colourBlind={colourBlind} />
            </Box>
            <Box sx={styles.keyboard}>
                <Keyboard onKeyboardInput={handleKeyboardInput} letterStates={letterGuesses} colourBlind={colourBlind} />
            </Box>
        </Box>
    );
};

export default GameBoard;

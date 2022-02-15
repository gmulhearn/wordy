import { Box, Button, SxProps, Theme } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { stateToColor } from '../core/miscUtil';
import { LetterBox, LetterState } from './WordGrid';

const styles: { letter: SxProps<Theme> } = {
    letter: {
        margin: "0.2em",
        fontWeight: "bold",
        minWidth: "0px",
        flexGrow: 1,
        padding: "0em",
        height: "50px",
        backgroundColor: "#7b7d7c",
        color: "white"
    }
}

export const ENTER = "ENTER"
export const DELETE = "DEL"

const VALID_INPUT = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", ENTER, DELETE]

const Keyboard = ({ onKeyboardInput, letterStates, colourBlind }: { onKeyboardInput: (input: string) => void, letterStates: LetterBox[], colourBlind: boolean }) => {

    const topRowLetters = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
    const midRowLetters = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
    const bottomRowLetters = [ENTER, "Z", "X", "C", "V", "B", "N", "M", DELETE]

    const keyPressListener = useCallback((event: KeyboardEvent) => {
        let letter =
            event.key == "Backspace" ? DELETE
                : (event.key == "Enter" ? ENTER
                    : event.key.toUpperCase())

        if (VALID_INPUT.includes(letter)) {
            onKeyboardInput(letter)
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", keyPressListener, false);

        return () => {
            document.removeEventListener("keydown", keyPressListener, false);
        };
    }, []);

    const getLetterStyle = (letter: string): any => {
        const newStyle = JSON.parse(JSON.stringify(styles.letter))
        
        let bg = "#7b7d7c"
        
        const letterMatches = letterStates.filter((l: LetterBox) => (l.letter == letter))
        if (letterMatches.length > 0) {
            if (letterMatches.filter((l: LetterBox) => (l.state == LetterState.CORRECT)).length > 0) {
                bg = stateToColor(LetterState.CORRECT, colourBlind)
            } else if (letterMatches.filter((l: LetterBox) => (l.state == LetterState.NEARLY)).length > 0) {
                bg = stateToColor(LetterState.NEARLY, colourBlind)
            } else if (letterMatches.filter((l: LetterBox) => (l.state == LetterState.INCORRECT)).length > 0) {
                bg = stateToColor(LetterState.INCORRECT, colourBlind)
            }
        }
        newStyle.backgroundColor = bg
        return newStyle
    }


    return (<Box display="flex" sx={{ minWidth: "100%" }} justifyContent="center" flexDirection="column" alignItems="center">
        <Box display="flex" sx={{ minWidth: "100%" }}>
            {topRowLetters.map((letter) =>
                <Button sx={getLetterStyle(letter)}
                    variant='contained'
                    key={letter}
                    onClick={() => { onKeyboardInput(letter) }}>
                    {letter}
                </Button>
            )}
        </Box>
        <Box display="flex" sx={{ minWidth: "100%" }}>
            {midRowLetters.map((letter) => (
                <Button sx={getLetterStyle(letter)}
                    variant='contained'
                    key={letter}
                    onClick={() => { onKeyboardInput(letter) }}>
                    {letter}
                </Button>
            ))}
        </Box>
        <Box display="flex" sx={{ minWidth: "100%" }}>
            {bottomRowLetters.map((letter) => (
                <Button sx={getLetterStyle(letter)}
                    variant='contained'
                    key={letter}
                    onClick={() => { onKeyboardInput(letter) }}>
                    {letter}
                </Button>
            ))}
        </Box>

    </Box>);
};

export default Keyboard;

import { Box, Button } from '@mui/material';
import React, { useCallback, useEffect } from 'react';

const styles = {
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

const Keyboard = ({ onKeyboardInput }: { onKeyboardInput: (input: string) => void }) => {

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


    return (<Box display="flex" sx={{ minWidth: "100%" }} justifyContent="center" flexDirection="column" alignItems="center">
        <Box display="flex" sx={{ minWidth: "100%" }}>
            {topRowLetters.map((letter) =>
                <Button sx={styles.letter}
                    variant='contained'
                    key={letter}
                    onClick={() => { onKeyboardInput(letter) }}>
                    {letter}
                </Button>
            )}
        </Box>
        <Box display="flex" sx={{ minWidth: "100%" }}>
            {midRowLetters.map((letter) => (
                <Button sx={styles.letter}
                    variant='contained'
                    key={letter}
                    onClick={() => { onKeyboardInput(letter) }}>
                    {letter}
                </Button>
            ))}
        </Box>
        <Box display="flex" sx={{ minWidth: "100%" }}>
            {bottomRowLetters.map((letter) => (
                <Button sx={styles.letter}
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

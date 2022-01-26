import { Box, Button, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const styles = {
    letter: {
        margin: "0.2em",
        fontWeight: "bold",
        minWidth: "0",
        height: "55px"
    }
}

export const ENTER = "ENTER"
export const DELETE = "DEL"

const Keyboard = ({ onKeyboardInput }: { onKeyboardInput: (input: string) => void }) => {

    const topRowLetters = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
    const midRowLetters = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
    const bottomRowLetters = [ENTER, "Z", "X", "C", "V", "B", "N", "M", DELETE]


    return (<Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
        <Box display="flex">
            {topRowLetters.map((letter) =>
                <Button sx={styles.letter}
                    variant='contained'
                    key={letter}
                    onClick={() => { onKeyboardInput(letter) }}>
                    {letter}
                </Button>
            )}
        </Box>
        <Box display="flex">
            {midRowLetters.map((letter) => (
                <Button sx={styles.letter}
                    variant='contained'
                    key={letter}
                    onClick={() => { onKeyboardInput(letter) }}>
                    {letter}
                </Button>
            ))}
        </Box>
        <Box display="flex">
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

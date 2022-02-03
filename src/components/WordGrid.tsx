import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { stateToColor } from '../core/miscUtil';

const styles = {
    letterBox: {
        border: 1,
        height: "50px",
        width: "50px",
        margin: "0.3em"
    },
    letterText: {
        fontWeight: "bold",
        fontSize: "24px"
    }
}

export interface LetterBox {
    letter: string;
    state: LetterState;
}

export enum LetterState {
    NONE,
    INCORRECT,
    NEARLY,
    CORRECT,
}


const WordGrid = ({ letterGrid, colourBlind }: { letterGrid: LetterBox[][], colourBlind: boolean }) => {

    const getLetterBoxStyles = (letterBox: LetterBox): any => {
        const style = JSON.parse(JSON.stringify(styles.letterBox))
        style.backgroundColor = stateToColor(letterBox.state, colourBlind)
        return style
    }

    return <Box display="flex" flexDirection="column">
        {letterGrid.map((row) => (
            <Box sx={{ width: "100%" }} display="flex" flexDirection="row">
                {row.map((item) => (
                    <Box sx={getLetterBoxStyles(item)} display="flex" justifyContent="center" alignItems="center">
                        <Typography sx={styles.letterText}>
                            {item.letter}
                        </Typography>
                    </Box>
                ))}
            </Box>
        ))}
    </Box>;
};

export default WordGrid;

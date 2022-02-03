import React, { useState } from 'react';
import words from '../../res/5letterwords.json'
import randomseed from 'random-seed'
import GameBoard from '../../components/GameBoard';
import { LetterBox } from '../../components/WordGrid';
import { Box, Button, Dialog, DialogTitle, IconButton, Typography } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { gridToText } from '../../core/LetterGridCore';
import VisibilityIcon from '@mui/icons-material/Visibility';

const getTodaysWord = (): string => {
    const randNum = randomseed.create(Date().split(" ").slice(1, 4).join("")).random()
    const word = words[Math.floor(randNum * words.length - 1)] || "UNDEF"
    return word.toUpperCase()
}

const Main = ({ colourBlind }: { colourBlind: boolean }) => {
    const todaysWord = getTodaysWord()
    const [wordFound, setWordFound] = useState(false);
    const [winOpen, setWinOpen] = useState(false);
    const [resultText, setResultText] = useState("bruh");
    const [resultCopied, setResultCopied] = useState(false)

    const onWordFound = (wordGrid: LetterBox[][]) => {
        setWordFound(true)
        setWinOpen(true)
        setResultText(gridToText(wordGrid))
    }

    return (
        <>
            <Dialog open={wordFound && winOpen} onClose={() => {
                setWinOpen(false)
                setResultCopied(false)
            }}>
                <DialogTitle sx={{ marginInline: "3em" }}>Nice!</DialogTitle>
                {resultCopied ?
                    <Typography sx={{ textAlign: "center" }}>
                        Copied to clipboard :)
                    </Typography>
                    : <></>}
                <CopyToClipboard text={resultText} onCopy={() => { setResultCopied(true) }}>
                    <Button variant="contained" sx={{ margin: "1em" }}>
                        SHARE
                    </Button>
                </CopyToClipboard>

            </Dialog>
            <Box display="flex" justifyContent="center">
                {
                    wordFound ? (
                        <IconButton onClick={() => {setWinOpen(true)}}>
                            <VisibilityIcon />
                        </IconButton>
                    ) : <Box sx={{marginTop: "1em"}}> </Box>
                }

            </Box>
            <GameBoard colourBlind={colourBlind} correctWord={todaysWord} onWordFound={onWordFound} />
        </>
    );
};

export default Main;

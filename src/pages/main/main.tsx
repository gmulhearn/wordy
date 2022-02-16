import React, { useEffect, useState } from 'react';
import words from '../../res/5letterwords.json'
import randomseed from 'random-seed'
import GameBoard from '../../components/GameBoard';
import { LetterBox } from '../../components/WordGrid';
import { Box, Button, Dialog, DialogTitle, IconButton, Typography } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { gridToText } from '../../core/LetterGridCore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { GAME_TYPE } from '../../core/CookieCore';

const getTodaysWord = (): string => {
    const randNum = randomseed.create(Date().split(" ").slice(1, 4).join("")).random()
    const word = words[Math.floor(randNum * words.length - 1)] || "UNDEF"
    return word.toUpperCase()
}

const Main = ({ colourBlind }: { colourBlind: boolean }) => {
    const todaysWord = getTodaysWord()
    const [gameDone, setGameDone] = useState(false);
    const [endOpen, setEndOpen] = useState(false);
    const [resultText, setResultText] = useState("bruh");
    const [resultCopied, setResultCopied] = useState(false)
    const [endingGrid, setEndingGrid] = useState<LetterBox[][]>([[]])

    const onGameDone = (wordGrid: LetterBox[][]) => {
        setGameDone(true)
        setEndOpen(true)
        setEndingGrid(wordGrid)
        setResultText(gridToText(wordGrid, colourBlind))
    }

    useEffect(() => {
      if (gameDone) {
          setResultText(gridToText(endingGrid, colourBlind))
      }
    
    }, [colourBlind]);
    

    return (
        <>
            <Dialog open={gameDone && endOpen} onClose={() => {
                setEndOpen(false)
                setResultCopied(false)
            }}>
                <DialogTitle sx={{ marginInline: "3em" }}>Round Over!</DialogTitle>
                <Typography sx={{ textAlign: "center" }}>Word: {todaysWord}</Typography>
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
                    gameDone ? (
                        <IconButton onClick={() => {setEndOpen(true)}}>
                            <VisibilityIcon />
                        </IconButton>
                    ) : <Box sx={{marginTop: "1em"}}> </Box>
                }

            </Box>
            <GameBoard colourBlind={colourBlind} gameType={GAME_TYPE.CLASSIC} correctWord={todaysWord} onGameDone={onGameDone} />
        </>
    );
};

export default Main;

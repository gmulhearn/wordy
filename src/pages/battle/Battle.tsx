import { Box, Button, Dialog, DialogTitle, IconButton, Snackbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import words from '../../res/5letterwords.json'
import randomseed from 'random-seed'
import RefreshIcon from '@mui/icons-material/Refresh';
import GameBoard from '../../components/GameBoard';
import { GAME_TYPE } from '../../core/CookieCore';
import { useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import CopyToClipboard from 'react-copy-to-clipboard';
import { LetterBox } from '../../components/WordGrid';
import { gridToText } from '../../core/LetterGridCore';
import VisibilityIcon from '@mui/icons-material/Visibility';


const getWord = (seed: string): string => {
    const randNum = randomseed.create(seed).random()
    const word = words[Math.floor(randNum * words.length - 1)] || "UNDEF"
    return word.toUpperCase()
}

const Battle = ({ colourBlind }: { colourBlind: boolean }) => {

    const [linkCopied, setLinkCopied] = useState(false);

    const [gameDone, setGameDone] = useState(false);
    const [endOpen, setEndOpen] = useState(false);
    const [resultText, setResultText] = useState("bruh");
    const [resultCopied, setResultCopied] = useState(false)
    const [endingGrid, setEndingGrid] = useState<LetterBox[][]>([[]])

    const [correctWord, setCorrectWord] = useState<string | undefined>(undefined)
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {

    }, []);

    useEffect(() => {
        const seed = searchParams.get("seed")
        if (!seed) {
            refreshWithNewSeed()
        } else {
            setCorrectWord(getWord(seed))
        }
    }, [searchParams]);

    const onGameDone = (wordGrid: LetterBox[][]) => {
        setGameDone(true)
        setEndOpen(true)
        setEndingGrid(wordGrid)
        setResultText(gridToText(wordGrid, colourBlind))
    }

    const refreshWithNewSeed = () => {
        setSearchParams({ seed: uuidv4() })
        window.location.reload()
    }

    return (
        <Box display="flex" flexDirection="column" marginTop="0.5em">
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={linkCopied}
                onClose={() => { setLinkCopied(false) }}
                autoHideDuration={750}
                message="Copied Invite Link"
            />
            <Dialog open={gameDone && endOpen} onClose={() => {
                setEndOpen(false)
                setResultCopied(false)
            }}>
                <DialogTitle sx={{ marginInline: "3em" }}>Round Over!</DialogTitle>
                <Typography sx={{ textAlign: "center" }}>Word: {correctWord}</Typography>
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
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="row" sx={{ fontWeight: "bold" }}>
                <Typography variant="h5" sx={{ marginRight: "1em" }} >
                    Battle
                </Typography>
                <CopyToClipboard text={window.location.toString()} onCopy={() => { setLinkCopied(true) }}>
                    <Button variant="outlined" >
                        Invite
                    </Button>
                </CopyToClipboard>

                <IconButton sx={{ marginLeft: "0.2em" }} onClick={refreshWithNewSeed}>
                    <RefreshIcon color="primary" />
                </IconButton>

                {
                    gameDone ? (
                        <IconButton onClick={() => {setEndOpen(true)}}>
                            <VisibilityIcon color="primary" />
                        </IconButton>
                    ) : <></>
                }

            </Box>
            {correctWord ? (
                <GameBoard colourBlind={colourBlind} gameType={GAME_TYPE.PRACTICE} correctWord={correctWord} onGameDone={onGameDone} />
            ) : <></>}
        </Box>

    );
};

export default Battle;

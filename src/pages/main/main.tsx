import React, { useState } from 'react';
import words from '../../res/5letterwords.json'
import randomseed from 'random-seed'
import GameBoard from '../../components/GameBoard';
import { LetterBox } from '../../components/WordGrid';
import { Button, Dialog, DialogTitle } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { gridToText } from '../../core/LetterGridCore';

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

    const onWordFound = (wordGrid: LetterBox[][]) => {
        console.log("FOUND!")
        console.log(wordGrid)
        setWordFound(true)
        setWinOpen(true)
        setResultText(gridToText(wordGrid))
    }

    return (
        <>
            <Dialog open={wordFound && winOpen} onClose={() => { setWinOpen(false) }}>
                <DialogTitle sx={{ marginInline: "3em" }}>Nice!</DialogTitle>
                <CopyToClipboard text={resultText}>
                    <Button variant="contained" sx={{ margin: "1em" }}>
                        SHARE
                    </Button>
                </CopyToClipboard>

            </Dialog>
            <GameBoard colourBlind={colourBlind} correctWord={todaysWord} onWordFound={onWordFound} />
        </>
    );
};

export default Main;

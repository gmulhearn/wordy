import React from 'react';
import words from '../../res/5letterwords.json'
import randomseed from 'random-seed'
import GameBoard from '../../components/GameBoard';

const getTodaysWord = (): string => {
    const randNum = randomseed.create(Date().split(" ").slice(1, 4).join("")).random()
    const word = words[Math.floor(randNum * words.length - 1)] || "UNDEF"
    return word.toUpperCase()
}

const Main = ({ colourBlind }: { colourBlind: boolean }) => {
    const todaysWord = getTodaysWord()

    return (
        <GameBoard colourBlind={colourBlind} correctWord={todaysWord} />
    );
};

export default Main;

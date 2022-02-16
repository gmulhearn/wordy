import { LetterBox } from "../components/WordGrid";
import Cookie from 'js-cookie'

export enum GAME_TYPE {
    CLASSIC = "CLASSIC",
    PRACTICE = "PRACTICE"
}

export interface CurrentScoreCookie {
    day: string;
    board: LetterBox[][];
}

export const setGameboardCookie = (gameType: GAME_TYPE, gameboard: LetterBox[][]) => {

    const cookie: CurrentScoreCookie = {
        day: Date().split(" ").slice(1, 4).join(" "),
        board: gameboard
    }

    Cookie.set(gameType, JSON.stringify(cookie))
}

export const getGameboardIfExists = (gameType: GAME_TYPE): LetterBox[][] | undefined => {

    if (gameType == GAME_TYPE.CLASSIC) {
        if (!Cookie.get(GAME_TYPE.CLASSIC)) {
            return undefined
        }

        const classicCookie: CurrentScoreCookie = JSON.parse(Cookie.get(GAME_TYPE.CLASSIC)!)

        const todayStr = Date().split(" ").slice(1, 4).join(" ")

        if (classicCookie.day !== todayStr) {
            return undefined
        }

        return classicCookie.board
    }

    return undefined
}
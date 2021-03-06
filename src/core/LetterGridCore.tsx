import { DELETE, ENTER } from "../components/Keyboard"
import { LetterBox, LetterState } from "../components/WordGrid"
import allowedWords from '../res/5letterallowedwords.json'
import words from '../res/5letterwords.json'

const allWords = allowedWords.concat(words)

const WIDTH = 5
const HEIGHT = 6

const NO_LETTER = ""

const emptyLetterBox = { letter: NO_LETTER, state: LetterState.NONE }

export const emptyGrid: LetterBox[][] = [
    Array(WIDTH).fill(emptyLetterBox),
    Array(WIDTH).fill(emptyLetterBox),
    Array(WIDTH).fill(emptyLetterBox),
    Array(WIDTH).fill(emptyLetterBox),
    Array(WIDTH).fill(emptyLetterBox),
    Array(WIDTH).fill(emptyLetterBox),
]

const emptyGridJSON: string = JSON.stringify(emptyGrid)

export const getEmptyGrid = (): LetterBox[][] => {
    const a = JSON.parse(emptyGridJSON)
    return a
}

const cloneMatrix = (matrix: any[][]): any[][] => {
    return matrix.map(function (arr) {
        return arr.slice();
    });
}

export const getDayString = (): string => {
    return Date().split(" ").slice(1, 4).join(" ")
}

export const gridToTextMain = (grid: LetterBox[][], colourBlind: boolean): string => {
    let text = `Wordy\n${getDayString()}\n\n`
    text += gridToText(grid, colourBlind)
    text += `\nPlay me at: ${window.location.toString()}`
    return text
}

export const gridToTextBattle = (grid: LetterBox[][], colourBlind: boolean, time: number, seed: string): string => {
    let text = `Wordy Battle\n#${seed.substring(0, 6)}\n`
    text += gridToText(grid, colourBlind)
    text += `\nTime: ${time}s`
    text += `\nBattle me at: ${window.location.toString()}`

    return text
}

const gridToText = (grid: LetterBox[][], colourBlind: boolean): string => {
    return grid.map((row) => (
        row.map((lb) => (
            lb.state === LetterState.CORRECT ? (colourBlind ? "🟧" : "🟩") : (
                lb.state === LetterState.NEARLY ? (colourBlind ? "🟦" : "🟨") : (
                    lb.state === LetterState.INCORRECT ? "⬛" : ""
                )
            ))).join("")
    )).filter((rowText) => rowText != "").join("\n")
}

const letterCountInWord = (letter: string, word: string): number => {
    return (word.match(new RegExp(letter, "g")) || []).length
}

export const checkIfGridGameOver = (grid: LetterBox[][]): boolean => {
    var y = Math.min(HEIGHT,
        grid.filter((row) =>
            (row.filter((lb) => (lb.state !== LetterState.NONE)).length > 0)
        ).length
    )

    if (grid.filter((row) => (
        row.length === row.filter((lb) => lb.state === LetterState.CORRECT).length
    )).length > 0) {
        // game won
        return true
    }

    if (y === HEIGHT) {
        // game lost
        return true
    }

    return false
}

export const getBoardScore = (grid: LetterBox[][]): number | undefined => {
    if (!checkIfGridGameOver(grid)) {
        return undefined
    }

    var score = 0
    grid.forEach((row) => {
        if (row.length !== row.filter((lb) => lb.state === LetterState.NONE).length) {
            score += 1
        }
    })
    return score
}

export class LetterGridProcessor {
    letterPosition: { x: number, y: number } = { x: 0, y: 0 }
    currentGrid: LetterBox[][] = getEmptyGrid()
    letterGuesses: LetterBox[] = []
    foundWord: boolean = false

    correctWord
    setLetterGuesses
    onInvalidWord
    onGameDone

    constructor(correctWord: string, setLetterGuesses: React.Dispatch<React.SetStateAction<LetterBox[]>>, onInvalidWord: () => void, onGameDone: (wordGrid: LetterBox[][]) => void) {
        this.correctWord = correctWord
        this.setLetterGuesses = setLetterGuesses
        this.onInvalidWord = onInvalidWord
        this.onGameDone = onGameDone
    }

    restartFromGrid = (grid: LetterBox[][]) => {
        this.currentGrid = grid

        var y = Math.min(HEIGHT,
            grid.filter((row) =>
                (row.filter((lb) => (lb.state !== LetterState.NONE)).length > 0)
            ).length
        )
        var x = y < grid.length ? grid[y].filter((lb) => (lb.letter !== NO_LETTER)).length : 0

        this.letterPosition = {
            x: x,
            y: y
        }
        console.log(this.letterPosition)

        this.letterGuesses = grid.flatMap((row) => (
            row.filter((lb) =>
            (
                lb.state !== LetterState.NONE
            ))
        ))

        this.setLetterGuesses(this.letterGuesses)

        if (this.checkIfGameOver()) {
            this.foundWord = true
            this.onGameDone(this.currentGrid)
        }
    }

    checkIfGameOver = (): boolean => {
        if (this.currentGrid.filter((row) => (
            row.length === row.filter((lb) => lb.state === LetterState.CORRECT).length
        )).length > 0) {
            // game won
            return true
        }

        if (this.letterPosition.y === HEIGHT) {
            // game lost
            return true
        }

        return false
    }

    calculateLetterBoxState = (index: number, letterBox: LetterBox): LetterBox => {
        if (this.correctWord.charAt(index) === letterBox.letter) {
            return { letter: letterBox.letter, state: LetterState.CORRECT }
        } else if (this.correctWord.includes(letterBox.letter)) {
            return { letter: letterBox.letter, state: LetterState.NEARLY }
        } else {
            return { letter: letterBox.letter, state: LetterState.INCORRECT }
        }
    }

    refineProcessLetterRow = (row: LetterBox[]): LetterBox[] => {
        return row.map((lb, i) => {
            if (lb.state === LetterState.NEARLY) {
                const numGreenInRowOfLetter = row.filter((lb2) => (
                    lb2.letter === lb.letter && lb2.state === LetterState.CORRECT
                )).length
                const numPriorYellowInRowOfLetter = row.slice(0, i).filter((lb2) => (
                    lb2.letter === lb.letter && lb2.state === LetterState.NEARLY
                )).length
                const numLetterInWord = letterCountInWord(lb.letter, this.correctWord)
                if ((numGreenInRowOfLetter + numPriorYellowInRowOfLetter) >= numLetterInWord) {
                    return {
                        letter: lb.letter,
                        state: LetterState.INCORRECT
                    }
                }
                return lb
            }
            return lb
        })
    }

    processInput = (input: string): LetterBox[][] => {
        if (this.foundWord) {
            return this.currentGrid
        }
        if (this.letterPosition.x === WIDTH && input !== ENTER && input !== DELETE) {
            // err
            throw new Error("");
        }

        if (input === ENTER) {
            if (this.letterPosition.x === WIDTH) {
                // process here
                const row = this.currentGrid[this.letterPosition.y]
                // check if valid word
                if (allWords.includes(row.map((i) => (i.letter)).join("").toLowerCase())) {
                    const newRow: LetterBox[] = this.refineProcessLetterRow(
                        row.map((letterBox, i) => (
                            this.calculateLetterBoxState(i, letterBox)
                        ))
                    )
                    this.letterGuesses = this.letterGuesses.concat(newRow)
                    this.setLetterGuesses(this.letterGuesses)
                    this.currentGrid[this.letterPosition.y] = newRow

                    this.letterPosition.x = 0
                    this.letterPosition.y += 1

                    if (this.checkIfGameOver()) {
                        this.foundWord = true
                        this.onGameDone(this.currentGrid)
                    }
                } else {
                    this.onInvalidWord()
                }
            }
        } else if (input === DELETE) {
            if (this.letterPosition.x !== 0) {
                this.letterPosition.x -= 1
                this.currentGrid[this.letterPosition.y][this.letterPosition.x] = emptyLetterBox
            }
        } else {
            this.currentGrid[this.letterPosition.y][this.letterPosition.x] = { letter: input, state: LetterState.NONE }
            this.letterPosition.x += 1
        }

        return cloneMatrix(this.currentGrid)
    }
}
import { DELETE, ENTER } from "../components/Keyboard"
import { LetterBox, LetterState } from "../components/WordGrid"

const WIDTH = 5
const HEIGHT = 6

const emptyLetterBox = { letter: "", state: LetterState.NONE }

export const emptyGrid: LetterBox[][] = [
    Array(WIDTH).fill(emptyLetterBox),
    Array(WIDTH).fill(emptyLetterBox),
    Array(WIDTH).fill(emptyLetterBox),
    Array(WIDTH).fill(emptyLetterBox),
    Array(WIDTH).fill(emptyLetterBox),
    Array(WIDTH).fill(emptyLetterBox),
]

// const putItemInMatrixPosition = (x: number, y: number, item: any, matrix: any[][]): any[][] => {


// }

const cloneMatrix = (matrix: any[][]): any[][] => {
    return matrix.map(function (arr) {
        return arr.slice();
    });
}

export class LetterGridProcessor {
    letterPosition: { x: number, y: number } = { x: 0, y: 0 }
    correctWord: string = "dummy"
    currentGrid: LetterBox[][] = emptyGrid

    constructor(correctWord: string) {
        this.correctWord = correctWord
    }

    calculateLetterBoxState = (index: number, letterBox: LetterBox): LetterBox => {
        if (this.correctWord.charAt(index) == letterBox.letter) {
            return { letter: letterBox.letter, state: LetterState.CORRECT }
        } else if (this.correctWord.includes(letterBox.letter)) {
            return { letter: letterBox.letter, state: LetterState.NEARLY }
        } else {
            return { letter: letterBox.letter, state: LetterState.INCORRECT }
        }
    }

    processInput = (input: string): LetterBox[][] => {
        if (this.letterPosition.x == WIDTH && input != ENTER && input != DELETE) {
            // err
            throw new Error("");
        }

        if (input == ENTER) {
            if (this.letterPosition.x == WIDTH) {
                // process here
                const row = this.currentGrid[this.letterPosition.y]
                const newRow: LetterBox[] = row.map((letterBox, i) => (
                    this.calculateLetterBoxState(i, letterBox)
                ))
                this.currentGrid[this.letterPosition.y] = newRow

                this.letterPosition.x = 0
                this.letterPosition.y += 1
            }
        } else if (input == DELETE) {
            if (this.letterPosition.x != 0) {
                this.letterPosition.x -= 1
                this.currentGrid[this.letterPosition.y][this.letterPosition.x] = emptyLetterBox
            }
        } else {
            this.currentGrid[this.letterPosition.y][this.letterPosition.x] = { letter: input, state: LetterState.NONE }
            this.letterPosition.x += 1
        }
        console.log(this.letterPosition)
        console.log(this.currentGrid)

        return cloneMatrix(this.currentGrid)
    }
}
import { LetterState } from "../components/WordGrid"
import { wordyColours } from "../theme"

export const stateToColor = (state: LetterState, colourBlind: boolean = false): string => {
    const colours = colourBlind ? wordyColours.colourBlind : wordyColours.normal

    switch (state) {
        case LetterState.CORRECT:
            return colours.correct
        case LetterState.INCORRECT:
            return "#3A3A3B"
        case LetterState.NEARLY:
            return colours.nearly
        default:
            return "none"
    }
}
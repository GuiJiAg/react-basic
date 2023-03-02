import { GeneralConstants } from "../../../../utils/GeneralConstants";
import { Constants } from "../utils/Constants";
import Board from "../components/board-component/Board";
import { useState } from "react";
import ResetButton from "../components/reset-button-component/ResetButton";

const ZERO = GeneralConstants.ZERO;
const ONE = GeneralConstants.ONE;
const EXCLAMATION = GeneralConstants.EXCLAMATION;
const SQUARE_SYMBOL_FIRST = Constants.SQUARE_SYMBOL_FIRST;
const SQUARE_SYMBOL_SECOND = Constants.SQUARE_SYMBOL_SECOND;
const WINNER_IS = Constants.WINNER_IS;
const NEXT_PLAYER = Constants.NEXT_PLAYER;
const SQUARES_PER_ROW = Constants.SQUARES_PER_ROW;
const ROWS_PER_BOARD = Constants.ROWS_PER_BOARD;

export default function Game() {
    let [gameReseted, setGameReseted] = useState(ZERO);
    let [currentStatusGame, setCurrentStatusGame] = useState(NEXT_PLAYER + SQUARE_SYMBOL_FIRST);

    let requirementsToWin = [
        (squares, winnerCandidate) => thereIsACompleteHorizontalLine(squares, winnerCandidate),
        (squares, winnerCandidate) => thereIsACompleteVerticalLine(squares, winnerCandidate),
        (squares, winnerCandidate) => thereIsACompleteDescendingDiagonalLine(squares, winnerCandidate),
        (squares, winnerCandidate) => thereIsACompleteAscendingDiagonalLine(squares, winnerCandidate)
    ];

    /* HANDLES */
    function resetGameRestedState() {
        setGameReseted(false);
    }

    function checkForWinner(squares, winnerCandidate) {
        for (let requirementToWin of requirementsToWin) {
            if (requirementToWin(squares, winnerCandidate)) {
                setCurrentStatusGame(WINNER_IS + winnerCandidate + EXCLAMATION);

                return true;
            }
        }

        getCurrentPlayer(winnerCandidate);

        return false;
    }

    function getCurrentPlayer(winnerCandidate) {
        if (winnerCandidate === SQUARE_SYMBOL_FIRST) {
            setCurrentStatusGame(NEXT_PLAYER + SQUARE_SYMBOL_SECOND);
        }
        else {
            setCurrentStatusGame(NEXT_PLAYER + SQUARE_SYMBOL_FIRST);
        }
    }

    function thereIsACompleteHorizontalLine(squares, winnerCandidate) {
        let rowIndex = ZERO;

        while (rowIndex < ROWS_PER_BOARD) {
            if (checkHorizontalLine(rowIndex, squares, winnerCandidate)) {
                return true;
            }

            rowIndex += ONE;
        }

        return false;
    }

    function checkHorizontalLine(rowIndex, squares, winnerCandidate) {
        let squareIndex = rowIndex * SQUARES_PER_ROW;
        let limitSquareIndex = squareIndex + SQUARES_PER_ROW;
        let totalCorrectSquares = ZERO;

        while (squareIndex < limitSquareIndex) {
            if (squares[squareIndex] === winnerCandidate) {
                totalCorrectSquares += ONE;

                if (totalCorrectSquares === SQUARES_PER_ROW) {
                    return true;
                }
            }
            else {
                return false;
            }

            squareIndex += ONE;
        }

        return false;
    }

    function thereIsACompleteVerticalLine(squares, winnerCandidate) {
        let columnIndex = ZERO;

        while (columnIndex < SQUARES_PER_ROW) {
            if (checkVerticalLine(columnIndex, squares, winnerCandidate)) {
                return true;
            }

            columnIndex += ONE;
        }

        return false;
    }

    function checkVerticalLine(squareIndex, squares, winnerCandidate) {
        let limitSquareIndex = squareIndex + (SQUARES_PER_ROW * (ROWS_PER_BOARD - ONE));
        let totalCorrectSquares = ZERO;

        while (squareIndex <= limitSquareIndex) {
            if (squares[squareIndex] === winnerCandidate) {
                totalCorrectSquares += ONE;

                if (totalCorrectSquares === ROWS_PER_BOARD) {
                    return true;
                }
            }
            else {
                return false;
            }

            squareIndex += SQUARES_PER_ROW;
        }

        return false;
    }

    function thereIsACompleteDescendingDiagonalLine(squares, winnerCandidate) {
        let columnIndex = ZERO;
        let totalCorrectSquares = ZERO;

        while (columnIndex < SQUARES_PER_ROW) {
            let correctIndexForThisColumn = (columnIndex * SQUARES_PER_ROW) + columnIndex;

            if (squares[correctIndexForThisColumn] === winnerCandidate) {
                totalCorrectSquares += ONE;

                if (totalCorrectSquares === ROWS_PER_BOARD) {
                    return true;
                }
            }
            else {
                return false;
            }

            columnIndex += ONE;
        }

        return false;
    }

    function thereIsACompleteAscendingDiagonalLine(squares, winnerCandidate) {
        let rowIndex = ZERO;
        let totalCorrectSquares = ZERO;

        while (rowIndex < SQUARES_PER_ROW) {
            let correctIndexForThisColumn = (rowIndex + ONE) * SQUARES_PER_ROW - (rowIndex + ONE);

            if (squares[correctIndexForThisColumn] === winnerCandidate) {
                totalCorrectSquares += ONE;

                if (totalCorrectSquares === ROWS_PER_BOARD) {
                    return true;
                }
            }
            else {
                return false;
            }

            rowIndex += ONE;
        }

        return false;
    }

    function resetGame() {
        setCurrentStatusGame(NEXT_PLAYER + SQUARE_SYMBOL_FIRST);
        setGameReseted( (gameReseted) => gameReseted + ONE);
    }

    /* RENDER */
    return (
        <div className="board-style">

            <div className="status">{currentStatusGame}</div>

            <Board 
                checkForWinner={checkForWinner}
                resetGameRestedState={resetGameRestedState}
                gameReseted={gameReseted}
            />

            <ResetButton
                className="reset-button"
                onClickResetButton={resetGame}
            />

        </div>
    )
}
import React, { Fragment, useState, useEffect } from "react";

import { GeneralConstants } from "../../../../../utils/GeneralConstants";
import { NextMove } from "../../models/NextMove";
import { Constants } from "../../utils/Constants";
import Square from "./../square-component/Square";

const EMPTY = GeneralConstants.EMPTY;
const ZERO = GeneralConstants.ZERO;
const ONE = GeneralConstants.ONE;
const DIV_ELEMENT = GeneralConstants.DIV_ELEMENT;
const SQUARES_PER_ROW = Constants.SQUARES_PER_ROW;
const ROWS_PER_BOARD = Constants.ROWS_PER_BOARD;
const BOARD_ROW_STYLE = Constants.BOARD_ROW_STYLE;
const TOTAL_OF_SQUARES = ROWS_PER_BOARD * SQUARES_PER_ROW;
const SQUARE_SYMBOL_FIRST = Constants.SQUARE_SYMBOL_FIRST;
const SQUARE_SYMBOL_SECOND = Constants.SQUARE_SYMBOL_SECOND;

export default function Board(props) {
    let [squares, setSquares] = useState(Array(TOTAL_OF_SQUARES).fill(EMPTY));
    let [firstSymbolIsNext, setFirstSymbolIsNext] = useState(true);
    // eslint-disable-next-line no-unused-vars
    let [secondSymbolIsNext, setSecondtSymbolIsNext] = useState(false);
    let [gameIsFinished, setGameIsFinished] = useState(false);

    /* HANDLES */
    useEffect(() => {
        if (props.gameReseted) {
            setSquares(Array(TOTAL_OF_SQUARES).fill(EMPTY));
            setFirstSymbolIsNext(true);
            setSecondtSymbolIsNext(false);
        }
    }, [props.gameReseted]);

    function printNextSymbol(squareIndex) {
        if (!gameIsFinished) {
            let squaresClone = squares.slice();
            let nextMove = printCorrectSymbol(squaresClone[squareIndex]);

            if (nextMove.isCorrectMove) {
                squaresClone[squareIndex] = nextMove.symbolToPrint;
            
                setSquares(squaresClone);
                isGameFinished(squaresClone, nextMove.symbolToPrint);
            } 
        }
    }

    function printCorrectSymbol(symbolOfSquareClicked) {
        let symbol = EMPTY;
        let isFirstSymbolNext = false;
        let isSecondSymbolNext = false;

        if (firstSymbolIsNext) {
            symbol = SQUARE_SYMBOL_FIRST;
            isSecondSymbolNext = true; 
        }
        else {
            symbol = SQUARE_SYMBOL_SECOND;
            isFirstSymbolNext = true; 
        }
        
        let nextMove = checkNextSymbol(symbol, symbolOfSquareClicked);
        changeGameTurn(nextMove, isFirstSymbolNext, isSecondSymbolNext);

        return nextMove;
    }

    function checkNextSymbol(nextSymbol, symbolOfSquareClicked) {
        let nextMove = new NextMove();

        if (symbolOfSquareClicked === EMPTY) {
            nextMove.isCorrectMove = true;
            nextMove.symbolToPrint = nextSymbol;
        }

        else {
            nextMove.isCorrectMove = false;
            nextMove.symbolToPrint = symbolOfSquareClicked;
        }

        return nextMove;
    }

    function changeGameTurn(nextMove, isFirstSymbolNext, isSecondSymbolNext) {
        if (nextMove.isCorrectMove) {
            setFirstSymbolIsNext(isFirstSymbolNext);
            setSecondtSymbolIsNext(isSecondSymbolNext);
        }
    }

    function isGameFinished(squaresClone, symbolToPrint) {
        if (props.checkForWinner(squaresClone, symbolToPrint)) {
            setGameIsFinished(true);
        }
    }

    /* GET ELEMENTS */
    function getSquares(rowIndex) {
        let squaresInRow = [];
        let count = ZERO;

        while(count < SQUARES_PER_ROW) {
            let squareIndex = getSquareIndex(rowIndex, count);

            let square = React.createElement(
                Square,
                {
                    key: squareIndex,
                    symbol: squares[squareIndex],
                    onSquareClick: () => printNextSymbol(squareIndex)
                },
                EMPTY
            );

            squaresInRow.push(square);
            count += ONE;
        }

        return (
            squaresInRow.map( (square) => (
                square
            ))
        );
    }

    function getSquareIndex(rowIndex, squareInRowIndex) {
        if (rowIndex === ZERO) {
            return squareInRowIndex;
        }

        let currentMaximumOfSquares = (rowIndex + ONE) * SQUARES_PER_ROW;
        let currentMinimumOfSquares = currentMaximumOfSquares - SQUARES_PER_ROW;

        return squareInRowIndex + currentMinimumOfSquares;
    }

    function getRows() {
        let rows = [];
        let count = ZERO;

        while(count < ROWS_PER_BOARD) {
            let row = React.createElement(
                DIV_ELEMENT,
                {
                    key: count,
                    className: BOARD_ROW_STYLE
                },
                getSquares(count)
            );

            rows.push(row);
            count += ONE;
        }

        return (
            rows.map( (row) => (
                row
            ))
        );
    }

    /* RENDER */
    return (
        <Fragment>
            {getRows()}
        </Fragment>
    )
}
import { GeneralConstants } from "../../../../utils/GeneralConstants";

const EMPTY = GeneralConstants.EMPTY;

export class NextMove {
    isCorrectMove;
    symbolToPrint;

    constructor() {
        this.isCorrectMove = false;
        this.symbolToPrint = EMPTY
    }
}
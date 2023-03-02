import { Fragment } from "react";
import { Constants } from "../../utils/Constants";

const RESET_GAME = Constants.RESET_GAME;

export default function ResetButton(props) {
    return (
        <Fragment>
            <button 
                className="reset-button"
                onClick={props.onClickResetButton}
            >
                {RESET_GAME}
            </button>
        </Fragment>
    )
}
import React from "react";
import CanvasBlocks from "./CanvasBlocks";

import "./RemainingCredits.scss";

function RemainingCredits(props: any) {

  return (
    <div className="container">
      <h3>Available Voice Credits</h3>
      <CanvasBlocks
        creditsRemaining={props.creditsRemaining}
        creditBalance={props.creditBalance}
      />
      <p>
        {props.creditsRemaining}/{props.creditBalance} voice credits remaining
      </p>
    </div>
  );
}

export default RemainingCredits;

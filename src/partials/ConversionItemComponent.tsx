import React from "react";
import { FaPlay } from "react-icons/fa";
import { colors } from "../utils";

const ConversionItemComponent = (): JSX.Element => {
  return (
    <div className="ce-item">
      <div>
        <span className="ce-item__text">2 - teste1</span>
        <span className="ce-item__text">3 - teste2</span>
      </div>
      <FaPlay color={colors.primary} className="ce-item__icon" />
      <div>
        <span className="ce-item__text">2 - teste1</span>
        <span className="ce-item__text">3 - teste2</span>
      </div>
    </div>
  );
};
export default ConversionItemComponent;

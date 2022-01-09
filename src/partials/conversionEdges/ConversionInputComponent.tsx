import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";

import {
  IconButtonComponent,
  InputComponent,
  SelectInputComponent,
} from "../../components";
import { ProjectContext } from "../../context";

type ConversionInputProps = {
  type: "sources" | "targets";
  addDependency: (
    id: string,
    amount: number,
    type: "sources" | "targets"
  ) => void;
};

const ConversionInputComponent = ({
  type,
  addDependency,
}: ConversionInputProps): JSX.Element => {
  const { t } = useTranslation();
  const { nodes } = useContext(ProjectContext);

  const [nodeId, setNodeId] = useState("");
  const [amount, setAmount] = useState("1");
  const [error, setError] = useState("");

  const handleAmountChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(evt.target.value);
    setError(parseInt(evt.target.value, 10) <= 0 ? "negativeValueError" : "");
  };

  const handleAddDependency = () => {
    if (type === "sources" || type === "targets") {
      addDependency(nodeId, parseInt(amount, 10), type);
    }
    setAmount("1");
    setNodeId("");
  };

  return (
    <div>
      <div className="ce__input">
        <SelectInputComponent
          value={nodeId}
          translationKey={type.slice(0, type.length - 1)}
          onChange={(evt) => setNodeId(evt.target.value)}
          style={{ width: "200px" }}
        >
          <option value="">{t("choose")}</option>
          {Object.entries(nodes).map(([id, node]) => {
            return (
              <option key={id} value={id}>
                {node.label}
              </option>
            );
          })}
        </SelectInputComponent>
        <InputComponent
          type="number"
          min={1}
          value={amount}
          onChange={handleAmountChange}
          style={{ width: "60px" }}
        />
        <IconButtonComponent
          Icon={FaPlus}
          translationKey="add"
          onClick={handleAddDependency}
          style={{ width: 30, height: 30, justifySelf: "right" }}
          iconProps={{ style: { width: 16 } }}
        />
      </div>
      {!!error && (
        <span className="input__error">
          <FiAlertTriangle style={{ marginRight: 8 }} />
          {t(error)}
        </span>
      )}
    </div>
  );
};

export default ConversionInputComponent;

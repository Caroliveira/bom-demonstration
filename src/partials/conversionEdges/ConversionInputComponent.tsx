import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";

import {
  IconButtonComponent,
  InputComponent,
  SelectInputComponent,
} from "../../components";
import { CEDependency, ProjectContext } from "../../context";

type ConversionInputProps = {
  addDependency: (type: "source" | "target", dep: CEDependency) => void;
};

const ConversionInputComponent = ({
  addDependency,
}: ConversionInputProps): JSX.Element => {
  const { t } = useTranslation();
  const { nodes } = useContext(ProjectContext);

  const [nodeId, setNodeId] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("1");
  const [error, setError] = useState("");

  const handleAmountChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(evt.target.value);
    setError(parseInt(evt.target.value, 10) <= 0 ? "negativeValueError" : "");
  };

  const handleAddDependency = () => {
    if (type === "source" || type === "target") {
      const dep = { id: nodeId, amount: parseInt(amount, 10) };
      addDependency(type, dep);
    }
    setAmount("1");
    setNodeId("");
    setType("");
  };

  return (
    <div>
      <div className="ce__input">
        <SelectInputComponent
          translationKey="dependency"
          value={type}
          onChange={(evt) => setType(evt.target.value)}
        >
          <option value="">{t("choose")}</option>
          <option value="source">{t("source")}</option>
          <option value="target">{t("target")}</option>
        </SelectInputComponent>
        <SelectInputComponent
          value={nodeId}
          onChange={(evt) => setNodeId(evt.target.value)}
          style={{ margin: "0 8px" }}
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
          style={{ width: "45px" }}
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

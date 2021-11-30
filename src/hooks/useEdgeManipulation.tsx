import React, { useContext } from "react";
import { Edge, isEdge } from "react-flow-renderer";

import { MainContext } from "../context";

const useEdgeManipulation = () => {
  const { elements, adjustLayout } = useContext(MainContext);

  const handleLabelChange = (edge: Edge, label: string) => {
    const updatedElements = elements.map((el) =>
      isEdge(el) && el.id === edge.id ? { ...el, label } : el
    );
    adjustLayout({ els: updatedElements });
  };

  return { handleLabelChange };
};

export default useEdgeManipulation;

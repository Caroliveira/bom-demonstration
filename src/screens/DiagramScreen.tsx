import React, { useContext, useEffect } from "react";

import {
  DiagramComponent,
  DiagramToolbarComponent,
  EdgeModalComponent,
} from "../partials";
import { colors } from "../utils";
import { DiagramContextProvider, ProjectContext } from "../context";
import { ReactComponent as Elephant } from "../assets/images/elephant.svg";

const DiagramScreen = (): JSX.Element => {
  const { setShowFullHeader, loadingGet } = useContext(ProjectContext);

  useEffect(() => setShowFullHeader(true), []);

  return (
    <DiagramContextProvider>
      <DiagramToolbarComponent />
      <div className="diagram__graph">
        {loadingGet ? (
          <Elephant
            width={120}
            height={120}
            stroke={colors.alert}
            className="diagram__alert loading"
          />
        ) : (
          <DiagramComponent />
        )}
      </div>
      <EdgeModalComponent />
    </DiagramContextProvider>
  );
};

export default DiagramScreen;

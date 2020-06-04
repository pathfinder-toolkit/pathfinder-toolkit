import React, { useState } from "react";
import { useBackend } from "./utils/FakeBackend";

function App() {
  const { getTestValue } = useBackend();

  const [building, setBuilding] = useState(getTestValue);

  return (
    <div>
      <p>Pathfinder-toolkit</p>
      <p>{building}</p>
    </div>
  );
}

export default App;

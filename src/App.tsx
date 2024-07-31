import { useState } from "react";
import SelectDropdown from "./components/organisms/SelectDropdown";

const stateOptions = [
  { value: "Strawberry", label: "Strawberry" },
  { value: "Strawberry ice", label: "Strawberry ice" },
  { value: "Orange", label: "Orange" },
  { value: "Orange strawberry", label: "Orange strawberry" },
  { value: "Orange strawberry ice", label: "Orange strawberry ice" },
];

function App() {
  const [value, setValue] = useState([]);

  return (
    <div className="max-w-[800px] m-auto mt-[100px]">
      <SelectDropdown
        withSearch={true}
        options={stateOptions}
        className="w-full"
        isMulti={true}
        value={value}
        onChange={(e) => {
          setValue(e as typeof value);
          console.log("value", e);
        }}
        name="tes"
      />
    </div>
  );
}

export default App;

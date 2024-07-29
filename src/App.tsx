import { useState } from "react";
import SelectComponent from "./components";

const stateOptions = [
  { value: "tes", label: "tes" },
  { value: "tos", label: "tos" },
  { value: "foo", label: "foo" },
  { value: "bar", label: "bar" },
  { value: "bar bar lah", label: "bar bar lah" },
];

function App() {
  const [value, setValue] = useState([]);

  return (
    <div className="max-w-[800px] m-auto mt-[100px]">
      <SelectComponent
        withSearch={true}
        options={stateOptions}
        className="w-full"
        isMulti={false}
        value={value}
        onChange={(e) => setValue(e as [])}
        name="tes"
      />
    </div>
  );
}

export default App;

import ReactSelect from "react-select";
import { TSelectComponent } from "../types/select";
import { targetSearchStyle } from "../constants";
import MultiValueRemove from "./molecules/MultiValueRemove";

// interface INonSearchableSelect {
// 	className: string;
// 	name: string;
// 	isMulti: boolean;
// 	options: {
// 		value: string;
// 		label: string;
// 	}[];
// }

const NonSearchableDropdown = ({
  className,
  isMulti,
  name,
  options,
}: TSelectComponent) => {
  return (
    <ReactSelect
      className={className}
      autoFocus
      name={name}
      hideSelectedOptions
      isClearable={false}
      backspaceRemovesValue={false}
      isMulti={isMulti}
      options={options}
      placeholder="Search"
      formatOptionLabel={(opt, context) => {
        const regex = RegExp(`${context.inputValue}`, "gi");
        const text = opt.label.replace(regex, `<mark>$&</mark>`);
        return <span dangerouslySetInnerHTML={{ __html: text }} />;
      }}
      components={{ MultiValueRemove: MultiValueRemove }}
      styles={targetSearchStyle}
    />
  );
};

export default NonSearchableDropdown;

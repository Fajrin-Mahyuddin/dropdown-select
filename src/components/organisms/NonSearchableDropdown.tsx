import ReactSelect from "react-select";
import { TSelectComponent } from "../../types/select";
import { targetSearchStyle } from "../../constants";
import { formatLabel } from "../../utils/formatLabel";
import MultiValueRemove from "../molecules/MultiValueRemove";

const NonSearchableDropdown = ({
  className,
  isMulti,
  name,
  options,
  onChange,
}: TSelectComponent) => {
  return (
    <ReactSelect
      autoFocus
      name={name}
      className={className}
      hideSelectedOptions
      isClearable={false}
      backspaceRemovesValue={false}
      isMulti={isMulti}
      options={options}
      placeholder="Search"
      styles={targetSearchStyle}
      onChange={onChange}
      components={{ MultiValueRemove: MultiValueRemove }}
      formatOptionLabel={(opt, context) => (
        <span dangerouslySetInnerHTML={{ __html: formatLabel(opt, context) }} />
      )}
    />
  );
};

export default NonSearchableDropdown;

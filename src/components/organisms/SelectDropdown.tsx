import { useState } from "react";
import ClearIcon from "../atoms/ClearIcon";
import Dropdown from "../templates/Dropdown";
import ControlItem from "../molecules/ControlItem";
import { formatLabel } from "../../utils/formatLabel";
import NonSearchableDropdown from "./NonSearchableDropdown";
import MultiValueRemove from "../molecules/MultiValueRemove";
import { TSelectComponent, TTypeOptions } from "../../types/select";
import { dropdownSearchStyle, targetSearchStyle } from "../../constants";
import ReactSelect, { InputActionMeta, SingleValue } from "react-select";

const SelectDropdown = (props: TSelectComponent) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>();

  const handleSearchInputChange = (val: string, meta: InputActionMeta) => {
    if (meta.action === "input-change") {
      setInputValue(val);
    } else {
      setInputValue(meta.prevInputValue);
    }
  };

  const handleValueChange = (args: SingleValue<TTypeOptions>) => {
    if (props.isMulti) {
      const val = Array.isArray(props.value) ? [...props.value, args] : [args];
      props.onChange(val);
    } else {
      props.onChange(args);
    }
    setInputValue(undefined);
    setIsOpen(false);
  };

  const handleDropdownIndicator = () =>
    inputValue ? <ClearIcon onClick={() => setInputValue(undefined)} /> : null;

  if (!props.withSearch) {
    return (
      <div>
        <NonSearchableDropdown {...props} />
      </div>
    );
  }

  return (
    <div>
      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        target={
          <ReactSelect
            className={props.className}
            menuIsOpen={false}
            isClearable={false}
            value={props.value}
            isSearchable={false}
            isMulti={props.isMulti}
            options={props.options}
            onMenuOpen={() => setIsOpen(true)}
            onChange={(val) => props.onChange(val)}
            components={{ MultiValueRemove: MultiValueRemove }}
            styles={{ ...targetSearchStyle, ...props.targetStyle }}
          />
        }
      >
        <ReactSelect
          autoFocus
          menuIsOpen={isOpen}
          placeholder="Search"
          value={props.value}
          isClearable={false}
          hideSelectedOptions
          inputValue={inputValue}
          tabSelectsValue={false}
          options={props.options}
          className={props.className}
          onChange={handleValueChange}
          backspaceRemovesValue={false}
          controlShouldRenderValue={false}
          onInputChange={handleSearchInputChange}
          styles={{ ...dropdownSearchStyle, ...props.style }}
          components={{
            Control: ControlItem,
            DropdownIndicator: handleDropdownIndicator,
            IndicatorSeparator: null,
          }}
          formatOptionLabel={(opt, context) => (
            <span
              dangerouslySetInnerHTML={{ __html: formatLabel(opt, context) }}
            />
          )}
        />
      </Dropdown>
    </div>
  );
};

export default SelectDropdown;

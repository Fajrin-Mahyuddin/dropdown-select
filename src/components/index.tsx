import { useState } from "react";
import ReactSelect from "react-select";
import ClearIcon from "./atoms/ClearIcon";
import Dropdown from "./templates/Dropdown";
import ControlItem from "./molecules/ControlItem";
import NonSearchableDropdown from "./NonSearchableDropdown";
import MultiValueRemove from "./molecules/MultiValueRemove";
import { TSelectComponent, TTypeOptions } from "../types/select";
import { dropdownSearchStyle, targetSearchStyle } from "../constants";

const SelectComponent = (props: TSelectComponent) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>();

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
        target={(() => {
          return (
            <ReactSelect
              isMulti={props.isMulti}
              value={props.value}
              menuIsOpen={false}
              isSearchable={false}
              isClearable={false}
              options={props.options}
              className="w-full"
              onMenuOpen={() => {
                setIsOpen(true);
              }}
              onChange={(val) => {
                // const value = val as typeof props.value
                if (props.isMulti) {
                  props.onChange(val as TTypeOptions[]);
                } else {
                  props.onChange(val as TTypeOptions);
                }
              }}
              components={{ MultiValueRemove: MultiValueRemove }}
              styles={targetSearchStyle}
            />
          );
        })()}
      >
        <ReactSelect
          className={props.className}
          autoFocus
          value={props.value}
          inputValue={inputValue}
          isClearable={false}
          hideSelectedOptions
          backspaceRemovesValue={false}
          controlShouldRenderValue={false}
          components={{
            Control: ControlItem,
            DropdownIndicator: () =>
              inputValue ? (
                <ClearIcon onClick={() => setInputValue(undefined)} />
              ) : null,
            IndicatorSeparator: null,
          }}
          menuIsOpen={isOpen}
          options={props.options}
          placeholder="Search"
          tabSelectsValue={false}
          onInputChange={(val, meta) => {
            if (meta.action === "input-change") {
              setInputValue(val);
            } else {
              setInputValue(meta.prevInputValue);
            }
          }}
          onChange={(newValue) => {
            if (props.isMulti) {
              const val = Array.isArray(props.value)
                ? [...props.value, newValue]
                : [newValue];
              props.onChange(val as TTypeOptions[]);
            } else {
              props.onChange(newValue as TTypeOptions);
            }

            setInputValue(undefined);
            setIsOpen(false);
          }}
          styles={{ ...dropdownSearchStyle, ...props.style }}
          formatOptionLabel={(opt, context) => {
            const regex = RegExp(`${context.inputValue}`, "gi");
            const text = opt.label.replace(regex, `<mark>$&</mark>`);
            return <span dangerouslySetInnerHTML={{ __html: text }} />;
          }}
        />
      </Dropdown>
      <br />
    </div>
  );
};

export default SelectComponent;

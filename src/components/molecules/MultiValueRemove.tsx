import { components, MultiValueRemoveProps } from "react-select";
import RemoveIcon from "../atoms/RemoveIcon";

const MultiValueRemove = (props: MultiValueRemoveProps<{ value: string }>) => {
  return (
    <components.MultiValueRemove {...props}>
      <RemoveIcon />
    </components.MultiValueRemove>
  );
};

export default MultiValueRemove;

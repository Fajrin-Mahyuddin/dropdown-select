import { components, MultiValueRemoveProps } from "react-select";
import RemoveIcon from "../atoms/RemoveIcon";
import { TTypeOptions } from "../../types/select";

const MultiValueRemove = (props: MultiValueRemoveProps<TTypeOptions>) => {
  return (
    <components.MultiValueRemove {...props}>
      <RemoveIcon />
    </components.MultiValueRemove>
  );
};

export default MultiValueRemove;

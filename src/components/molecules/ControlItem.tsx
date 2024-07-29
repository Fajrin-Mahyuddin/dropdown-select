import { components, ControlProps } from "react-select";
import DropdownIcon from "../atoms/DropdownIcon";
import { TTypeOptions } from "../../types/select";

const ControlItem = ({ children, ...props }: ControlProps<TTypeOptions>) => (
  <components.Control {...props}>
    <DropdownIcon /> {children}
  </components.Control>
);

export default ControlItem;

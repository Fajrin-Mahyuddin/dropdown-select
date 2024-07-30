import { FormatOptionLabelMeta } from "react-select";
import { TTypeOptions } from "../types/select";

export const formatLabel = (
  opt: TTypeOptions,
  context: FormatOptionLabelMeta<TTypeOptions>,
) => {
  const regex = RegExp(`${context.inputValue}`, "gi");
  const text = opt.label.replace(regex, `<mark>$&</mark>`);
  return text;
};

import { StylesConfig } from "react-select";

export type TTypeOptions = {
  label: string;
  value: string;
};

export type TSelectComponent = {
  name: string;
  options: TTypeOptions[];
  className?: string;
  style?: StylesConfig<TTypeOptions, false>;
  targetStyle?: StylesConfig<TTypeOptions, false>;
  withSearch: boolean;
  onChange: (e: TTypeOptions[] | TTypeOptions) => void;
  isMulti: boolean;
  value: TTypeOptions[] | TTypeOptions;
} & (
  | {
      // isMulti: true;
      // value?: TTypeOptions[]
      // onChange: (e: TTypeOptions[] | undefined) => void;
    }
  | {
      // isMulti: false;
      // value?: TTypeOptions
      // onChange: (e: TTypeOptions | undefined) => void;
    }
);

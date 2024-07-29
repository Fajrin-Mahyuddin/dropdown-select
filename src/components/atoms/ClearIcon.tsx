import RemoveIcon from "./RemoveIcon";

const ClearIcon = ({ onClick }: { onClick: () => void }) => (
  <span className="mr-1 cursor-pointer justify-center flex" onClick={onClick}>
    <RemoveIcon />
  </span>
);

export default ClearIcon;

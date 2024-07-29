import ReactSelect, { components, ControlProps } from "react-select";
import { TSelectComponent, TTypeOptions } from "../types/select";
import { ReactNode, useState } from "react";
import NonSearchableDropdown from "./NonSearchableDropdown";
import { dropdownSearchStyle, targetSearchStyle } from "../constants";
import MultiValueRemove from "./molecules/MultiValueRemove";
// type TValue = {
// 	label: string,
// 	value: string
// }

const SelectComponent = (props: TSelectComponent) => {
	const [isOpen, setIsOpen] = useState(false);
	// const [value, setValue] = useState<SingleValue<TValue> | MultiValue<TValue>>();
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
						Control,
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

const Control = ({ children, ...props }: ControlProps<TTypeOptions, false>) => (
	<components.Control {...props}>
		<DropdownIndicator /> {children}
	</components.Control>
);

const ClearIcon = ({ onClick }: { onClick: () => void }) => (
	<span className="mr-2 cursor-pointer" onClick={onClick}>
		<svg
			height="20"
			width="20"
			viewBox="0 0 20 20"
			aria-hidden="true"
			focusable="false"
			className="css-8mmkcg"
		>
			<path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
		</svg>
	</span>
);

const DropdownIndicator = () => (
	<div className="text-[#979797] h-[24px] w-[32px] ml-1">
		<svg>
			<path
				d="M16.436 15.085l3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
				fill="currentColor"
				fillRule="evenodd"
			/>
		</svg>
	</div>
);

const Menu = (props: JSX.IntrinsicElements["div"]) => {
	const shadow = "hsla(218, 50%, 10%, 0.1)";
	return (
		<div
			style={{
				backgroundColor: "white",
				borderRadius: 4,
				boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
				marginTop: 8,
				position: "absolute",
				zIndex: 2,
				width: "100%",
			}}
			{...props}
		/>
	);
};
const Blanket = (props: JSX.IntrinsicElements["div"]) => (
	<div
		style={{
			bottom: 0,
			left: 0,
			top: 0,
			right: 0,
			position: "fixed",
			zIndex: 1,
			// backgroundColor: 'salmon'
		}}
		{...props}
	/>
);

const Dropdown = ({
	children,
	isOpen,
	target,
	onClose,
}: {
	children?: ReactNode;
	readonly isOpen: boolean;
	readonly target: ReactNode;
	readonly onClose: () => void;
}) => (
	<div className="relative w-full">
		{target}
		{isOpen ? <Menu>{children}</Menu> : null}
		{isOpen ? <Blanket onClick={onClose} /> : null}
	</div>
);

export default SelectComponent;
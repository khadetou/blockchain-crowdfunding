import { FC, MouseEventHandler } from "react";

type BtnType = "button" | "submit" | "reset" | undefined;
interface CustomButtonProps {
  btnType: BtnType;
  title: string;
  handleClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  styles: string;
}
const CustomButton: FC<CustomButtonProps> = ({
  btnType,
  title,
  handleClick,
  styles,
}) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;

import { FC, MouseEventHandler, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { logo, sun } from "@/img";
import { navlinks } from "@/constants";
import Image from "next/image";

interface IconsProps {
  styles?: string;
  name?: string;
  imgUrl: string;
  isActive?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}

const Icon: FC<IconsProps> = ({
  disabled,
  imgUrl,
  isActive,
  name,
  styles,
  onClick,
}) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] ${
      isActive && isActive === name && "bg-[#2c2f32]"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={onClick}
  >
    {!isActive ? (
      <Image src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <Image
        src={imgUrl}
        alt="fund_logo"
        className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const Sidebar = () => {
  const { push } = useRouter();
  const [isActive, setIsActive] = useState("dashboard");
  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link href="/">
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              onClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  push(`/${link.link}`);
                }
              }}
            />
          ))}
        </div>
        <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  );
};

export default Sidebar;

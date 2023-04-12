import { FC } from "react";
import FundCard from "./FundCard";
import { loader } from "@/img";
import Image from "next/image";

interface DisplayCampaignsProps {
  title: string;
  isLoading: boolean;
  campaigns: any;
}

const DisplayCampaigns: FC<DisplayCampaignsProps> = ({
  campaigns,
  isLoading,
  title,
}) => {
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <Image
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign: any, id: number) => (
            <FundCard key={campaign.title} {...campaign} />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;

import { useContext, createContext, PropsWithChildren } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import {
  EditionMetadataWithOwnerOutputSchema,
  SmartContract,
} from "@thirdweb-dev/sdk";

type StateContextType = {
  contract: SmartContract<ethers.BaseContract> | undefined;
  address: string | undefined;
  connect: (
    connectOptions?:
      | {
          chainId?: number | undefined;
        }
      | undefined
  ) => Promise<void>;
  getCampaigns: () => Promise<any>;
  donate: (pId: any, amount: any) => Promise<any>;
  getDonations: (pId: any) => Promise<
    | {
        donator: any;
        donation: string;
      }[]
    | undefined
  >;
  createCampaign: (form: FormData) => Promise<void>;
  getUserCampaigns: () => Promise<any>;
};
const StateContext = createContext<{
  contract: SmartContract<ethers.BaseContract> | undefined;
  address: string | undefined;
  connect: (
    connectOptions?:
      | {
          chainId?: number | undefined;
        }
      | undefined
  ) => Promise<void>;
  getCampaigns: () => Promise<any>;
  donate: (pId: any, amount: any) => Promise<any>;
  getDonations: (pId: any) => Promise<
    | {
        donator: any;
        donation: string;
      }[]
    | undefined
  >;
  createCampaign: (form: FormData) => Promise<void>;
  getUserCampaigns: () => Promise<any>;
}>(null as unknown as StateContextType);

interface FormData {
  title: string;
  description: string;
  target: any;
  deadline: number;
  image: string;
}

export const StateContextProvider = ({ children }: PropsWithChildren) => {
  const { contract } = useContract(
    "0x5Ff4B6A7D57f637a30F00ab7C77Bb57Edb30d373"
  );

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  //   PUBLISH CAMPAIGN
  const publishCampaign = async (form: FormData) => {
    try {
      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });

      console.log("Contract call success", data);
    } catch (error) {
      console.log("Contract call faillure", error);
    }
  };

  //   GET CAMPAIGNs
  const getCampaigns = async () => {
    const campaigns = await contract!.call("getCampaigns");

    const parsedCampaigns = campaigns.map((campaign: any, i: number) => ({
      owner: campaign.owner,
      title: campaign.title,
      descrition: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      pId: i,
    }));

    return parsedCampaigns;
  };

  //   GET USER CAMPAIGNS
  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign: any) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  //   DONATE
  const donate = async (pId: any, amount: any) => {
    const data = await contract!.call("donateToCampaign", pId, {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  //   GET DONATIONS
  const getDonations = async (pId: any) => {
    const donations = await contract!.call("getDonators", pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];
    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
      return parsedDonations;
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        contract,
        createCampaign: publishCampaign,
        getCampaigns,
        donate,
        getDonations,
        getUserCampaigns,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

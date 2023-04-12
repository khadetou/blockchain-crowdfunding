import Image from "next/image";
import { Inter } from "next/font/google";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { useStateContext } from "@/context";
import DisplayCampaigns from "@/components/DisplayCampaigns";
import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);
  return (
    <Layout>
      <DisplayCampaigns
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </Layout>
  );
}

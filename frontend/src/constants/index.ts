import {
  createCampaign,
  dashboard,
  logout,
  payment,
  profile,
  withdraw,
} from "@/img";
type NavLinks = {
  name: string;
  imgUrl: any;
  link: string;
  disabled?: boolean;
}[];
export const navlinks: NavLinks = [
  {
    name: "dashboard",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "campaign",
    imgUrl: createCampaign,
    link: "/create-campaign",
  },
  {
    name: "payment",
    imgUrl: payment,
    link: "/",
    disabled: true,
  },
  {
    name: "withdraw",
    imgUrl: withdraw,
    link: "/",
    disabled: true,
  },
  {
    name: "profile",
    imgUrl: profile,
    link: "/profile",
  },
  {
    name: "logout",
    imgUrl: logout,
    link: "/",
    disabled: true,
  },
];

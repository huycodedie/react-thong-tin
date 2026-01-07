import Envelope from "../pages/Profile_pages/Pages_profile/Envelope_list/Envelope";
import lucky_money_list_user from "../pages/Profile_pages/Pages_profile/Envelope/Lucky_money_list_users";
import NotFound_page from "../pages/NotFound/NotFound_page";
import Information from "../pages/Profile_pages/Pages_profile/Information/Information";

export const tabprofile = [
  {
    path: "/",
    page: Information,
  },
  {
    path: "/li-xi-ca-nhan",
    page: lucky_money_list_user,
  },
  {
    path: "/li-xi-ca-nhan/thongtin",
    page: Envelope,
  },
  {
    path: "*",
    page: NotFound_page,
  },
];

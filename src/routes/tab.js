// import AppAnt from "../components/Message/MessageAnt";
import Home_admin from "../pages/Admin/Home_admin/Home_admin";
import Home_pages from "../pages/Home_pages/Home_pages";
import Login_pages from "../pages/Login_pages/Login_pages";
import Lucky_money_pages from "../pages/Lucky_money_pages/Lucky_money_pages";
import NotFound_page from "../pages/NotFound/NotFound_page";
// import test from "../pages/Profile_pages/Pages_profile/Add/Add_lucky/Add_lucky";
import Profile_pages from "../pages/Profile_pages/Profile_pages";
import Register_pages from "../pages/Register_pages/Register_pages";

export const tab = [
    {
        path: '/',
        page: Home_pages,
        isShow: true
    },
    {
        path: '/profile/*',
        page: Profile_pages,
        isShow: true
    },
    {
        path: '/Admin/',
        page: Home_admin,
        isShow: true
    },
    {
        path: '/Lucky-money-pages',
        page: Lucky_money_pages,
        isShow: false
    },{
        path: '/Register',
        page: Register_pages,
        isShow: false
    },
    {
        path: '/Login',
        page: Login_pages,
        isShow: false
    },
    {
        path: '*',
        page: NotFound_page
    },
    ///test con profile
    // {
    //     path: '/test',
    //     page: AppAnt,
    //     isShow: false
    // },
]
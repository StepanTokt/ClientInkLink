import Admin from "./pages/Admin";
import {ALL_INFORMATION, ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, DELIVERY, CONTACTS} from "./utils/consts";
import Basket from "./pages/Basket";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage";
import AllInformation from "./pages/AllInformation";
import Delivery from "./pages/Delivery";
import Contacts from "./pages/Contacts";


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
    {
        path: ALL_INFORMATION,
        Component: AllInformation
    },
    {
        path: DELIVERY,
        Component: Delivery
    },
    {
        path: CONTACTS,
        Component: Contacts
    },
]
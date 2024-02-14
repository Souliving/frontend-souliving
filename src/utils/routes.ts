
import RegistrationPage from '@/pages/registration-page/RegistrationPage'
import {
    MAIN_ROUTE, REGISTRATION_ROUTE} from './constRoutes'
import MainPage from '@/pages/MainPage'



//массив доступных страниц авторизованному пользователю
export const authRoutes=[
{
    /* path:HOME_AUTH_USER,
    Component:UserHomePage */
},


]
//массив доступных страниц неавторизованному пользователю
export const publicRoutes=[
{
    path: MAIN_ROUTE,
    Component: MainPage
},
{
    path:REGISTRATION_ROUTE,
    Component:RegistrationPage
}
/* {
    path:LOGIN_ROUTE,
    Component:Login
},
{
    path:ALL_ADS_ROUTE,
    Component:AllAds
},
{
    path:AD_ROUTE +"/:id",
    Component:OneAd
}  */
]
 



import RegistrationPage from '@/pages/registration-page/RegistrationPage'
import MainPage from '@/pages/MainPage'
import OneAdPage from '@/pages/one-ad-page/OneAdPage'
import {
    AD_ROUTE,
    MAIN_ROUTE, 
    REGISTRATION_ROUTE} from './constRoutes'





//массив доступных страниц авторизованному пользователю
export const authRoutes =[
    {
        path: AD_ROUTE +'/:id',
        Component: OneAdPage
    }
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

 


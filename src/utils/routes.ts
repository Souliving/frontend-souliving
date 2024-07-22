
import RegistrationPage from '@/pages/registration-page/RegistrationPage'
import MainPage from '@/pages/MainPage'
import OneAdPage from '@/pages/one-ad-page/OneAdPage'
import {
    AD_ROUTE,
    FAVORITES_ROUTE,
    MAIN_ROUTE, 
    REGISTRATION_ROUTE,
    USER_ACCOUNT_ROUTE} from './constRoutes'
import AccountFormPage from '@/pages/user-account-page/account-form-page'
import FAQPage from '@/pages/user-account-page/faq/faq-page'
import { Component } from 'lucide-react'
import FavoritesPage from '@/pages/favorites-page/FavoritesPage'





//массив доступных страниц авторизованному пользователю
export const authRoutes =[
    {
        path: AD_ROUTE +'/:id',
        Component: OneAdPage,
        requiresLayout: false
    },
    {
        path: USER_ACCOUNT_ROUTE +'/:user_id',
        Component: AccountFormPage,
        requiresLayout: true
    },
    {
        path: USER_ACCOUNT_ROUTE +'/faq',
        Component: FAQPage,
        requiresLayout: true
    },
    {
        path: FAVORITES_ROUTE +'/:user_id',
        Component: FavoritesPage,
        requiresLayout: false
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

 


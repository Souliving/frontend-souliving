import { User } from "@/utils/dataStructure";
import { makeAutoObservable } from "mobx"

export default class UserStore {
    _isAuth:boolean;
    _user: User;

    constructor() {
        this._isAuth = false
        this._user = {
            id: -1,
            email: '',
            name: ''
        }
       /*  this._account = {} */
        makeAutoObservable(this)
    }

    setIsAuth(auth:boolean) {
        this._isAuth = auth
    }
    setUser(user: User) {
        this._user = user
    }
   /*  setAccount(account){
        this._account = account
    } */
    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    /* get account(){
        return this._account
    } */
}

export const emptyUser: User = {
    id: -1,
    email: '',
    name: '',
   
  };

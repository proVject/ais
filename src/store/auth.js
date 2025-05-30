import { defineStore } from 'pinia'
import LoginApi from "../api/auth.js";
import {ACCESS_TOKEN_NAME} from "../constants/auth.js";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: null, // null | true | false,
        loginLoading: false,
        isActiveLoading: false,
    }),
    actions: {
       async login(credentials) {
           try {
               this.loginLoading = true
               const data = await LoginApi.login(credentials)
               localStorage.setItem(ACCESS_TOKEN_NAME, data.token)
               return data
           } catch (e) {
               // additional handle
               throw Error(e.response.data.message)
           } finally {
               this.loginLoading = false
           }
       },
       async isActive() {
           try {
               this.isActiveLoading = true
               const token = localStorage.getItem(ACCESS_TOKEN_NAME)
               const data = await LoginApi.isActive(token)
               this.isLoggedIn = data
               return data
           } catch (e) {
               // todo always returns that token is expired - backend side issue
               // additional handle
               this.isLoggedIn = false
               throw Error(e.response.data.message)
           } finally {
               this.isActiveLoading = false
           }
       },
        logout() {
           localStorage.removeItem(ACCESS_TOKEN_NAME)
           this.isLoggedIn = false
        }
    }
})
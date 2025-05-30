import {useAuthStore} from "../store/auth.js";
import {useRouter} from "vue-router";
import {ACCESS_TOKEN_NAME} from "../constants/auth.js";

export const useAuthProtection = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN_NAME);
    const router = useRouter();

    if (!token) {
        return router.push({ name: 'Login' })
    }

    const authStore = useAuthStore()
    try {
        await authStore.isActive()
    } catch (e) {}

    // todo remove after fix on the backend side
    authStore.isLoggedIn = true
    if (authStore.isLoggedIn === false) {
        return router.push({ name: 'Login' })
    }
}
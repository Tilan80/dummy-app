import { createWebHistory, createRouter } from "vue-router"
import Login from "./views/LoginPage.vue";
import Home from "./views/HomePage.vue";
import Products from "./views/ProductsPage.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Login",
            component: Login,
        },
        {
            path: "/Home",
            name: "Home",
            component: Home,
        },
        {
            path: "/products",
            name: "Products",
            component: Products,
        },
    ]
})
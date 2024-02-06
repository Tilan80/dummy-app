import { createWebHistory, createRouter } from "vue-router";
import Login from "./views/LoginPage.vue";
import Home from "./views/HomePage.vue";
import Products from "./views/ProductsPage.vue";
import Carts from "./views/CartsPage.vue";
import Users from "./views/UsersPage.vue";
import Signup from "./views/SignupPage.vue";
import Cookies from "js-cookie";

const isAuthenticated = () => {
    const accessToken = Cookies.get("access.wn98qmjb");
    return !!accessToken;
};

export const router = createRouter({
    history: createWebHistory('/dummy-app/'),
    routes: [
        {
            path: "/",
            name: "Login",
            component: Login,
        },
        {
            path: "/signup",
            name: "Signup",
            component: Signup,
        },
        {
            path: "/Home",
            name: "Home",
            component: Home,
            meta: { requiresAuth: true },
        },
        {
            path: "/products",
            name: "Products",
            component: Products,
            meta: { requiresAuth: true },
        },
        {
            path: "/carts",
            name: "Carts",
            component: Carts,
            meta: { requiresAuth: true },
        },
        {
            path: "/users",
            name: "Users",
            component: Users,
            meta: { requiresAuth: true },
        },
    ]
})

// Global navigation guard
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated()) {
        // Redirect to the login page if authentication is required and the user is not authenticated
        next({ name: "Login" });
    } else {
        // Continue to the next route
        next();
    }
});

export default router;

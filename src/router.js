import { createWebHistory, createRouter } from "vue-router";
import Login from "./views/LoginPage.vue";
import Home from "./views/HomePage.vue";
import Products from "./views/ProductsPage.vue";
import Carts from "./views/CartsPage.vue";
import Users from "./views/UsersPage.vue";
import Signup from "./views/SignupPage.vue";
import Cookies from "js-cookie";


export const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
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
            path: "/home",
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
        {
            path: "/:pathMatch(.*)",
            redirect: "/" // Redirect to home page
        },
    ]
})

// Global navigation guard
router.beforeEach((to, from, next) => {
    const isAuthenticated = !!Cookies.get("access.wn98qmjb");

    if (to.name === 'Login' || to.name === 'Signup') {
        // If the user is authenticated, redirect to the Home page
        if (isAuthenticated) {
            next({ name: "Home" });
        } else {
            next();
        }
    } else if (to.meta.requiresAuth && !isAuthenticated) {
        // Redirect to the login page if authentication is required and the user is not authenticated
        next({ name: "Login" });
    } else {
        // Continue to the next route
        next();
    }
});


export default router;

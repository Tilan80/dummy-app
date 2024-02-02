<template>
    <v-app>
        <v-navigation-drawer v-model="sidebar" app>
            <v-list>
                <v-list-item v-for="item in menuItems" :key="item.title" :to="item.path">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>{{ item.title }}</v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
            <v-app-bar-title>
                <router-link to="/home" style="cursor: pointer">
                    {{ appTitle }}
                </router-link>
            </v-app-bar-title>
            <v-spacer></v-spacer>
            <v-app-bar-nav-icon v-if="!$vuetify.breakpoint.xs"></v-app-bar-nav-icon>
            <v-app-bar-items v-if="$vuetify.breakpoint.xs">
                <v-btn v-for="item in menuItems" :key="item.title" :to="item.path" text>
                    <v-icon left dark>{{ item.icon }}</v-icon>
                    {{ item.title }}
                </v-btn>
            </v-app-bar-items>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>
  
<script>
export default {
    name: "NavBar",
    data() {
        return {
            appTitle: "Awesome App",
            sidebar: false,
            menuItems: [
                { title: "Home", path: "/home"},
                { title: "Products", path: "/products"},
                { title: "Carts", path: "/products"},
            ],
        };
    },
};
</script>
  
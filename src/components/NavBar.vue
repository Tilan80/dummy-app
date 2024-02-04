<template>
    <v-app>
      <v-app-bar app class="absolute" z-index="1000">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link to="/home" class="router-link">Dummy App</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
  
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-app-bar>
  
      <v-navigation-drawer app v-model="drawer" class="absolute" z-index="999">
        <v-list>
          <v-list-item v-for="link in links" :key="link.text" :to="link.to" link>
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <router-link :to="link.to" class="router-link">{{ link.text }}</router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-main>
        <!-- Your main content goes here -->
        <router-view></router-view>
      </v-main>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        drawer: false,
        links: [
          { text: 'Products', to: '/products', icon: 'mdi-shopping' },
          { text: 'Carts', to: '/carts', icon: 'mdi-cart' },
          { text: 'Users', to: '/users', icon: 'mdi-account' },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .router-link {
    text-decoration: none;
    color: inherit;
  }
  .absolute {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  </style>
  
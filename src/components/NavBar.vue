<!-- YourMainComponent.vue -->
<template>
  <v-layout>
    <v-navigation-drawer expand-on-hover rail>
      <v-list>
        <v-list-item prepend-icon="mdi-home" title="Dummy APP" to="/home"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-folder" title="Products" to="/products"></v-list-item>
        <v-list-item prepend-icon="mdi-cart-outline" title="Carts" to="/carts"></v-list-item>
        <v-list-item prepend-icon="mdi-account" title="Users" to="/users"></v-list-item>
        <v-divider></v-divider>
        <!-- Use the CustomLogoutButton component here -->
        <v-list-item prepend-icon="mdi-logout" title="Logout" @click="logout"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main style="height: 250px"></v-main>
  </v-layout>
</template>

<script setup>
import Userfront from "@userfront/toolkit/vue";
import { ref } from "vue";

Userfront.init("wn98qmjb");

const user = ref(null);

const logout = async () => {
  await Userfront.logout();
  user.value = null; // Clear the user data
};
</script>

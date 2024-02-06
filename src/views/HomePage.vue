<template>
  <v-container class="text-center">
    <v-row>
      <v-col>
        <!-- Big title at the top -->
        <div class="text-h3 mb-15">Welcome to My Dummy App</div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col v-for="card in cards" :key="card.id" class="ma-4">
        <!-- Use v-card component to make it bigger -->
        <v-card :to="card.to" class="bg-blue-darken-2">
          <v-card-text class="text-h5">
            <v-icon left>{{ card.icon }}</v-icon>
            {{ card.title }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <logout-button />
  </v-container>
</template>
  
<script>
import Userfront from "@userfront/toolkit/vue";

Userfront.init("wn98qmjb");
export default {
  data() {
    return {
      cards: [
        {
          id: 1,
          title: 'Products',
          icon: 'mdi-folder',
          to: '/products',
        },
        {
          id: 2,
          title: 'Carts',
          icon: 'mdi-cart-outline',
          to: '/carts',
        },
        {
          id: 3,
          title: 'Users',
          icon: 'mdi-account',
          to: '/users',
        },
      ],
    };
  },
};
</script>

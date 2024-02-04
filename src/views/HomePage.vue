<template>
    <v-app>
      <v-container class="d-flex align-center justify-center" style="height: 80vh;">
        <v-row justify="center">
          <v-col v-for="card in cards" :key="card.id" class="ma-4">
            <v-card :to="card.to" class="card" color="primary" dark>
              <v-img :src="card.image" height="200">
                <v-row class="fill-height align-center justify-center">
                  <v-col>
                    <v-card-title class="white--text text-center">{{ card.title }}</v-card-title>
                  </v-col>
                </v-row>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cards: [
          {
            id: 1,
            title: 'Products',
            image: 'https://via.placeholder.com/600x400',
            to: '/products',
          },
          {
            id: 2,
            title: 'Carts',
            image: 'https://via.placeholder.com/600x400',
            to: '/carts',
          },
          {
            id: 3,
            title: 'Users',
            image: 'https://via.placeholder.com/600x400',
            to: '/users',
          },
        ],
      };
    },
  };
  </script>
  
  <style>
  .card {
    cursor: pointer;
  }
  
  .card:hover {
    transform: scale(1.1);
  }
  </style>
<template>
    <div class="login-container">
      <signup-form />
      <v-btn to="/dummy-app/" class="signup-button bg-indigo-darken-1">Log in</v-btn>
    </div>
  </template>
  
  <script setup>
  import Userfront from "@userfront/toolkit/vue";
  
  Userfront.init("wn98qmjb");
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  .signup-button {
    margin-top: 20px; /* Adjust the margin as needed */
  }
  </style>
  
<template>
    <v-app>
        <v-container fluid>
            <v-row align="center" justify="center">
                <v-col xs="12" sm="8" md="6">
                    <v-alert v-if="alert" type="error">{{ alert }}</v-alert>

                    <v-form @submit.prevent="loginWithPassword">
                        <v-text-field v-model="emailOrUsername" label="Email or username" outlined required></v-text-field>
                        <v-text-field v-model="password" label="Password" type="password" outlined required></v-text-field>
                        <v-btn type="submit" color="primary">Log in</v-btn>
                    </v-form>

                    <v-divider class="my-4"></v-divider>

                    <v-btn @click.prevent="loginWithSSO" color="error">Log in with Google</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
  
<script>
import Userfront from "@userfront/core";

Userfront.init("wn98qmjb");

export default {
    data() {
        return {
            emailOrUsername: "",
            password: "",
            alert: "",
        };
    },
    methods: {
        async loginWithPassword() {
            this.alert = "";

            try {
                // DummyJSON Authentication
                const authResponse = await fetch('https://dummyjson.com/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: this.emailOrUsername,
                        password: this.password,
                    }),
                });

                if (!authResponse.ok) {
                    // Handle authentication error
                    throw new Error('Authentication failed');
                }

                // Assuming DummyJSON returns the authentication token in the response
                const authData = await authResponse.json();
                const authToken = authData.token;

                // Use the obtained token for further requests to DummyJSON or other secured endpoints
                console.log('Authentication Token:', authToken);

                // Userfront login
                await Userfront.login({
                    method: "password",
                    emailOrUsername: this.emailOrUsername,
                    password: this.password,
                });

                // Redirect to home page after successful login
                this.$router.push({ name: 'home' });

            } catch (error) {
                this.alert = "Login failed. Please check your credentials.";
                console.error('Login error:', error);
            }
        },
        loginWithSSO() {
            Userfront.login({ method: "google" });
        },
    },
};
</script>
<style scoped>
button,
input {
    display: block;
    margin-bottom: 10px;
}

#alert {
    color: red;
    margin-bottom: 10px;
}
</style>


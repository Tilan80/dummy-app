<template>
    <v-container>
        <h1 class="mb-5">Carts Page</h1>

        <v-row>
            <!-- Button for getAllCarts -->
            <v-col>
                <v-btn @click="getAllCarts">Get All Carts</v-btn>
            </v-col>

            <!-- Button for getSingleCart -->
            <v-col>
                <v-btn @click="toggleGetSingleCart">Get Cart By ID</v-btn>
                <v-text-field v-if="showGetSingleCartInput" v-model="cartIdInput" label="Enter Cart ID"></v-text-field>
                <v-btn v-if="showGetSingleCartInput" @click="getSingleCart">Submit</v-btn>
            </v-col>

            <!-- Button and input for getCartsByUser -->
            <v-col>
                <v-btn @click="toggleGetCartsByUser">Get Carts By User</v-btn>
                <v-text-field v-if="showGetCartsByUserInput" v-model="userId" label="Enter User ID"></v-text-field>
                <v-btn v-if="showGetCartsByUserInput" @click="getCartsByUser">Submit</v-btn>
            </v-col>

            <!-- Button for addNewCart -->
            <v-col>
                <v-btn @click="addNewCart">Add New Cart</v-btn>
            </v-col>
        </v-row>

        <v-divider class="my-4"></v-divider>

        <!-- Displaying Cart Data -->
        <v-row v-if="carts.length > 0">
            <v-col v-for="cart in carts" :key="cart.id" class="ma-4">
                <v-card elevation="10">
                    <v-card-title>Cart ID: {{ cart.id }}</v-card-title>
                    <v-card-subtitle>User ID: {{ cart.userId }}</v-card-subtitle>
                    <v-card-subtitle>Total: {{ cart.total }}</v-card-subtitle>
                    <v-card-subtitle>Discounted Total: {{ cart.discountedTotal }}</v-card-subtitle>
                    <v-card-subtitle>Total Products: {{ cart.totalProducts }}</v-card-subtitle>
                    <v-card-subtitle>Total Quantity: {{ cart.totalQuantity }}</v-card-subtitle>

                    <!-- Displaying Products in the Cart -->
                    <v-list>
                        <v-list-item-group v-if="cart.products.length > 0">
                            <v-list-item v-for="product in cart.products" :key="product.id">
                                <v-list-item-content>
                                    <v-list-item-title>{{ product.title }}</v-list-item-title>
                                    <v-list-item-subtitle>Price: {{ product.price }}</v-list-item-subtitle>
                                    <v-list-item-subtitle>Quantity: {{ product.quantity }}</v-list-item-subtitle>
                                    <v-list-item-subtitle>Total: {{ product.total }}</v-list-item-subtitle>
                                    <!-- Add other product details as needed -->
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>

                    <v-menu>
                        <template v-slot:activator="{ props }">
                            <v-btn icon="mdi-dots-vertical" elevation="5" v-bind="props"></v-btn>
                        </template>

                        <v-list>
                            <v-list-item @click="openUpdateProductDialog(product)">
                                <template v-slot:prepend>
                                    <v-icon icon="mdi-pencil"></v-icon>
                                </template>
                                <v-list-item-title>Update</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="deleteProduct(product.id)">
                                <template v-slot:prepend>
                                    <v-icon icon="mdi-delete"></v-icon>
                                </template>
                                <v-list-item-title>Delete</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-card>
            </v-col>
        </v-row>

        <!-- Add Cart Dialog -->
        <v-dialog v-model="addCartDialog" max-width="600">
            <v-card>
                <v-card-title>Add New Cart</v-card-title>
                <v-card-text>
                    <!-- Form for collecting new cart details -->
                    <v-form ref="addCartForm">
                        <v-text-field v-model="newCart.userId" label="User ID"></v-text-field>
                        <v-text-field v-model="newCart.products" label="Products (Array of Objects)"></v-text-field>
                        <!-- You may want to use a picker or other input methods for product selection -->
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <!-- Button to submit the new cart -->
                    <v-btn @click="submitNewCart">Submit</v-btn>
                    <v-btn @click="closeAddCartDialog">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Update Cart Dialog -->
        <v-dialog v-model="updateCartDialog" max-width="600">
            <v-card>
                <v-card-title>Update Cart</v-card-title>
                <v-card-text>
                    <!-- Form for collecting updated cart details -->
                    <v-form ref="updateCartForm">
                        <v-text-field v-model="updatedCart.userId" label="User ID"></v-text-field>
                        <v-text-field v-model="updatedCart.products" label="Products (Array of Objects)"></v-text-field>
                        <!-- You may want to use a picker or other input methods for product selection -->
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <!-- Button to submit the updated cart -->
                    <v-btn @click="submitUpdatedCart">Submit</v-btn>
                    <v-btn @click="closeUpdateCartDialog">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            carts: [],
            userId: '',
            showGetCartsByUserInput: false,
            addCartDialog: false,
            newCart: {
                userId: '',
                products: [],
            },
            updateCartDialog: false,
            updatedCart: {
                id: 0,
                userId: '',
                products: [],
            },
            showGetSingleCartInput: false,
            cartIdInput: '', // Added for inputting cart ID
        };
    },
    methods: {
        getAllCarts() {
            // Fetch all carts
            axios.get('https://dummyjson.com/carts')
                .then(response => {
                    this.carts = response.data.carts;
                })
                .catch(error => {
                    console.error('Error fetching carts:', error);
                });
        },
        getSingleCart() {
            // Fetch a single cart by ID
            const cartId = this.cartIdInput;
            axios.get(`https://dummyjson.com/carts/${cartId}`)
                .then(response => {
                    this.carts = [response.data];
                })
                .catch(error => {
                    console.error('Error fetching cart by ID:', error);
                });

            // Reset the input and hide the text field
            this.cartIdInput = '';
            this.showGetSingleCartInput = false;
        },
        toggleGetSingleCart() {
            this.showGetSingleCartInput = !this.showGetSingleCartInput;
        },
        toggleGetCartsByUser() {
            // Toggle input for getting carts by user
            this.showGetCartsByUserInput = !this.showGetCartsByUserInput;
        },
        getCartsByUser() {
            // Fetch carts of a user
            const userId = this.userId;
            axios.get(`https://dummyjson.com/carts/user/${userId}`)
                .then(response => {
                    this.carts = response.data.carts;
                })
                .catch(error => {
                    console.error('Error fetching carts by user:', error);
                });
        },
        addNewCart() {
            // Open the dialog for adding a new cart
            this.addCartDialog = true;
        },
        closeAddCartDialog() {
            // Close the dialog for adding a new cart
            this.addCartDialog = false;
        },
        submitNewCart() {
            // Validate the form before submitting
            if (this.$refs.addCartForm.validate()) {
                // Simulated POST request to add a new cart
                fetch('https://dummyjson.com/carts/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.newCart),
                })
                    .then(res => res.json())
                    .then(newCart => {
                        // Display the new cart in the console
                        console.log('Newly Created Cart:', newCart);

                        // Add the new cart to the existing carts array
                        this.carts.unshift(newCart);

                        // Close the dialog after successful submission
                        this.closeAddCartDialog();
                    })
                    .catch(error => {
                        console.error('Error adding new cart:', error);
                    });
            }
        },
        updateCart() {
            // Open the dialog for updating a cart
            this.updateCartDialog = true;
        },
        closeUpdateCartDialog() {
            // Close the dialog for updating a cart
            this.updateCartDialog = false;
        },
        submitUpdatedCart() {
            // Validate the form before submitting
            if (this.$refs.updateCartForm.validate()) {
                // Simulated PUT/PATCH request to update a cart
                fetch(`https://dummyjson.com/carts/${this.updatedCart.id}`, {
                    method: 'PUT', // or PATCH
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        merge: true,
                        userId: this.updatedCart.userId,
                        products: this.updatedCart.products,
                    }),
                })
                    .then(res => res.json())
                    .then(updatedCart => {
                        // Display the updated cart in the console
                        console.log('Updated Cart:', updatedCart);

                        // Find the index of the updated cart in the carts array
                        const index = this.carts.findIndex(c => c.id === updatedCart.id);

                        // Update the cart in the array
                        if (index !== -1) {
                            // Use Vue 3 reactivity to update the property directly
                            this.carts[index] = updatedCart;
                        }

                        // Close the dialog after successful submission
                        this.closeUpdateCartDialog();
                    })
                    .catch(error => {
                        console.error('Error updating cart:', error);
                    });
            }
        },
        deleteCart(cartId) {
            // Simulated DELETE request to delete a cart
            fetch(`https://dummyjson.com/carts/${cartId}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(deletedCart => {
                    // Display the deleted cart in the console
                    console.log('Deleted Cart:', deletedCart);

                    // Update the carts array by filtering out the deleted cart
                    this.carts = this.carts.filter(c => c.id !== deletedCart.id);
                })
                .catch(error => {
                    console.error('Error deleting cart:', error);
                });
        },
    },
};
</script>

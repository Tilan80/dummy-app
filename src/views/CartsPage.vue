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
                <v-btn class="green-border" @click="addNewCart">Add New Cart</v-btn>
            </v-col>
        </v-row>

        <v-divider class="my-4"></v-divider>

        <!-- Displaying Cart Data -->
        <v-row v-if="carts.length > 0">
            <v-col v-for="cart in carts" :key="cart.id" class="ma-4">
                <!-- Cart Details -->
                <v-card elevation="10">
                    <v-card-title>Cart ID: {{ cart.id }}</v-card-title>
                    <v-card-subtitle class="mb-2">User ID: {{ cart.userId }}</v-card-subtitle>



                    <!-- Products in the Cart -->
                    <v-expansion-panels>
                        <v-expansion-panel v-for="product in cart.products" :key="product.id">
                            <v-expansion-panel-title>
                                Product: {{ product.title }}
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <v-list>
                                    <v-list-item>
                                        <v-list-item-subtitle>ID: {{ product.id }}</v-list-item-subtitle>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-subtitle>Price: {{ product.price }}</v-list-item-subtitle>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-subtitle>Quantity: {{ product.quantity }}</v-list-item-subtitle>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-subtitle>Total: {{ product.total }}</v-list-item-subtitle>
                                    </v-list-item>

                                    <!-- Add other product details as needed -->
                                </v-list>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <v-card-subtitle class="mt-2">Total: {{ cart.total }}</v-card-subtitle>
                    <v-card-subtitle>Discounted total: {{ cart.discountedTotal }}</v-card-subtitle>
                    <v-card-subtitle>Total products: {{ cart.totalProducts }}</v-card-subtitle>
                    <v-card-subtitle>Total quantity: {{ cart.totalQuantity }}</v-card-subtitle>

                    <!-- 3-dot menu -->
                    <v-menu>
                        <template v-slot:activator="{ props }">
                            <v-btn icon="mdi-dots-vertical" elevation="5" class="ma-2" v-bind="props"></v-btn>
                        </template>

                        <v-list>
                            <v-list-item class="text-blue-darken-3" @click="updateCart(cart)">
                                <template v-slot:prepend>
                                    <v-icon icon="mdi-pencil"></v-icon>
                                </template>
                                <v-list-item-title>Update</v-list-item-title>
                            </v-list-item>
                            <v-list-item class="text-red-darken-3" @click="deleteCart(cart.id)">
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

                        <!-- Products section -->
                        <v-row v-for="(product, index) in newCart.products" :key="index">
                            <v-col>
                                <v-text-field v-model="product.productId" label="Product ID"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="product.quantity" label="Quantity"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-btn @click="removeProduct(index)">Remove</v-btn>
                            </v-col>
                        </v-row>

                        <!-- Button to add a new product field -->
                        <v-btn @click="addProductField">Add Product</v-btn>

                        <!-- Total and other fields -->
                        <v-text-field v-model="newCart.total" label="Total"></v-text-field>
                        <v-text-field v-model="newCart.discountedTotal" label="Discounted Total"></v-text-field>
                        <v-text-field v-model="newCart.totalProducts" label="Total Products"></v-text-field>
                        <v-text-field v-model="newCart.totalQuantity" label="Total Quantity"></v-text-field>
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

                        <!-- Products section -->
                        <v-row v-for="(product, index) in updatedCart.products" :key="index">
                            <v-col>
                                <v-text-field v-model="product.productId" label="Product ID"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="product.quantity" label="Quantity"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-btn @click="removeProduct(index, 'update')">Remove</v-btn>
                            </v-col>
                        </v-row>

                        <!-- Button to add a new product field -->
                        <v-btn @click="addProductField('update')">Add Product</v-btn>

                        <!-- Total and other fields -->
                        <v-text-field v-model="updatedCart.total" label="Total"></v-text-field>
                        <v-text-field v-model="updatedCart.discountedTotal" label="Discounted Total"></v-text-field>
                        <v-text-field v-model="updatedCart.totalProducts" label="Total Products"></v-text-field>
                        <v-text-field v-model="updatedCart.totalQuantity" label="Total Quantity"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <!-- Button to submit the updated cart -->
                    <v-btn @click="submitUpdatedCart()">Submit</v-btn>
                    <v-btn @click="closeUpdateCartDialog()">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- loading animation -->
        <v-row v-if="loading">
            <v-col>
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-col>
        </v-row>

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
                total: 0,
                discountedTotal: 0,
                totalProducts: 0,
                totalQuantity: 0,
            },
            updateCartDialog: false,
            updatedCart: {
                id: 0,
                userId: '',
                products: [],
                total: 0,
                discountedTotal: 0,
                totalProducts: 0,
                totalQuantity: 0,
            },
            showGetSingleCartInput: false,
            cartIdInput: '',
            loading: false,
        };
    },
    methods: {
        getAllCarts() {
            this.loading = true;
            // Fetch all carts
            axios.get('https://dummyjson.com/carts')
                .then(response => {
                    this.carts = response.data.carts;
                })
                .catch(error => {
                    console.error('Error fetching carts:', error);
                })
                .finally(() => {
                    this.loading = false;
                })
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
        updateCart(cart) {
            // Open the dialog for updating a cart
            this.updateCartDialog = true;

            // Set other properties
            this.updatedCart = {
                id: cart.id,
                userId: cart.userId,
                total: cart.total,
                discountedTotal: cart.discountedTotal,
                totalProducts: cart.totalProducts,
                totalQuantity: cart.totalQuantity,
                products: [],
            };

            // Pre-fill products
            cart.products.forEach(product => {
                this.updatedCart.products.push({
                    productId: product.id,
                    quantity: product.quantity,
                });
            });
        },

        closeUpdateCartDialog() {
            // Close the dialog for updating a cart
            this.updateCartDialog = false;
        },
        submitUpdatedCart() {
            // Validate the form before submitting
            if (this.$refs.updateCartForm.validate()) {
                // Create an array of product objects with only necessary properties
                const updatedProducts = this.updatedCart.products.map(product => ({
                    id: product.productId,
                    quantity: product.quantity,
                }));

                // Create an object with updated cart details
                const updatedCartData = {
                    userId: this.updatedCart.userId,
                    products: updatedProducts,
                    total: this.updatedCart.total,
                    discountedTotal: this.updatedCart.discountedTotal,
                    totalProducts: this.updatedCart.totalProducts,
                    totalQuantity: this.updatedCart.totalQuantity,
                };

                // Simulated PUT/PATCH request to update a cart
                fetch(`https://dummyjson.com/carts/${this.updatedCart.id}`, {
                    method: 'PUT', // or PATCH
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedCartData),
                })
                    .then(res => res.json())
                    .then(updatedCart => {
                        // Display the updated cart in the console
                        console.log('Updated Cart:', updatedCart);

                        // Find the index of the updated cart in the carts array
                        const index = this.carts.findIndex(c => c.id === updatedCart.id);

                        // Update the cart in the array
                        if (index !== -1) {
                            // Directly assign the value to the array index
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
        // Add a new product field in the cart
        addProductField(type) {
            const product = { productId: '', quantity: 0 };
            if (type === 'update') {
                this.updatedCart.products.push(product);
            } else {
                this.newCart.products.push(product);
            }
        },

        // Remove a product field from the cart
        removeProduct(index, type) {
            if (type === 'update') {
                this.updatedCart.products.splice(index, 1);
            } else {
                this.newCart.products.splice(index, 1);
            }
        },
    },
};
</script>

<style scoped>
.green-border {
    border: 2px solid green;
}
</style>
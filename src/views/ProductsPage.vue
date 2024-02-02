<template>
    <v-container>
        <h1>Products Page</h1>

        <v-row>
            <!-- Button for getAllProducts -->
            <v-col>
                <v-btn @click="getAllProducts">Get All Products</v-btn>
            </v-col>

            <!-- Button and input for getSingleProduct -->
            <v-col>
                <v-btn @click="toggleSingleProduct">Get Single Product</v-btn>
                <v-text-field v-if="showSingleProductInput" v-model="singleProductId"
                    label="Enter Product ID"></v-text-field>
                <v-btn v-if="showSingleProductInput" @click="getSingleProduct">Submit</v-btn>
            </v-col>

            <!-- Button and input for searchProducts -->
            <v-col>
                <v-btn @click="toggleSearchProducts">Search Products</v-btn>
                <v-text-field v-if="showSearchProductsInput" v-model="searchQuery"
                    label="Enter Search Query"></v-text-field>
                <v-btn v-if="showSearchProductsInput" @click="searchProducts">Submit</v-btn>
            </v-col>

            <!-- Button for showCategories -->
            <v-col>
                <v-btn @click="showCategories">Show Categories</v-btn>
            </v-col>
        </v-row>

        <v-divider class="my-4"></v-divider>
        <v-row>
            <!-- Pagination controls -->
            <v-col>
                <v-btn @click="prevPage" :disabled="currentPage === 1">Previous Page</v-btn>
            </v-col>
            <v-col>
                <p>Page {{ currentPage }} of {{ totalPages }}</p>
            </v-col>
            <v-col>
                <v-btn @click="nextPage" :disabled="currentPage === totalPages">Next Page</v-btn>
            </v-col>
        </v-row>

        <!-- Show Categories or Products based on the current view -->
        <v-row v-if="currentView === 'categories'">
            <v-col v-for="category in categories" :key="category" class="ma-4">
                <v-btn @click="showProductsByCategory(category)">{{ category }}</v-btn>
            </v-col>
        </v-row>

        <v-row v-if="currentView === 'products' && products.length > 0">
            <v-col v-for="product in paginatedProducts" :key="product.id" class="ma-4">
                <v-card>
                    <v-img :src="product.thumbnail" height="200"></v-img>
                    <v-card-title>{{ product.title }}</v-card-title>
                    <v-card-subtitle>{{ product.category }}</v-card-subtitle>
                    <v-card-subtitle>{{ product.brand }}</v-card-subtitle>
                    <v-card-subtitle>{{ product.price }} USD</v-card-subtitle>
                    <v-card-subtitle v-if="product.discountPercentage">{{ product.discountPercentage }}%
                        Discount</v-card-subtitle>
                    <v-card-subtitle v-if="product.rating">{{ product.rating }} Rating</v-card-subtitle>
                    <v-card-subtitle>{{ product.stock }} In Stock</v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            products: [],
            singleProductId: '',
            searchQuery: '',
            showSingleProductInput: false,
            showSearchProductsInput: false,
            categories: [],
            currentView: 'products', // 'categories' or 'products'
            pageSize: 18, // Number of products per page
            currentPage: 1,
            totalPages: 1,
        };
    },
    computed: {
        paginatedProducts() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.products.slice(startIndex, endIndex);
        },
    },
    methods: {
        getAllProducts() {
            axios.get('https://dummyjson.com/products?limit=99')
                .then(response => {
                    this.products = response.data.products;
                    this.currentView = 'products'; // Explicitly set currentView to 'products'
                    this.updateTotalPages();
                    this.currentPage = 1;
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });
        },
        toggleSingleProduct() {
            this.showSingleProductInput = !this.showSingleProductInput;
        },
        getSingleProduct() {
            const productId = this.singleProductId;
            axios.get(`https://dummyjson.com/products/${productId}`)
                .then(response => {
                    this.products = [response.data];
                    this.currentView = 'products';
                    this.updateTotalPages();
                    this.currentPage = 1;
                })
                .catch(error => {
                    console.error('Error fetching single product:', error);
                });
        },
        toggleSearchProducts() {
            this.showSearchProductsInput = !this.showSearchProductsInput;
        },
        searchProducts() {
            const query = this.searchQuery;
            axios.get(`https://dummyjson.com/products/search?q=${query}`)
                .then(response => {
                    this.products = response.data.products;
                    this.currentView = 'products';
                    this.updateTotalPages();
                    this.currentPage = 1;
                })
                .catch(error => {
                    console.error('Error searching products:', error);
                });
        },
        showCategories() {
            axios.get('https://dummyjson.com/products/categories')
                .then(response => {
                    this.categories = response.data;
                    this.currentView = 'categories';
                    this.currentPage = 1;
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                });
        },
        showProductsByCategory(category) {
            axios.get(`https://dummyjson.com/products/category/${category}`)
                .then(response => {
                    this.products = response.data.products;
                    this.currentView = 'products';
                    this.updateTotalPages();
                    this.currentPage = 1;
                })
                .catch(error => {
                    console.error(`Error fetching products for category ${category}:`, error);
                });
        },
        updateTotalPages() {
            this.totalPages = Math.ceil(this.products.length / this.pageSize);
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
    },
};
</script>
  
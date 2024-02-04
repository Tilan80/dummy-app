<template>
    <v-container>
        <h1 class="mb-5">Products Page</h1>

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

            <v-col>
                <v-btn @click="openAddProductDialog">Add New Product</v-btn>
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
                <v-card elevation="10">
                    <v-img :src="product.thumbnail" height="200"></v-img>
                    <v-card-title>{{ product.title }}</v-card-title>
                    <v-card-subtitle>{{ product.category }}</v-card-subtitle>
                    <v-card-subtitle>{{ product.brand }}</v-card-subtitle>
                    <v-card-subtitle>{{ product.price }} USD</v-card-subtitle>
                    <v-card-subtitle v-if="product.discountPercentage">{{ product.discountPercentage }}%
                        Discount</v-card-subtitle>
                    <v-card-subtitle v-if="product.rating">{{ product.rating }} Rating</v-card-subtitle>
                    <v-card-subtitle>{{ product.stock }} In Stock</v-card-subtitle>
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

        <!-- Add Product Dialog -->
        <v-dialog v-model="addProductDialog" max-width="600">
            <v-card>
                <v-card-title>Add New Product</v-card-title>
                <v-card-text>
                    <!-- Form for collecting new product details -->
                    <v-form ref="addProductForm">
                        <v-text-field v-model="newProduct.title" label="Title"></v-text-field>
                        <v-text-field v-model="newProduct.description" label="Description"></v-text-field>
                        <v-text-field v-model="newProduct.price" label="Price" type="number"></v-text-field>
                        <v-text-field v-model="newProduct.discountPercentage" label="Discount Percentage"
                            type="number"></v-text-field>
                        <v-text-field v-model="newProduct.rating" label="Rating" type="number"></v-text-field>
                        <v-text-field v-model="newProduct.stock" label="Stock" type="number"></v-text-field>
                        <v-text-field v-model="newProduct.brand" label="Brand"></v-text-field>
                        <v-text-field v-model="newProduct.category" label="Category"></v-text-field>
                        <v-text-field v-model="newProduct.thumbnail" label="Thumbnail URL"></v-text-field>
                        <!-- You may want to use a file input for images, but for simplicity, we are using text fields for image URLs -->
                        <v-text-field v-model="newProduct.images" label="Images (comma-separated URLs)"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <!-- Button to submit the new product -->
                    <v-btn @click="submitNewProduct">Submit</v-btn>
                    <v-btn @click="closeAddProductDialog">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- dialog for updating a product -->
        <v-dialog v-model="updateProductDialog" max-width="600">
            <v-card>
                <v-card-title>Update Product</v-card-title>
                <v-card-text>
                    <!-- Form for collecting updated product details -->
                    <v-form ref="updateProductForm">
                        <v-text-field v-model="updatedProduct.title" label="Title"></v-text-field>
                        <v-text-field v-model="updatedProduct.description" label="Description"></v-text-field>
                        <v-text-field v-model="updatedProduct.price" label="Price" type="number"></v-text-field>
                        <v-text-field v-model="updatedProduct.discountPercentage" label="Discount Percentage"
                            type="number"></v-text-field>
                        <v-text-field v-model="updatedProduct.rating" label="Rating" type="number"></v-text-field>
                        <v-text-field v-model="updatedProduct.stock" label="Stock" type="number"></v-text-field>
                        <v-text-field v-model="updatedProduct.brand" label="Brand"></v-text-field>
                        <v-text-field v-model="updatedProduct.category" label="Category"></v-text-field>
                        <v-text-field v-model="updatedProduct.thumbnail" label="Thumbnail URL"></v-text-field>
                        <!-- You may want to use a file input for images, but for simplicity, we are using text fields for image URLs -->
                        <v-text-field v-model="updatedProduct.images" label="Images (comma-separated URLs)"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <!-- Button to submit the updated product -->
                    <v-btn @click="submitUpdatedProduct">Submit</v-btn>
                    <v-btn @click="closeUpdateProductDialog">Cancel</v-btn>
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
            addProductDialog: false,
            newProduct: {
                title: '',
                description: '',
                price: 0,
                discountPercentage: 0,
                rating: 0,
                stock: 0,
                brand: '',
                category: '',
                thumbnail: '',
                images: [],
            },
            updateProductDialog: false,
            updatedProduct: {
                id: 0,
                title: '',
                description: '',
                price: 0,
                discountPercentage: 0,
                rating: 0,
                stock: 0,
                brand: '',
                category: '',
                thumbnail: '',
                images: [],
            },
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
        menuClicked() {
            console.log('Menu Clicked');
        },
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
        openAddProductDialog() {
            // Open the dialog for adding a new product
            this.addProductDialog = true;
        },

        closeAddProductDialog() {
            // Close the dialog for adding a new product
            this.addProductDialog = false;
        },

        submitNewProduct() {
            // Validate the form before submitting
            if (this.$refs.addProductForm.validate()) {
                // Simulated POST request to add a new product
                fetch('https://dummyjson.com/products/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.newProduct),
                })
                    .then(res => res.json())
                    .then(newProduct => {
                        // Display the new product in the console
                        console.log('Newly Created Product:', newProduct);

                        // Add the new product to the existing products array
                        this.products.unshift(newProduct);

                        // Update total pages and reset pagination to the first page
                        this.updateTotalPages();
                        this.currentPage = 1;

                        // Close the dialog after successful submission
                        this.closeAddProductDialog();
                    })
                    .catch(error => {
                        console.error('Error adding new product:', error);
                    });
            }
        },
        openUpdateProductDialog(product) {
            // Open the dialog for updating a product
            this.updatedProduct = { ...product }; // Initialize with current product data
            this.updateProductDialog = true;
            console.log('Opening update dialog for product:', product);
        },

        closeUpdateProductDialog() {
            // Close the dialog for updating a product
            this.updateProductDialog = false;
        },

        submitUpdatedProduct() {
            // Validate the form before submitting
            if (this.$refs.updateProductForm.validate()) {
                // Simulated PUT/PATCH request to update a product
                fetch(`https://dummyjson.com/products/${this.updatedProduct.id}`, {
                    method: 'PUT', // or PATCH
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: this.updatedProduct.title,
                        description: this.updatedProduct.description,
                        price: this.updatedProduct.price,
                        discountPercentage: this.updatedProduct.discountPercentage,
                        rating: this.updatedProduct.rating,
                        stock: this.updatedProduct.stock,
                        brand: this.updatedProduct.brand,
                        category: this.updatedProduct.category,
                        thumbnail: this.updatedProduct.thumbnail,
                        images: this.updatedProduct.images,
                    }),
                })
                    .then(res => res.json())
                    .then(updatedProduct => {
                        // Display the updated product in the console
                        console.log('Updated Product:', updatedProduct);

                        // Find the index of the updated product in the products array
                        const index = this.products.findIndex(p => p.id === updatedProduct.id);

                        // Update the product in the array
                        if (index !== -1) {
                            // Use Vue 3 reactivity to update the property directly
                            this.products[index] = updatedProduct;
                        }

                        // Close the dialog after successful submission
                        this.closeUpdateProductDialog();
                    })
                    .catch(error => {
                        console.error('Error updating product:', error);
                    });
            }
        },
        deleteProduct(productId) {
            // Simulated DELETE request to delete a product
            fetch(`https://dummyjson.com/products/${productId}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(deletedProduct => {
                    // Display the deleted product in the console
                    console.log('Deleted Product:', deletedProduct);

                    // Update the products array by filtering out the deleted product
                    this.products = this.products.filter(p => p.id !== deletedProduct.id);

                    // Update total pages and reset pagination to the first page
                    this.updateTotalPages();
                    this.currentPage = 1;
                })
                .catch(error => {
                    console.error('Error deleting product:', error);
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
  
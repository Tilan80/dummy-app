<template>
    <v-container>
        <h1 class="mb-5">Users Page</h1>

        <v-row>
            <!-- Button for getAllUsers -->
            <v-col>
                <v-btn @click="getAllUsers">Get All Users</v-btn>
            </v-col>

            <!-- Button and input for getSingleUser -->
            <v-col>
                <v-btn @click="toggleSingleUser">Get Single User</v-btn>
                <v-text-field v-if="showSingleUserInput" v-model="singleUserId" label="Enter User ID"></v-text-field>
                <v-btn v-if="showSingleUserInput" @click="getSingleUser">Submit</v-btn>
            </v-col>

            <!-- Button and input for searchUsers -->
            <v-col>
                <v-btn @click="toggleSearchUsers">Search Users</v-btn>
                <v-text-field v-if="showSearchUsersInput" v-model="searchQuery" label="Enter Search Query"></v-text-field>
                <v-btn v-if="showSearchUsersInput" @click="searchUsers">Submit</v-btn>
            </v-col>

            <!-- Button and input for filterUsers -->
            <v-col>
                <v-btn @click="toggleFilterUsers">Filter Users</v-btn>
                <v-text-field v-if="showFilterUsersInput" v-model="filterKey" label="Enter Filter Key"></v-text-field>
                <v-text-field v-if="showFilterUsersInput" v-model="filterValue" label="Enter Filter Value"></v-text-field>
                <v-btn v-if="showFilterUsersInput" @click="filterUsers">Submit</v-btn>
            </v-col>
            <!-- Button for adding a new user -->
            <v-col>
                <v-btn class="green-border" @click="openAddUserDialog">Add User</v-btn>
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

        <!-- Show Users based on the current view -->
        <v-row v-if="currentView === 'users' && users.length > 0 && !loading">
            <v-col v-for="user in paginatedUsers" :key="user.id" class="ma-4" cols="12" md="6" lg="3">
                <v-card elevation="10" class="w-100">
                    <v-card-title>{{ user.firstName }} {{ user.lastName }}</v-card-title>
                    <v-card-subtitle>Age: {{ user.age }}</v-card-subtitle>
                    <v-card-subtitle>Email: {{ user.email }}</v-card-subtitle>
                    <v-card-subtitle>Phone: {{ user.phone }}</v-card-subtitle>

                    <!-- Expandable sections -->
                    <v-expansion-panels>
                        <!-- Personal Information -->
                        <v-expansion-panel>
                            <v-expansion-panel-title>Personal Information</v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <v-list>
                                    <v-list-item>
                                        <v-list-item-subtitle>Maiden Name:</v-list-item-subtitle>
                                        <v-list-item-subtitle>{{ user.maidenName }}</v-list-item-subtitle>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-subtitle>Gender:</v-list-item-subtitle>
                                        <v-list-item-subtitle>{{ user.gender }}</v-list-item-subtitle>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-subtitle>Birth Date:</v-list-item-subtitle>
                                        <v-list-item-subtitle>{{ user.birthDate }}</v-list-item-subtitle>
                                    </v-list-item>
                                    <!-- Add more personal information as needed -->
                                </v-list>
                            </v-expansion-panel-text>
                        </v-expansion-panel>

                        <!-- Contact Information -->
                        <v-expansion-panel>
                            <v-expansion-panel-title>Contact Information</v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <v-list>
                                    <v-list-item>
                                        <v-list-item-subtitle>Username:</v-list-item-subtitle>
                                        <v-list-item-subtitle>{{ user.username }}</v-list-item-subtitle>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-subtitle>Email:</v-list-item-subtitle>
                                        <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-subtitle>Phone:</v-list-item-subtitle>
                                        <v-list-item-subtitle>{{ user.phone }}</v-list-item-subtitle>
                                    </v-list-item>
                                    <!-- Add more contact information as needed -->
                                </v-list>
                            </v-expansion-panel-text>
                        </v-expansion-panel>

                        <!-- Appearance -->
                        <v-expansion-panel>
                            <v-expansion-panel-title>Appearance</v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <v-list>
                                    <v-list-item>
                                        <v-list-item-subtitle>Height:</v-list-item-subtitle>
                                        <v-list-item-subtitle>{{ user.height }} cm</v-list-item-subtitle>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-subtitle>Weight:</v-list-item-subtitle>
                                        <v-list-item-subtitle>{{ user.weight }} kg</v-list-item-subtitle>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-subtitle>Eye Color:</v-list-item-subtitle>
                                        <v-list-item-subtitle>{{ user.eyeColor }}</v-list-item-subtitle>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-subtitle>Hair Color:</v-list-item-subtitle>
                                        <v-list-item-subtitle>{{ user.hair.color }} ({{ user.hair.type
                                        }})</v-list-item-subtitle>
                                    </v-list-item>
                                    <!-- Add more appearance details as needed -->
                                </v-list>
                            </v-expansion-panel-text>
                        </v-expansion-panel>

                        <!-- Address -->
                        <v-expansion-panel>
                            <v-expansion-panel-title>Address</v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <v-list>
                                    <v-list-item>
                                        <v-list-item-subtitle>Address:</v-list-item-subtitle>
                                        <v-list-item-subtitle>{{ user.address.address }}</v-list-item-subtitle>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-subtitle>City:</v-list-item-subtitle>
                                        <v-list-item-subtitle>{{ user.address.city }}</v-list-item-subtitle>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-subtitle>State:</v-list-item-subtitle>
                                        <v-list-item-subtitle>{{ user.address.state }}</v-list-item-subtitle>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-subtitle>Postal Code:</v-list-item-subtitle>
                                        <v-list-item-subtitle>{{ user.address.postalCode }}</v-list-item-subtitle>
                                    </v-list-item>
                                    <!-- Add more address details as needed -->
                                </v-list>
                            </v-expansion-panel-text>
                        </v-expansion-panel>

                        <!-- Bank Information -->
                        <v-expansion-panel>
                            <v-expansion-panel-title>Bank Information</v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <v-list>
                                    <v-list-item>
                                        <v-list-item-subtitle>Card Number:</v-list-item-subtitle>
                                        <v-list-item-subtitle>{{ user.bank.cardNumber }}</v-list-item-subtitle>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-subtitle>Card Type:</v-list-item-subtitle>
                                        <v-list-item-subtitle>{{ user.bank.cardType }}</v-list-item-subtitle>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-subtitle>Currency:</v-list-item-subtitle>
                                        <v-list-item-subtitle>{{ user.bank.currency }}</v-list-item-subtitle>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-subtitle>IBAN:</v-list-item-subtitle>
                                        <v-list-item-subtitle>{{ user.bank.iban }}</v-list-item-subtitle>
                                    </v-list-item>
                                    <!-- Add more bank details as needed -->
                                </v-list>
                            </v-expansion-panel-text>
                        </v-expansion-panel>

                        <!-- Company Information -->
                        <v-expansion-panel>
                            <v-expansion-panel-title>Company Information</v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <v-list>
                                    <v-list-item>
                                        <v-list-item-subtitle>Company:</v-list-item-subtitle>
                                        <v-list-item-subtitle>{{ user.company.name }}</v-list-item-subtitle>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-subtitle>Title:</v-list-item-subtitle>
                                        <v-list-item-subtitle>{{ user.company.title }}</v-list-item-subtitle>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-subtitle>Department:</v-list-item-subtitle>
                                        <v-list-item-subtitle>{{ user.company.department }}</v-list-item-subtitle>
                                    </v-list-item>

                                    <v-list-item>
                                        <v-list-item-subtitle>Address:</v-list-item-subtitle>
                                        <v-list-item-subtitle>{{ user.company.address.address }},
                                            {{ user.company.address.city }},
                                            {{ user.company.address.state }},
                                            {{ user.company.address.postalCode }}</v-list-item-subtitle>
                                    </v-list-item>
                                    <!-- Add more company details as needed -->
                                </v-list>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <v-menu>
                        <template v-slot:activator="{ props }">
                            <v-btn icon="mdi-dots-vertical" elevation="5" class="ma-2" v-bind="props"></v-btn>
                        </template>

                        <v-list>
                            <v-list-item @click="getUserCarts(user.id)">
                                <template v-slot:prepend>
                                    <v-icon icon="mdi-cart"></v-icon>
                                </template>
                                <v-list-item-title>Get Carts</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="getUserPosts(user.id)">
                                <template v-slot:prepend>
                                    <v-icon icon="mdi-post"></v-icon>
                                </template>
                                <v-list-item-title>Get Posts</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="getUserTodos(user.id)">
                                <template v-slot:prepend>
                                    <v-icon icon="mdi-check-all"></v-icon>
                                </template>
                                <v-list-item-title>Get Todos</v-list-item-title>
                            </v-list-item>
                            <v-list-item class="text-blue-darken-3" @click="openUpdateUserDialog(user)">
                                <template v-slot:prepend>
                                    <v-icon icon="mdi-pencil"></v-icon>
                                </template>
                                <v-list-item-title>Update</v-list-item-title>
                            </v-list-item>
                            <v-list-item class="text-red-darken-3" @click="deleteUser(user.id)">
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
        <!-- Show posts based on the current view -->
        <v-row v-else-if="currentView === 'posts' && userPosts.length > 0">
            <v-col v-for="(post, index) in userPosts" :key="index" class="ma-4" cols="12" md="6" lg="4">
                <v-card elevation="10" class="w-100 pa-3">
                    <v-card-title v-html="post.title"></v-card-title>
                    <v-card-text>
                        <div v-html="post.body"></div>
                    </v-card-text>
                    <v-card-subtitle>
                        Tags: {{ post.tags.join(', ') }}, Reactions: {{ post.reactions }}
                    </v-card-subtitle>
                </v-card>
            </v-col>

            <v-col class="ma-4" cols="12">
                <v-btn @click="closePostsView">Back to Users</v-btn>
            </v-col>
        </v-row>
        <!-- Show todos based on the current view -->
        <v-row v-else-if="currentView === 'todos' && userTodos.length > 0">
            <v-col v-for="(todo, index) in userTodos" :key="index" class="ma-4" cols="12" md="6" lg="4">
                <!-- Use dynamic class binding to set border color based on completion -->
                <v-card :class="{ 'green-border': todo.completed, 'red-border': !todo.completed }" elevation="10"
                    class="w-100 pa-3">
                    <v-card-title v-html="todo.todo"></v-card-title>
                    <!-- Use dynamic style binding to set text color based on completion -->
                    <v-card-subtitle :style="{ color: todo.completed ? 'green' : 'red' }">Completed: {{ todo.completed ?
                        'Yes' : 'No' }}</v-card-subtitle>
                </v-card>
            </v-col>

            <v-col class="ma-4" cols="12">
                <v-btn @click="closeTodosView">Back to Users</v-btn>
            </v-col>
        </v-row>
        <!-- Dialog for displaying user carts -->
        <v-dialog v-model="showCartsDialog" max-width="600">
            <v-card>
                <v-card-title>User Carts</v-card-title>
                <v-card-text>
                    <!-- Display user carts here -->
                    <v-list v-if="userCarts.length > 0">
                        <v-list-item v-for="(cart, cIndex) in userCarts" :key="cIndex">
                            <v-list-item>
                                <v-list-item-title>Cart ID: {{ cart.id }}</v-list-item-title>
                                <v-list-item-subtitle>
                                    Total: {{ cart.total }}, Discounted Total: {{ cart.discountedTotal }}
                                </v-list-item-subtitle>
                                <!-- Display products within the cart -->
                                <v-list-item v-if="cart.products.length > 0">
                                    <v-list-item v-for="(product, pIndex) in cart.products" :key="pIndex">
                                        <v-list-item>
                                            <v-list-item-title>{{ product.title }}</v-list-item-title>
                                            <v-list-item-subtitle>
                                                Price: {{ product.price }}, Quantity: {{ product.quantity }},
                                                Total: {{ product.total }}
                                            </v-list-item-subtitle>
                                            <!-- Display more product details as needed -->
                                        </v-list-item>
                                    </v-list-item>
                                </v-list-item>
                                <v-list-item v-else>
                                    <v-list-item>No products available in this cart.</v-list-item>
                                </v-list-item>
                            </v-list-item>
                        </v-list-item>
                    </v-list>
                    <v-list v-else>
                        <v-list-item>No carts available for this user.</v-list-item>
                    </v-list>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="closeCartsDialog">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- loading animation -->
        <v-row v-if="loading">
            <v-col>
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-col>
        </v-row>

        <!-- dialog for updating a user -->
        <v-dialog v-model="updateUserDialog" max-width="600">
            <v-card>
                <v-card-title>Update User</v-card-title>
                <v-card-text>
                    <!-- Form for collecting updated user details -->
                    <v-form ref="updateUserForm">
                        <v-text-field v-model="updatedUser.firstName" label="First Name"></v-text-field>
                        <v-text-field v-model="updatedUser.lastName" label="Last Name"></v-text-field>
                        <v-text-field v-model="updatedUser.maidenName" label="Maiden Name"></v-text-field>
                        <v-text-field v-model="updatedUser.age" label="Age" type="number"></v-text-field>
                        <v-text-field v-model="updatedUser.gender" label="Gender"></v-text-field>
                        <v-text-field v-model="updatedUser.email" label="Email"></v-text-field>
                        <v-text-field v-model="updatedUser.phone" label="Phone"></v-text-field>
                        <v-text-field v-model="updatedUser.username" label="Username"></v-text-field>
                        <v-text-field v-model="updatedUser.password" label="Password"></v-text-field>
                        <v-text-field v-model="updatedUser.birthDate" label="Birth Date"></v-text-field>
                        <v-text-field v-model="updatedUser.image" label="Image URL"></v-text-field>
                        <v-text-field v-model="updatedUser.bloodGroup" label="Blood Group"></v-text-field>
                        <v-text-field v-model="updatedUser.height" label="Height" type="number"></v-text-field>
                        <v-text-field v-model="updatedUser.weight" label="Weight" type="number"></v-text-field>
                        <v-text-field v-model="updatedUser.eyeColor" label="Eye Color"></v-text-field>
                        <v-text-field v-model="updatedUser.hair.color" label="Hair Color"></v-text-field>
                        <v-text-field v-model="updatedUser.hair.type" label="Hair Type"></v-text-field>
                        <v-text-field v-model="updatedUser.domain" label="Domain"></v-text-field>
                        <v-text-field v-model="updatedUser.ip" label="IP Address"></v-text-field>
                        <v-text-field v-model="updatedUser.address.address" label="Address"></v-text-field>
                        <v-text-field v-model="updatedUser.address.city" label="City"></v-text-field>
                        <v-text-field v-model="updatedUser.address.coordinates.lat" label="Latitude"
                            type="number"></v-text-field>
                        <v-text-field v-model="updatedUser.address.coordinates.lng" label="Longitude"
                            type="number"></v-text-field>
                        <v-text-field v-model="updatedUser.address.postalCode" label="Postal Code"></v-text-field>
                        <v-text-field v-model="updatedUser.address.state" label="State"></v-text-field>
                        <v-text-field v-model="updatedUser.macAddress" label="MAC Address"></v-text-field>
                        <v-text-field v-model="updatedUser.university" label="University"></v-text-field>
                        <v-text-field v-model="updatedUser.bank.cardExpire" label="Card Expiry"></v-text-field>
                        <v-text-field v-model="updatedUser.bank.cardNumber" label="Card Number"></v-text-field>
                        <v-text-field v-model="updatedUser.bank.cardType" label="Card Type"></v-text-field>
                        <v-text-field v-model="updatedUser.bank.currency" label="Currency"></v-text-field>
                        <v-text-field v-model="updatedUser.bank.iban" label="IBAN"></v-text-field>
                        <v-text-field v-model="updatedUser.company.address.address" label="Company Address"></v-text-field>
                        <v-text-field v-model="updatedUser.company.address.city" label="Company City"></v-text-field>
                        <v-text-field v-model="updatedUser.company.address.coordinates.lat" label="Company Latitude"
                            type="number"></v-text-field>
                        <v-text-field v-model="updatedUser.company.address.coordinates.lng" label="Company Longitude"
                            type="number"></v-text-field>
                        <v-text-field v-model="updatedUser.company.address.postalCode"
                            label="Company Postal Code"></v-text-field>
                        <v-text-field v-model="updatedUser.company.address.state" label="Company State"></v-text-field>
                        <v-text-field v-model="updatedUser.company.department" label="Company Department"></v-text-field>
                        <v-text-field v-model="updatedUser.company.name" label="Company Name"></v-text-field>
                        <v-text-field v-model="updatedUser.company.title" label="Company Title"></v-text-field>
                        <v-text-field v-model="updatedUser.ein" label="EIN"></v-text-field>
                        <v-text-field v-model="updatedUser.ssn" label="SSN"></v-text-field>
                        <v-text-field v-model="updatedUser.userAgent" label="User Agent"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <!-- Button to submit the updated user -->
                    <v-btn @click="submitUpdatedUser()">Submit</v-btn>
                    <v-btn @click="closeUpdateUserDialog()">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <!-- Dialog for adding a new user -->
        <v-dialog v-model="addUserDialog" max-width="600">
            <v-card>
                <v-card-title>Add User</v-card-title>
                <v-card-text>
                    <!-- Form for collecting new user details -->
                    <v-form ref="addUserForm">
                        <v-text-field v-model="newUser.firstName" label="First Name"></v-text-field>
                        <v-text-field v-model="newUser.lastName" label="Last Name"></v-text-field>
                        <v-text-field v-model="newUser.maidenName" label="Maiden Name"></v-text-field>
                        <v-text-field v-model="newUser.age" label="Age" type="number"></v-text-field>
                        <v-text-field v-model="newUser.gender" label="Gender"></v-text-field>
                        <v-text-field v-model="newUser.email" label="Email"></v-text-field>
                        <v-text-field v-model="newUser.phone" label="Phone"></v-text-field>
                        <v-text-field v-model="newUser.username" label="Username"></v-text-field>
                        <v-text-field v-model="newUser.password" label="Password"></v-text-field>
                        <v-text-field v-model="newUser.birthDate" label="Birth Date"></v-text-field>
                        <v-text-field v-model="newUser.image" label="Image URL"></v-text-field>
                        <v-text-field v-model="newUser.bloodGroup" label="Blood Group"></v-text-field>
                        <v-text-field v-model="newUser.height" label="Height" type="number"></v-text-field>
                        <v-text-field v-model="newUser.weight" label="Weight" type="number"></v-text-field>
                        <v-text-field v-model="newUser.eyeColor" label="Eye Color"></v-text-field>
                        <v-text-field v-model="newUser.hair.color" label="Hair Color"></v-text-field>
                        <v-text-field v-model="newUser.hair.type" label="Hair Type"></v-text-field>
                        <v-text-field v-model="newUser.domain" label="Domain"></v-text-field>
                        <v-text-field v-model="newUser.ip" label="IP Address"></v-text-field>
                        <v-text-field v-model="newUser.address.address" label="Address"></v-text-field>
                        <v-text-field v-model="newUser.address.city" label="City"></v-text-field>
                        <v-text-field v-model="newUser.address.coordinates.lat" label="Latitude"
                            type="number"></v-text-field>
                        <v-text-field v-model="newUser.address.coordinates.lng" label="Longitude"
                            type="number"></v-text-field>
                        <v-text-field v-model="newUser.address.postalCode" label="Postal Code"></v-text-field>
                        <v-text-field v-model="newUser.address.state" label="State"></v-text-field>
                        <v-text-field v-model="newUser.macAddress" label="MAC Address"></v-text-field>
                        <v-text-field v-model="newUser.university" label="University"></v-text-field>
                        <v-text-field v-model="newUser.bank.cardExpire" label="Card Expiry"></v-text-field>
                        <v-text-field v-model="newUser.bank.cardNumber" label="Card Number"></v-text-field>
                        <v-text-field v-model="newUser.bank.cardType" label="Card Type"></v-text-field>
                        <v-text-field v-model="newUser.bank.currency" label="Currency"></v-text-field>
                        <v-text-field v-model="newUser.bank.iban" label="IBAN"></v-text-field>
                        <v-text-field v-model="newUser.company.address.address" label="Company Address"></v-text-field>
                        <v-text-field v-model="newUser.company.address.city" label="Company City"></v-text-field>
                        <v-text-field v-model="newUser.company.address.coordinates.lat" label="Company Latitude"
                            type="number"></v-text-field>
                        <v-text-field v-model="newUser.company.address.coordinates.lng" label="Company Longitude"
                            type="number"></v-text-field>
                        <v-text-field v-model="newUser.company.address.postalCode"
                            label="Company Postal Code"></v-text-field>
                        <v-text-field v-model="newUser.company.address.state" label="Company State"></v-text-field>
                        <v-text-field v-model="newUser.company.department" label="Company Department"></v-text-field>
                        <v-text-field v-model="newUser.company.name" label="Company Name"></v-text-field>
                        <v-text-field v-model="newUser.company.title" label="Company Title"></v-text-field>
                        <v-text-field v-model="newUser.ein" label="EIN"></v-text-field>
                        <v-text-field v-model="newUser.ssn" label="SSN"></v-text-field>
                        <v-text-field v-model="newUser.userAgent" label="User Agent"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <!-- Button to submit the new user -->
                    <v-btn @click="submitNewUser()">Submit</v-btn>
                    <v-btn @click="closeAddUserDialog()">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <NavBar/>
    </v-container>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            currentView: 'users',
            users: [],
            singleUserId: '',
            searchQuery: '',
            filterKey: '',
            filterValue: '',
            showSingleUserInput: false,
            showSearchUsersInput: false,
            showFilterUsersInput: false,
            currentPage: 1,
            totalPages: 1,
            pageSize: 12,
            updateUserDialog: false,
            updatedUser: {
                id: 0,
                firstName: '',
                lastName: '',
                maidenName: '',
                age: 0,
                gender: '',
                email: '',
                phone: '',
                username: '',
                password: '',
                birthDate: '',
                image: '',
                bloodGroup: '',
                height: 0,
                weight: 0,
                eyeColor: '',
                hair: {
                    color: '',
                    type: ''
                },
                domain: '',
                ip: '',
                address: {
                    address: '',
                    city: '',
                    coordinates: {
                        lat: 0,
                        lng: 0
                    },
                    postalCode: '',
                    state: ''
                },
                macAddress: '',
                university: '',
                bank: {
                    cardExpire: '',
                    cardNumber: '',
                    cardType: '',
                    currency: '',
                    iban: ''
                },
                company: {
                    address: {
                        address: '',
                        city: '',
                        coordinates: {
                            lat: 0,
                            lng: 0
                        },
                        postalCode: '',
                        state: ''
                    },
                    department: '',
                    name: '',
                    title: ''
                },
                ein: '',
                ssn: '',
                userAgent: ''
            },
            addUserDialog: false,
            newUser: {
                id: 0,
                firstName: '',
                lastName: '',
                maidenName: '',
                age: 0,
                gender: '',
                email: '',
                phone: '',
                username: '',
                password: '',
                birthDate: '',
                image: '',
                bloodGroup: '',
                height: 0,
                weight: 0,
                eyeColor: '',
                hair: {
                    color: '',
                    type: ''
                },
                domain: '',
                ip: '',
                address: {
                    address: '',
                    city: '',
                    coordinates: {
                        lat: 0,
                        lng: 0
                    },
                    postalCode: '',
                    state: ''
                },
                macAddress: '',
                university: '',
                bank: {
                    cardExpire: '',
                    cardNumber: '',
                    cardType: '',
                    currency: '',
                    iban: ''
                },
                company: {
                    address: {
                        address: '',
                        city: '',
                        coordinates: {
                            lat: 0,
                            lng: 0
                        },
                        postalCode: '',
                        state: ''
                    },
                    department: '',
                    name: '',
                    title: ''
                },
                ein: '',
                ssn: '',
                userAgent: ''
            },
            showCartsDialog: false,
            userCarts: [],
            userPosts: [],
            showPostDialog: false,
            selectedPost: {},
            loading: false,
        };
    },
    computed: {
        paginatedUsers() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.users.slice(startIndex, endIndex);
        },
    },
    methods: {
        getAllUsers() {
            this.loading = true; // Set loading to true before making the API call
            axios.get('https://dummyjson.com/users?limit=100')
                .then(response => {
                    this.users = response.data.users;
                    this.currentView = 'users';
                    this.updateTotalPages();
                    this.currentPage = 1;
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                })
                .finally(() => {
                    this.loading = false; // Set loading to false whether the request succeeds or fails
                });
        },

        //single user
        toggleSingleUser() {
            this.showSingleUserInput = !this.showSingleUserInput;
        },
        getSingleUser() {
            const userId = this.singleUserId;
            axios.get(`https://dummyjson.com/users/${userId}`)
                .then(response => {
                    this.users = [response.data];
                    this.currentView = 'users';
                    this.updateTotalPages();
                    this.currentPage = 1;
                })
                .catch(error => {
                    console.error('Error fetching single user:', error);
                });
        },

        //////////////////////////////////////////////////////////
        //search users
        toggleSearchUsers() {
            this.showSearchUsersInput = !this.showSearchUsersInput;
        },
        searchUsers() {
            const query = this.searchQuery;
            axios.get(`https://dummyjson.com/users/search?q=${query}`)
                .then(response => {
                    this.users = response.data.users;
                    this.currentView = 'users';
                    this.updateTotalPages();
                    this.currentPage = 1;
                })
                .catch(error => {
                    console.error('Error searching users:', error);
                });
        },

        ////////////////////////////////////////////////////////
        //Filter users
        toggleFilterUsers() {
            this.showFilterUsersInput = !this.showFilterUsersInput;
        },
        filterUsers() {
            const key = this.filterKey;
            const value = this.filterValue;
            axios.get(`https://dummyjson.com/users/filter?key=${key}&value=${value}`)
                .then(response => {
                    this.users = response.data.users;
                    this.currentView = 'users';
                    this.updateTotalPages();
                    this.currentPage = 1;
                })
                .catch(error => {
                    console.error('Error filtering users:', error);
                });
        },

        //////////////////////////////////////////////////////////
        //carts
        closeCartsDialog() {
            this.showCartsDialog = false;
        },
        getUserCarts(userId) {
            // Fetch user carts based on user's ID
            fetch(`https://dummyjson.com/users/${userId}/carts`)
                .then(res => res.json())
                .then(data => {
                    // Update userCarts data property with fetched data
                    this.userCarts = data.carts;
                    // Show the dialog
                    this.showCartsDialog = true;
                })
                .catch(error => {
                    console.error('Error fetching user carts:', error);
                    // Handle error as needed
                });
        },

        /////////////////////////////////////////////////////////////////////////////////////
        //posts
        closePostsView() {
            this.currentView = 'users';
        },
        openPostDialog(post) {
            this.selectedPost = { ...post }; // Create a new object to avoid reactivity issues
            this.showPostDialog = true;
        },
        closePostDialog() {
            this.showPostDialog = false;
        },
        truncateText(text, maxLength) {
            return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
        },
        getUserPosts(userId) {
            // Fetch user posts based on user's ID
            fetch(`https://dummyjson.com/users/${userId}/posts`)
                .then(res => res.json())
                .then(data => {
                    // Update userPosts data property with fetched data
                    this.userPosts = data.posts;
                    // Switch to the posts view
                    this.currentView = 'posts';
                })
                .catch(error => {
                    console.error('Error fetching user posts:', error);
                    // Handle error as needed
                });
        },

        ////////////////////////////////////////////////////////////////////
        //todos
        getUserTodos(userId) {
            // Fetch user todos using userId
            fetch(`https://dummyjson.com/users/${userId}/todos`)
                .then((res) => res.json())
                .then((data) => {
                    // Update component data property to store todos
                    this.userTodos = data.todos;
                    // Switch the current view to 'todos'
                    this.currentView = 'todos';
                });
        },
        closeTodosView() {
            // Reset the userTodos data property
            this.userTodos = [];
            // Switch the current view back to 'users'
            this.currentView = 'users';
        },

        ///////////////////////////////////////////////////////////////////
        //pages
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        updateTotalPages() {
            this.totalPages = Math.ceil(this.users.length / this.pageSize);
        },

        /////////////////////////////////////////////////////////////
        //update user
        openUpdateUserDialog(user) {
            // Display the user data in the update dialog
            this.updatedUser = { ...user };
            this.updateUserDialog = true;
        },
        submitUpdatedUser() {
            // Validate and submit the updated user details to the server
            const isValid = this.$refs.updateUserForm.validate();
            if (isValid) {
                // Assuming a PUT request to update the user on the server
                const updatedUserData = { ...this.updatedUser }; // Create a copy to avoid reactivity issues

                // Remove nested properties with empty strings to prevent them from being sent
                Object.keys(updatedUserData).forEach(key => {
                    if (updatedUserData[key] === '' || updatedUserData[key] === null) {
                        delete updatedUserData[key];
                    }
                });

                axios.put(`https://dummyjson.com/users/${this.updatedUser.id}`, updatedUserData)
                    .then(response => {
                        console.log('User updated successfully:', response.data);

                        // Update the user data in the users array
                        const updatedIndex = this.users.findIndex(user => user.id === this.updatedUser.id);
                        if (updatedIndex !== -1) {
                            this.users[updatedIndex] = response.data;
                        }

                        this.updateUserDialog = false;
                    })
                    .catch(error => {
                        console.error('Error updating user:', error);
                    });
            }
        },

        closeUpdateUserDialog() {
            this.updateUserDialog = false;
        },

        /////////////////////////////////////////////////////////////////////////////
        //delete user
        deleteUser(userId) {
            // Assuming a DELETE request to delete the user on the server
            axios.delete(`https://dummyjson.com/users/${userId}`)
                .then(response => {
                    console.log('User deleted successfully:', response.data);

                    // Remove the deleted user from the users array
                    this.users = this.users.filter(user => user.id !== userId);
                })
                .catch(error => {
                    console.error('Error deleting user:', error);
                });
        },

        ///////////////////////////////////////////////////////////////////////////
        //add user
        openAddUserDialog() {
            this.addUserDialog = true;
        },

        closeAddUserDialog() {
            this.addUserDialog = false;
        },

        submitNewUser() {
            // Validate and submit the new user details to the server
            const isValid = this.$refs.addUserForm.validate();
            if (isValid) {
                const newUser = { ...this.newUser }; // Create a copy to avoid reactivity issues

                // Remove nested properties with empty strings to prevent them from being sent
                Object.keys(newUser).forEach(key => {
                    if (newUser[key] === '' || newUser[key] === null) {
                        delete newUser[key];
                    }
                });

                // Assuming a POST request to add the user on the server
                axios.post('https://dummyjson.com/users/add', newUser)
                    .then(response => {
                        console.log('User added successfully:', response.data);

                        // Add the new user to the users array
                        this.users.push(response.data);

                        this.addUserDialog = false;
                        const updatedIndex = this.users.findIndex(user => user.id === this.updatedUser.id);
                        if (updatedIndex !== -1) {
                            this.users[updatedIndex] = response.data;
                        }
                    })
                    .catch(error => {
                        console.error('Error adding user:', error);
                    });
            }
        },

    },
};
</script>

<style scoped>
.green-border {
    border: 2px solid green;
}

.red-border {
    border: 2px solid red;
}
</style>	
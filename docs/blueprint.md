# **App Name**: OrderStream

## Core Features:

- User Authentication: Email/password based authentication to allow users access to order history and details.
- Real-Time Order Status: Real-time updates via websockets to show users the current status of their orders, from processing to shipped to delivered.
- Backend API Integration: Front-end interaction with the Django REST Framework backend to manage orders and user data.
- Persistent Local State: Persistent data store (hosted within the application, instead of using a full-blown database) using local storage. Track and persist key app states to facilitate user experience across multiple sessions.
- User Authentication (JWT-based): Use Django Rest Framework SimpleJWT for token-based authentication. Allow users to: Register with email and password. Log in to obtain an access token and refresh token. Manage their profile (name, address, phone, etc.). View their order history and order details.
- Product Management: Create Product and Category models with the following fields: Category: name, description Product: name, description, price, stock, category (foreign key) Admin users can: Create, update, and delete categories. Add, update, and delete products. Manage product stock (when a product is ordered, its stock decreases).
- Order System: Users can: Add products to their cart. Place an order from the cart. Get notifications (via an API call) when the order status changes (using WebSockets or Django Channels for real-time updates). Order Model: Order: user, product(s), total price, status (pending, shipped, delivered), created_at, updated_at Implement a flow where orders go through these statuses: Pending (default). Shipped. Delivered.
- Caching & Performance Optimizations: Use Redis as a caching layer to store products and categories for quick access. Implement a caching mechanism to store expensive database queries (e.g., fetching product lists). Set a timeout for the cached data (e.g., 1 hour). When a product’s stock or details change, invalidate the cache. Optimize queries using Django's select_related and prefetch_related for complex relations (product and category data).
- Pagination & Filtering: Implement pagination for the product listing (limit 10 products per page). Allow filtering products by: Category. Price range. Stock availability (in stock or out of stock). Ensure that the API can handle large amounts of data efficiently with paginated responses.
- Real-Time Notifications: Use Django Channels or WebSockets to notify users of their order status updates. When the order status changes (e.g., from pending to shipped), notify the user in real time.

## Style Guidelines:

- Primary color: Deep Blue (#3F51B5) to convey trust and reliability in handling order information.
- Background color: Light Gray (#F5F5F5) to provide a clean and modern backdrop.
- Accent color: Teal (#009688) to highlight important updates and interactive elements.
- Clean, sans-serif fonts to ensure optimal readability.
- Minimalist icons representing different order states (e.g., 'pending,' 'shipped,' 'delivered').
- Subtle transitions to reflect real-time updates, reinforcing a dynamic user experience.
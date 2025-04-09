# Fake E-Commerce Platform

This is a modern e-commerce platform built with **React**, **TypeScript**, and **Vite**. It provides a seamless shopping experience with features like authentication, cart management, and a responsive design.

## Features

### 1. **Authentication**
- Users can log in using pre-registered accounts from the [Fakestore API](https://fakestoreapi.com/).
- Example credentials:
  - **Username:** mor_2314
  - **Password:** 83r5^_
- Authentication is handled via tokens stored in `localStorage`.

### 2. **Product Listing**
- Displays a list of products fetched from the Fakestore API.
- Each product includes details like name, price, description, and image.

### 3. **Cart Management**
- Users can add products to their cart.
- The cart displays the total quantity and price of items.
- Cart data is managed using a custom React context (`useCart`).

### 4. **Responsive Design**
- Fully responsive layout optimized for both desktop and mobile devices.
- Mobile navigation is handled via a sliding menu.

### 5. **Logout**
- Users can log out, which clears their authentication token and redirects them to the login page.

## Project Structure

- **Components**
  - `Navbar`: Displays the site header, cart icon, and logout button.
  - `Dialog`: Reusable UI component for modal dialogs.
  - `Sheet`: Used for the mobile menu.
- **Context**
  - `CartContext`: Manages cart state across the application.
- **Pages**
  - `Dashboard`: Displays the product listing.
  - `Cart`: Shows the user's cart details.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/fake-ecomm.git
   cd fake-ecomm
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the app in your browser at `http://localhost:5173`.

## Usage

### Logging In
1. Use the following credentials to log in:
   - **Username:** johnd
   - **Password:** m38rmF$
2. After logging in, you will be redirected to the dashboard.

### Adding Items to Cart
1. Browse the product listing on the dashboard.
2. Click on a product to view its details and add it to the cart.

### Viewing the Cart
1. Click on the cart icon in the navbar.
2. View the total quantity and price of items in your cart.

### Logging Out
1. Click the logout button in the navbar or mobile menu.
2. You will be redirected to the login page.

## API Reference

This project uses the [Fakestore API](https://fakestoreapi.com/) for data. Key endpoints include:
- **Products:** `GET https://fakestoreapi.com/products`
- **Users:** `GET https://fakestoreapi.com/users`
- **Authentication:** `POST https://fakestoreapi.com/auth/login`

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

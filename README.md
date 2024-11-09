
# E-commerce Dashboard for The Computer Point

This is an E-commerce dashboard developed for **The Computer Point**, a hardware and software store. The dashboard is designed to manage the products, customer interactions, and inventory for the store.

## Project Features
- **Product Management**: Add, update, and delete product information, including name, price, category, description, brand, and image URL.
- **User Authentication**: Users can sign up, log in, and log out. After successful signup, the logout option is available in the navigation.
- **MongoDB Integration**: MongoDB is used for managing product data with a simplified product schema.
- **Responsive UI**: The dashboard is designed with responsiveness in mind, ensuring that it functions well on both desktop and mobile devices.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens) (Currently being removed)
- **Styling**: CSS, Bootstrap

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/e-commerce-dashboard.git
   ```

2. **Install Backend Dependencies**:
   Navigate to the backend directory and install the required dependencies.
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**:
   Navigate to the frontend directory and install the required dependencies.
   ```bash
   cd frontend
   npm install
   ```

4. **Set Up MongoDB**:
   - Ensure MongoDB is running locally or use a cloud-based service like MongoDB Atlas.
   - Update the MongoDB URI in the backend code to point to your database.

5. **Start the Backend Server**:
   ```bash
   cd backend
   npm start
   ```

6. **Start the Frontend**:
   ```bash
   cd frontend
   npm start
   ```

   The frontend will be available at `http://localhost:3000`.

## Features to Implement
- JWT authentication(currently in progress).
- Add more product categories and improve the admin interface.

## Contribution
Feel free to fork the project and submit pull requests. Please make sure to add tests for new features and maintain existing functionalities.

## License
This project is licensed under the MIT License.

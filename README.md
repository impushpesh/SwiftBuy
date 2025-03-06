# SwiftBuy
SwiftBuy is a full-stack eCommerce web application built using the MERN stack. It allows users to browse products, place orders, make payments via PayPal, and track their orders. Admins have the ability to manage products and update order statuses.

## Live Website
[SwiftBuy](https://swiftbuy-1.onrender.com)

## Tech Stack
- **Frontend**: React, Redux, Tailwind CSS, DaisyUI, React Icons
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT & Bcrypt
- **File Uploads**: Multer & Cloudinary
- **Payment Gateway**: PayPal

## Features
### Client
- Browse and search for products
- Add products to the cart
- Place orders and make payments using PayPal
- Track order status

### Admin
- Add, update, and delete products
- Manage orders and update order status

## Environment Variables
Create a `.env` file in both the **frontend** and **backend** directories with the following variables:

### Frontend (`frontend/.env`)
```
VITE_API_URL=http://localhost:5000
```

### Backend (`backend/.env`)
```
MONGO_URI=
JWT_SECRET=
PORT=
CLIENT_BASE_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

PAYPAL_MODE=
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
```

## Installation & Setup
### 1. Clone the Repository
```sh
git clone https://github.com/impushpesh/SwiftBuy.git
cd SwiftBuy
```

### 2. Install Dependencies
#### Backend
```sh
cd backend
npm install
```

#### Frontend
```sh
cd frontend
npm install
```

### 3. Run the Application
#### Start Backend Server
```sh
cd backend
npm run dev
```

#### Start Frontend
```sh
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173` and the backend on `http://localhost:5000` (or as per your environment settings).

## Deployment
For deployment, make sure to:
- Set up the correct **environment variables** in your hosting platform.
- Use **session storage** for tokens in the reference-master branch.
- Use **cookies** for authentication in the main branch.


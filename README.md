# Solana Wallet Web Application

This project is a web application for creating and managing a Solana wallet, built using Next.js, TypeScript, Redux-Saga, Solana Web3.js, and SCSS for styling. It allows users to create wallets, view their balance, send SOL tokens, and handle transactions on the Solana Devnet.

## Features

- **Create Wallet**: Generate a new Solana wallet with a public and secret key.
- **View Balance**: Display the current balance of the wallet in SOL.
- **Send SOL**: Transfer SOL tokens to another wallet address.
- **Real-time Updates**: Receive real-time updates for balance changes using WebSockets.
- **Persistent Wallet State**: Store wallet information in local storage to maintain state across page reloads.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **TypeScript**: For static type checking and improved developer experience.
- **Redux Toolkit**: Simplified setup of Redux with `createSlice` for state management.
- **Redux-Saga**: Middleware to handle side effects in Redux.
- **Solana Web3.js**: Library for interacting with the Solana blockchain.
- **SCSS**: A CSS preprocessor for styling.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have Node.js and Yarn installed on your development machine.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/phanmhung/my-solana-app
   cd solana-wallet-app
   ```

2. **Install the dependencies**:

   ```bash
   yarn install
   ```

### Running the Application

To start the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

To build the application for production:

```bash
yarn build
```

To start the production server:

```bash
yarn start
```

## Project Structure

The project structure is organized using a feature-based approach, as follows:

```
.
├── features      # Shared React components
├── entities        # Feature-based structure for Redux slices
│   └── wallet      # Wallet-related logic and state management
├── pages           # Next.js pages
├── public          # Static files
├── shared          # Global utils and styles
```

## Key Files

- **`_app.tsx`**: Custom app component to initialize Redux and dispatch wallet loading on app start.
- **`entities/wallet`**: Contains wallet-related Redux slices, sagas, and types.
- **`pages/index.tsx`**: Main page for creating a wallet and viewing balance.
- **`pages/transactions.tsx`**: Page for sending SOL tokens.

## Contact

For questions or feedback, please contact:

- **Your Name**: [hungfan2000@example.com](mailto:hungfan2000l@gmail.com)
- **GitHub**: [@phanmhung](https://github.com/phanmhung)

---

This README provides a comprehensive guide to understanding, installing, and running the Solana Wallet Web Application.
```

Feel free to copy and paste this directly into your README.md file, making sure to replace placeholders like `yourusername` and `your.email@example.com` with your actual information.

# OpenBooks Smart Contract Integration with Nest.js Backend

This README provides an overview of integrating the OpenBooks Escrow Smart Contract with a Nest.js backend. The integration facilitates book rentals with customizable pricing and durations.

## Setup

1. **Installation**:
   - Install Node.js and npm if not already installed.
   - Clone the OpenBooks repository and navigate to the Nest.js backend directory.

2. **Configuration**:
   - Configure the Solana wallet keypair and ensure it's accessible to the backend.
   - Update the Solana network endpoint in `solana.service.ts` to the desired network (e.g., devnet).

3. **Dependencies**:
   - Install project dependencies using `npm install`.

## Smart Contract APIs Integration

The integration involves implementing Nest.js controller and service to interact with the smart contract APIs.

### Controller

- **solana.controller.ts**:
  - Provides API endpoints for initializing escrow, requesting rent, accepting rent, and returning books.
  - Extracts request body parameters and passes them to corresponding service methods.

### Service

- **solana.service.ts**:
  - Initializes Solana connection, wallet, and program.
  - Implements methods to invoke smart contract functions using the Anchor framework.
  - Each method corresponds to a specific smart contract function:
    - `initializeEscrow`: Initializes the escrow account.
    - `requestRent`: Initiates a rental request.
    - `acceptRent`: Accepts a rental request.
    - `returnBook`: Processes the return of a rented book.

## Usage

1. **Start the Backend**:
   - Run the Nest.js backend using `npm run start`.

2. **API Endpoints**:
   - Access the API endpoints defined in `solana.controller.ts` at `/solana/*`.

3. **Interact with Smart Contract**:
   - Use API requests to interact with the OpenBooks Escrow Smart Contract.
   - Ensure proper request body parameters are provided for each API endpoint.

## Example Requests

### Initialize Escrow
```http
POST /solana/initialize-escrow
Content-Type: application/json

{
  "pricePerDay": 10,
  "depositAmount": 50,
  "initializerDepositTokenAccount": "publicKey1",
  "initializerReceiveWalletAccount": "publicKey2"
}

POST /solana/request-rent
Content-Type: application/json

{
  "rentalDays": 7,
  "taker": "publicKey1",
  "escrowAccount": "publicKey2"
}

POST /solana/accept-rent
Content-Type: application/json

{
  "taker": "publicKey1",
  "takerDepositTokenAccount": "publicKey2",
  "initializerDepositTokenAccount": "publicKey3",
  "pdaAccount": "publicKey4",
  "escrowAccount": "publicKey5"
}

POST /solana/return-book
Content-Type: application/json

{
  "taker": "publicKey1",
  "initializerReceiveWalletAccount": "publicKey2",
  "takerDepositTokenAccount": "publicKey3",
  "initializerDepositTokenAccount": "publicKey4",
  "pdaAccount": "publicKey5",
  "escrowAccount": "publicKey6"
}

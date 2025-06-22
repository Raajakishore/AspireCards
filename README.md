# Aspire Cards App

An Expo-managed React Native application for managing debit and credit cards, featuring a mock in-memory API, Redux Toolkit with Sagas and unit testing.

---

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Raajakishore/AspireCards.git
   cd AspireCards
   ```

2. **Install dependencies**

   ```bash
   yarn install
   # or
   npm install
   ```

3. **Ensure you have the Expo CLI**

   ```bash
   npm install -g expo-cli
   ```

---

## Running the App

### iOS Simulator

1. Start the Expo development server:

   ```bash
   expo start
   ```
2. In the Metro bundler terminal, press \`i\` to launch the iOS simulator.

### Android Emulator

1. Start the Expo development server:

   ```bash
   expo start
   ```
2. Press \`a\` in the terminal to open the Android emulator (ensure you have an emulator running).

### Physical Devices

* Scan the QR code displayed by `expo start` using the Expo Go app on iOS or Android.

---

## Mock API Endpoints

The app uses an in-memory mock API (no external server required). Located in `src/store/apis/index.ts`:

* \`getAllCardDetails\`

  * Returns a predefined list of card objects after a 500ms delay.
* \`addNewCard\`

  * Accepts a new card payload and returns it after 300ms.
* \`updateCard\`

  * Updates card details and returns it after 300ms.

Redux Sagas invoke these methods instead of making actual HTTP requests.

---

## Testing

The project uses **Jest** and **React Native Testing Library**.

* **Run all tests**

  ```bash
  yarn test
  # or
  npm test
  ```
---

## Folder Structure

```
src/
├── components/       # Reusable UI components
├── screens/          # Screen-level components
├── store/            # Redux slices, actions, sagas, 
├── utils/            # Helpers and mock data
├── theme/            # Color palette
└── App.tsx           # Entry point
```

---

## Demo Videos

Access the demo videos for both iOS and Android [here](https://drive.google.com/drive/u/0/folders/1HXfFGC71VoMIYlz4pBS_jRbf4xBW_cDL).



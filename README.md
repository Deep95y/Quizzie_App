# Quizzie App

Welcome to **Quizzie App**, your go-to solution for creating, taking, and analyzing quizzes! Built with the MERN stack, Quizzie App has a user-friendly front-end with a robust back-end for an engaging user-experience. Whether you're an educator looking to create quizzes for your students or just someone who loves quizzes, Quizzie App has got you covered.

## Features

### 🌟 Login Module
- **User Authentication**: Secure login and registration.

### 📝 Quiz Attempt Module
- **User-Friendly Interface**: Easy-to-navigate quiz pages.
- **Timed Quizzes**: Option to set time limits for quizzes.
- **Instant Feedback**: Immediate results upon quiz completion.

### 📊 Quiz Analytics Module
- **Quiz Dashboard**: Track quiz performance with detailed analytics.
- **Attempt analysis**: See question wise attempts of all quizzes.

### ⚙️ Quiz CRUD Module
- **Create Quizzes**: Interface to create new quizzes.
- **Read Quizzes**: View and manage existing quizzes.
- **Update Quizzes**: Edit quiz content and settings.
- **Delete Quizzes**: Remove quizzes that are no longer needed.

## Tech Stack

### Front-End
- **React**: A powerful JavaScript library for building user interfaces.
- **Redux**: For managing application state.

### Back-End
- **Node.js**: JavaScript runtime engine.
- **Express.js**: Minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing quiz data.
- **Mongoose**: MongoDB object modeling for Node.js.

### Authentication & Security
- **JWT**: JSON Web Tokens for secure user authentication.

## Getting Started

### Prerequisites
- **Node.js**: Download and install from [nodejs.org](https://nodejs.org/).
- **MongoDB**: Make sure you have MongoDB server installed and running.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Deep95y/QuizzeApp.git
   ```


2. ***Navigate to the project directory***

```bash

cd QuizzieApp
```

3. ***Install dependencies***

```bash

npm install
cd Server
npm install
cd ..
```

4. ***Set up environment variables in react application***

Create a .env file in the root directory of the react app and add the following:

```bash
VITE_API_URL=http://localhost:3000           #port onto which your express backend will run
VITE_REACT_URL=http://localhost:5173         #port onto which your react app will run
```

4. ***Set up environment variables in express application***

Create a .env file in the root directory of express app in Server folder and add the following:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

5. ***Run the react application***

```bash

npm run dev
```

6. ***Open a new terminal and enter into the Server folder***

```bash

cd Server
```


5. ***Run the express server for backend api. It will run on Port 3000 by default***

```bash

nodemon app
```

Your app should now be running on http://localhost:5173

## Deployed Project

You can quickly get started with QuizzieApp by signing up with us by clicking [here](https://dep-quizzie-app.netlify.app/)

## Usage

- **Sign Up or Log In**: Create an account or log in with your existing credentials.
- **Create a Quiz**: Navigate to the dashboard and start creating quizzes.
- **Take a Quiz**: After creation you'll be given a quiz link. Share/Open the link and start answering questions.
- **View Analytics**: Check on the overall quiz attempts in the analytics section.

If you have any questions or suggestions, feel free to reach out!

Happy Quizzing! 🎉

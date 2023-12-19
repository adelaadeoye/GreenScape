# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, to run locally you can do the following:

### `npm install` 
{this is will install all the dependencies}

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The port number might change if port 3000 is already in use.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Deployed Url: https://adelaadeoye.github.io/GreenScape/


**Technical Decisions:**

1. **React**: The application is built using React, a popular JavaScript library for building user interfaces. React is known for its component-based architecture, making it easy to manage and reuse UI components.

2. **React-Bootstrap**: React-Bootstrap is used for styling the UI components. Bootstrap provides a set of responsive and customizable components, making it easier to create a visually appealing and consistent user interface.

3. **React Router**: React Router is employed for client-side routing. It enables navigation between different views in a single-page application (SPA) without triggering a full page reload. The `<Navigate />` component is used for programmatic navigation.

4. **useState and useEffect Hooks**: These hooks are used to manage state and side effects in functional components. State is utilized to keep track of user information, current user, and business data.

5. **JSON Data for Users and Businesses**: User and business data is initially loaded from JSON files (`users.json` and `business.json`). This allows for easy modification and extension of data without the need for a backend server.

6. **Moment.js**: Moment.js is used for working with dates and times. It's used to format review dates in a human-readable form.

**Challenges:**

1. **Data Persistence Issue**: One challenge is that user information and business reviews are not saved when the application is deployed using GitHub Pages. GitHub Pages is a static hosting service, and it does not support server-side operations or persistent storage. To address this, we would need to use a backend service or database for storing user and business data.

2. **Limited Data Management with useState**: Using `useState` for managing user and business data might become challenging as the application grows. In a real-world scenario, I would likely want to consider using a more robust state management solution, such as Redux, to handle the complexity of state management.

3. **Security Considerations**: In a production environment, handling user authentication and authorization on the client side has security implications. Storing sensitive information on the client can expose it to potential security risks. Implementing a secure authentication solution with server-side validation is recommended for production applications.

To address the data persistence issue, I will consider integrating a backend service (e.g., Node.js with Express) and a database (e.g., MongoDB) to store user and business data. This would enable me to perform CRUD operations and maintain data across different sessions and deployments. Additionally, deploying the backend separately from the frontend will help to ensure a more robust and scalable architecture.
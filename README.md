# Getting Started with Create React App

# Personal Finance Management App

## Overview
This project is a personal finance management application built using React.js. It allows users to track their income and expenses, categorize transactions, generate visual reports, and manage budgets for each category. The app uses **json-server** as a fake REST API (with `db.json`) to simulate CRUD operations on financial data.

## Features
- **Track Transactions**: Allows users to add, edit, and delete transactions.
- **Categorization**: Users can view transactions under predefined categories such as Food, Transport, Entertainment, etc.
- **Visual Reports**: Displays spending patterns using pie charts and bar graphs.
- **Budget Management**: Users can set monthly budget limits for each category and get notifications if they exceed the budget.

## Technologies Used
- **Frontend**: React.js (with Create React App)
- **Backend**: json-server (using `db.json` to simulate API endpoints)
- **Charting Library**: recharts for visual reports
- **Database**: `db.json` for in-memory data storage via json-server

## Setup Instructions

### Install Dependencies
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/finance-management-app.git

2.Navigate to the project directory

 once the repository is cloned, move into the fintrack folder:

 cd fintrack

3.Navigate to the myapp folder

Next, go to the myapp folder where the React project is located:

cd myapp

4.Install dependencies

Install the required dependencies for the React app:

npm install 

5.Start the development server

Once the dependencies are installed, you can run the application:

npm start

The app will run on http://localhost:3000 by default.

6.et up the Dummy API with json-server (in a second terminal)

Open a second terminal window. Navigate to the folder where db.json is located (if it's in the root, no navigation is needed), and start the json-server:

json-server --watch db.json --port 3001

The API will be available at http://localhost:3001.



Steps to run both React app and json-server backend:

1.Open the first terminal for your React app:

Navigate to the myapp directory:

cd fintrack/myapp

npm start

This will start the React app on http://localhost:3000.

2.Open the second terminal for the backend (json-server):

Navigate to the directory where db.json is located (if it's in the root of the project, no need to navigate anywhere).

Run the json-server to simulate the backend API:
json-server --watch db.json --port 3001


This will start the json-server on http://localhost:3001.


Repository
The source code for this project is available at:

https://github.com/SrilakshmiRam/fintrack-1


### Explanation:
- The **first terminal** is for running the React app.
- The **second terminal** is for running the json-server for the API.

This setup will allow both your frontend and backend to run concurrently. Let me know if you'd like further help!

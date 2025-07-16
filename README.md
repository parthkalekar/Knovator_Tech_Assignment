
# Scalable Job Importer with Queue Processing & History Tracking


This project is a full-stack MERN (MongoDB, Express.js, React/Next.js, Node.js) assignment for building a Scalable Job Import System. It fetches job data from external APIs, processes the data in background queues using Redis & BullMQ, stores it in MongoDB, and provides an admin dashboard to view import history.


## Project Structure
```
    /client     // Frontend - Admin UI built with Next.js
    /server     // Backend - Node.js + Express/Nest
    README.md   // Project documentation and setup
```


##  Key Features

  #### 🛠 Job Source API Integration
    
   * Fetches job listings from multiple RSS/XML APIs.

   * Converts XML responses to JSON.

   * Stores the raw feed in MongoDB.

   * Runs as a cron job every hour to import or update jobs.

  #### 🧵 Queue-Based Background Processing
  
   * Uses BullMQ + Redis to manage background job queues.

   * Worker processes jobs with configurable concurrency.

   * Each job is validated and inserted or updated into MongoDB.

   * Errors (e.g., DB issues or validation failures) are logged.

  #### 📊 Import History Tracking
 
   Each import creates a log entry with:

```
   - timestamp

   - totalFetched

   - totalImported

   - newJobs

   - updatedJobs

   - failedJobs (with reason)
```
Stored in a MongoDB collection: import_logs.

  #### 🧑‍💻 Admin UI (Next.js)
  Displays a dashboard for import history.

  You can view details like how many jobs were fetched, created, updated, or failed per feed.

  Admin UI built in Next.js with clean modular components.

  #### Technologies Used
   * Frontend  - NextJS
   * Backend   - Node.js + Express
   * Database  - MongoDB + Mongoose
   * Queue - BullMQ
   * Queue Store	- Redis (Cloud)


## Setup Instructions
 Prerequisites
* Node.js (v18+)

* MongoDB (Local/Atlas)

* Redis (Local/Cloud)

* Yarn or npm

Clone the Repository
```
git clone https://github.com/parthkalekar/Knovator_Tech_Assignment.git
cd Knovator_Tech_Assignment
```

Setup Backend
```
cd server
cp .env  # Fill in MongoDB URI and Redis config
npm install
npm run dev
```

Setup Frontend
```
cd client
cp .env # Fill in backend URL
npm install
npm run dev
```

## 🌐 Live Preview
Visit here to see live deployed app link

https://jobimporter.vercel.app

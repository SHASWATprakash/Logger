##  Prerequisites
- **Node.js** v18+ (v20 recommended)
- **npm** v8+  
- Git installed locally

---

## ⚙ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SHASWATprakash/Logger.git
   cd Logger/backend
Install dependencies:

bash
Copy
Edit
npm install

Running the Backend 

Start the server in development mode (with auto-reload):

npm run dev


Or start normally:

npm start


##  Frontend (Log Query UI)

This phase adds a React-based interface to query and view logs from the backend.

### 🚀 How to Run
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
Install dependencies:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
npm run dev
Open the app in your browser:

arduino
Copy
Edit
http://localhost:5173
# Features Implemented
Filter Bar with:

Full-text search on message

Level dropdown (error, warn, info, debug)

Resource ID filter

Date range selectors (start & end)

Log List:

Reverse chronological display

Color-coded log levels for quick scanning

Timestamps formatted for readability

Dynamic fetching from backend API as filters change

Graceful handling of empty results

# API Dependency
The frontend communicates with the backend from Phase 1.
Ensure the backend server is running before starting the frontend:

bash
Copy
Edit
cd backend
npm run dev

# Enhancements
- **Debounced search (400ms)** to reduce API calls.
- **Clear filters** button to reset all criteria.
- **Live updates (bonus):** When new logs are ingested, they appear instantly.

**Run order**
1. Backend
   ```bash
   cd backend
   npm install
   npm run dev
Frontend

bash
Copy
Edit
cd ../frontend
npm install
npm run dev
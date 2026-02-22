# IronFlow — Modular Workout Builder

A full-stack workout builder web app with a Claude.ai-inspired dark UI. Build, customize, and save your training routines with a horizontal drag-and-drop flow editor.

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18 + Vite + Tailwind CSS      |
| Backend   | Node.js + Express                   |
| Auth      | JWT (jsonwebtoken + bcryptjs)       |
| Drag/Drop | @dnd-kit/core + @dnd-kit/sortable   |
| Routing   | React Router v6                     |
| Data      | In-memory store (swap-ready for DB) |

---

## Project Structure

```
1stREPO/
├── client/                  # React + Tailwind frontend
│   ├── src/
│   │   ├── api.js           # Axios instance
│   │   ├── App.jsx          # Router + providers
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── WorkoutContext.jsx
│   │   ├── data/
│   │   │   └── exercises.js # 55+ built-in exercises (fallback)
│   │   ├── hooks/
│   │   │   └── useLocalStorage.js
│   │   └── components/
│   │       ├── layout/      # Sidebar, Layout
│   │       ├── auth/        # Login, Register pages
│   │       ├── builder/     # WorkoutBuilder, WorkoutFlow, WorkoutCard, selectors
│   │       ├── exercises/   # ExerciseLibrary, ExerciseLibraryCard, CustomExerciseModal
│   │       ├── workouts/    # MyWorkouts
│   │       └── profile/     # ProfilePage (edit info + PRs)
│   ├── tailwind.config.js
│   └── vite.config.js       # Dev proxy → localhost:5000
│
└── server/                  # Node.js/Express backend
    ├── index.js             # Entry point
    └── src/
        ├── app.js           # Express app + routes mount
        ├── routes/          # auth, workouts, exercises, profile
        ├── controllers/     # Business logic (DB-agnostic)
        ├── middleware/
        │   └── auth.js      # JWT verification
        └── data/
            ├── store.js     # In-memory store (swap for Mongoose/Prisma)
            └── exercises.js # 55+ built-in exercises seed data
```

---

## Setup & Running

### Prerequisites

- Node.js 18+
- npm 9+

### 1. Install dependencies

```bash
# Install server deps
cd server && npm install

# Install client deps
cd ../client && npm install
```

### 2. Start the backend

```bash
cd server
npm run dev        # uses nodemon (auto-restart)
# or
npm start
```

Server listens on **http://localhost:5000**

### 3. Start the frontend

```bash
cd client
npm run dev
```

Frontend runs on **http://localhost:5173** and proxies `/api/*` to the backend automatically.

### 4. Open the app

Navigate to **http://localhost:5173** in your browser.

---

## Features

### User Auth
- Register with name, email, password, gender, age
- JWT-based auth stored in localStorage
- Protected routes redirect unauthenticated users

### Workout Builder
- Select target muscle group (Upper Body / Lower Body / Full Body)
- Select sub-focus (Chest, Back, Arms, Shoulders, Legs, Core, Full Body)
- Set target duration (30 or 60 minutes)
- Horizontal drag-and-drop flow editor — reorder cards by dragging
- Running time progress bar fills toward target as cards are added
- Save / update named workouts

### Exercise Cards (in flow)
- Shows exercise name, muscle badge, sets, reps, weight (optional), rest period
- All fields are editable inline with live time recalculation
- Formula: `sets × timePerSet + (sets - 1) × restPeriod`

### Exercise Library
- 55+ built-in exercises across Chest, Back, Shoulders, Arms, Legs, Core, Full Body
- Filtered automatically by selected muscle group + sub-focus
- Search bar filters by name
- Create custom exercises (name, group, default sets/reps/rest/time-per-set)
- Delete custom exercises
- Click `+` or drag library cards to add to the flow

### My Workouts
- Grid view of all saved routines
- Shows muscle group, sub-focus, total estimated time vs target
- Edit (loads routine back into Builder) or delete

### Profile
- Edit name, gender, age
- Personal Records (PRs) log — add exercise + weight + unit + date, delete entries

---

## Swapping the Data Layer

The backend is structured so the data layer is fully isolated in `server/src/data/store.js`.

To add a real database:

1. Install your DB driver (e.g. `mongoose` or `@prisma/client`)
2. Replace the array-based collections in `store.js` with DB calls using the **same exported interface** (`UsersStore`, `WorkoutsStore`, `CustomExercisesStore`)
3. No controller or route changes needed

Example swap (MongoDB/Mongoose):
```js
// store.js — replace find/insert/update/remove with Mongoose model calls
const UsersStore = {
  findById: (id) => UserModel.findById(id),
  findByEmail: (email) => UserModel.findOne({ email }),
  create: (data) => UserModel.create(data),
  update: (id, updates) => UserModel.findByIdAndUpdate(id, updates, { new: true }),
};
```

---

## Environment Variables

| Variable     | Default                         | Description                |
|--------------|---------------------------------|----------------------------|
| `PORT`       | `5000`                          | Server port                |
| `JWT_SECRET` | `workout-builder-secret-dev`    | JWT signing secret (change in prod!) |

Create a `.env` file in `/server`:
```env
PORT=5000
JWT_SECRET=your-very-long-secret-here
```

# Smart Review & Feedback Tool

A MERN stack application that allows customers to submit ratings and feedback for a business and generates short, editable review suggestions based on the rating, service, and customer context.

The application also provides an Admin Dashboard where submitted feedback can be viewed and filtered by rating.

---

## 🚀 Features

### Customer Review Page

- Display business name and business type
- Select rating from 1 to 5 stars
- Enter optional service information
- Enter optional feedback/context
- Generate 2–3 short review suggestions
- Suggestions are editable
- Select a generated suggestion
- Submit final feedback
- Loading, success, and error states

### Admin Dashboard

- View total number of responses
- View average rating
- View all submitted reviews
- Filter reviews by rating:
  - All
  - 1 Star
  - 2 Stars
  - 3 Stars
  - 4 Stars
  - 5 Stars
- Reviews with ratings 1–3 are marked as **Needs Attention**
- Display business name and business type
- Display service, feedback, and created date

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

---

## 📁 Project Structure

```text
Smart_Review_Feedback_Tool/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── businessController.js
│   │   └── reviewController.js
│   │
│   ├── models/
│   │   ├── Business.js
│   │   └── Feedback.js
│   │
│   ├── routes/
│   │   ├── businessRoutes.js
│   │   └── reviewRoutes.js
│   │
│   ├── utils/
│   │   └── reviewGenerator.js
│   │
│   ├── .env.example
│   ├── .gitignore
│   ├── Server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── StarRating.jsx
│   │   │   └── SuggestionCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── ReviewPage.jsx
│   │   │   ├── ReviewPage.css
│   │   │   ├── Dashboard.jsx
│   │   │   └── Dashboard.css
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
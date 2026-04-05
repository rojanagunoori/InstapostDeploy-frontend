# InstaPost

<video src="/frontend/public/instapost.mp4" controls="controls" style="max-width: 100%;">
</video>

![Screenshot 1](/frontend/public/Instapost1.png)
![Screenshot 2](/frontend/public/instapost2.png)
![Screenshot 3](/frontend/public/instapost3.png)

A modern social media platform frontend built with React, Vite, and TailwindCSS. Users can view posts, like/dislike, comment, search, and share content with real-time notifications powered by Socket.IO.

**Important Links:**

- **Frontend Repository:** https://github.com/rojanagunoori/InstaPost-frontend |https://github.com/rojanagunoori/InstapostDeploy-frontend
- **Backend Repository:** https://github.com/rojanagunoori/InstaPostDeploy-sever
- **Live Demo Frontend:** https://instapostdeploy-sever.onrender.com/
- **Live Demo Backend:** https://instapostdeploy-sever.onrender.com/

---

## 2. Project Overview

InstaPost Frontend is a modern, interactive social media platform built with React, Vite, and TailwindCSS. It serves as the frontend interface for users to interact with posts stored in a Firebase Firestore backend and receive real-time updates via Socket.IO.

The project allows users to:

- **View posts** with images, descriptions, and posting dates.
- **Engage with posts** by liking or disliking them.
- **Interact through comments:** add, edit, delete, and like/dislike comments.
- **Search posts** efficiently with keyword matching in a modal dialog.
- **Share posts** on multiple social platforms via a share dialog.
- **Switch between dark and light modes** for a better visual experience.

**Purpose:**
The project was built to provide a responsive, real-time social media experience, demonstrating frontend state management, Firebase integration, and real-time communication using WebSockets. It showcases how a modern social media UI can be implemented with React Hooks, Context API, and TailwindCSS while maintaining modularity and scalability.

---

## 3. 🚀 Features

Detailed Feature List:

1. **Post Management:**

- Display posts with images, descriptions, and dates.
- Real-time updates for likes, dislikes, and comments.

2. **Comment System:**

- Add, edit, delete, and like/dislike comments for each post.
- Nested updates handled efficiently in Firebase Firestore.

3. **Real-Time Notifications:**

- Socket.IO integration for real-time updates when posts are liked, disliked, or commented.
- Notifies post owners of user interactions.

4. **Search Functionality:**

- Search posts by keyword.
- Displays results dynamically in a modal dialog.

5. **Social Sharing:**

- Share posts via LinkedIn, Instagram, GitHub, and Facebook.
- Share dialog adapts to dark/light mode.

6. **Responsive UI & Dark/Light Mode:**

- Fully responsive for desktop and mobile devices.
- Toggle dark/light mode globally using Context API.

7. **Loader and Feedback**

- Loader component for async operations like fetching posts or updating likes/comments.

---

## 4. Folder / Project Structure

### Frontend

```bash
   src/
   ├─ components/
   │ ├─ footer/
   │ │ └─ Footer.jsx
   │ ├─ layout/
   │ │ └─ Layout.jsx
   │ ├─ loader/
   │ │ └─ Loader.jsx
   │ ├─ navbar/
   │ │ └─ Navbar.jsx
   │ ├─ postPostCard/
   │ │ └─ PostPostCard.jsx
   │ ├─ searchDialog/
   │ │ └─ SearchDialog.jsx
   │ ├─ shareDialogBox/
   │ │ └─ ShareDialogBox.jsx
   │ └─ MessageList/
   │ ├─ MessageList.jsx
   │ └─ MessageList.css
   ├─ context/
   │ └─ data/
   │ ├─ MyContext.jsx
   │ └─ SocketContext.jsx
   ├─ firebase/
   │ └─ FirebaseConfig.js
   └─ socket/
   └─ socket.js
```

### Bakend

```bash
backend
   ├─ server.js
```

**Explanation:**

- `components/` – All React UI components.
- `context/` – Context API for global state and Socket.IO.
- `firebase/` – Firebase configuration and initialization.
- `socket/` – Socket.IO client setup.

---

## 5. Tech Stack / Environment

### Frontend:

- **React 18 –** UI library for building interactive interfaces.
- **Vite 4 –** Modern, fast build tool for development and bundling.
- **TailwindCSS 3 –** Utility-first CSS framework for responsive, customizable styling.
- **Material Tailwind –** Ready-to-use components for dialogs, buttons, avatars, and more.
- **React Icons –** Icon library for UI elements like search, share, and social platforms.

### Backend & Database:

- **Firebase Firestore –** NoSQL database for storing posts, likes, dislikes, and comments.
- **Firebase Auth –** (Optional) for user authentication.
- **Socket.IO –** For real-time communication and notifications between users.

### Development & Deployment:

- **Node.js & npm –** Project management and dependency handling.
- **Vercel –** Frontend deployment.
- **Render –** Backend deployment.

### Environment Variables Required:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_BACKEND_URL=https://instapostdeploy-sever.onrender.com
```

---

## 6. Installation / Setup

1. Clone the repo:

```bash
git clone https://github.com/rojanagunoori/InstaPost-frontend.git
```

2. Navigate into the project directory:

```bash
cd InstaPost-frontend
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory and add required environment variables (see next section).
5. Run the development server:

```bash
npm run dev
```

6. Open in browser: http://localhost:5173/

### Backend (Server) Setup

1. **Clone the backend repository**:

```bash
git clone https://github.com/rojanagunoori/InstaPostDeploy-sever.git
```

2. Navigate into the backend project directory:

```bash
cd InstaPostDeploy-sever
```

3. Install backend dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory and add the required environment variables:

```bash
PORT=5000
```

Note: You can change PORT to your preferred port if needed. The default is 5000.

5. Run the backend server:

```bash
node server.js
```

6. Access the backend server:

```bash
http://localhost:5000
```

7. API Endpoints (examples):

- GET `/api/posts` – fetch all posts
- POST `/api/posts` – create a new post
- POST `/api/auth/login` – login user
- POST `/api/auth/register` – register user

Make sure your frontend .env points to this backend via:

```bash
VITE_BACKEND_URL=http://localhost:5000
```

## 7. Environment Variables

Add a .env file in the root:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_BACKEND_URL=https://instapostdeploy-sever.onrender.com
```

## 8. API Usage

### Socket.IO Events:

```bash

socket.emit('like', { user, postOwner, description });
socket.emit('dislike', { user, postOwner, description });
socket.emit('comment', { user, postOwner, description });
```

### Firebase Firestore Usage Example:

```bash
import { doc, updateDoc } from 'firebase/firestore';
import { fireDb } from '../../firebase/FirebaseConfig';

const docRef = doc(fireDb, 'postPost', postId);
await updateDoc(docRef, {
likes: (currentLikes || 0) + 1
});
```

---

## 9. Key Components

1. Layout.jsx:

- Wraps the entire frontend.
- Contains Navbar and Footer components.
- Provides consistent structure for all pages.

2. Navbar.jsx:

- Responsive top navigation with:
  - Home, Posts, Admin Login links.
  - Dark/Light mode toggle.
  - Search modal.
  - Share modal.
  - User avatar linking to dashboard.

3. PostPostCard.jsx:

- Displays all posts dynamically from Firebase.
- Handles likes, dislikes, and comments in real-time.
- Contains input for adding comments and buttons for editing/deleting comments.

4. Loader.jsx:

- Reusable spinner component for async operations.

5. MessageList.jsx:

- Displays messages in a chat-like list.
- Styles messages based on sender (own vs. peer).

6. SearchDialog.jsx:

- Modal dialog to search posts by keyword.
- Dynamically updates search results.

7. ShareDialogBox.jsx:

- Modal dialog for sharing posts on social media.
- Supports LinkedIn, Instagram, GitHub, Facebook.

---

## 10. Security

- User authentication handled via Firebase Authentication (if implemented).
- Real-time events validated via Socket.IO backend.
- Firebase Firestore rules can restrict write access to authorized users.

---

## 11. Challenges Faced During Development

1. Real-Time Updates:

- Problem: Updating likes, dislikes, and comments in real-time across all users.
- Solution: Integrated Socket.IO and React state management using useEffect and Context API.

2. Firestore Nested Data Updates:

- Problem: Updating nested comment arrays while maintaining immutability.
- Solution: Used deep copies of arrays and objects when updating comments in Firestore.

3. Dark/Light Mode Consistency:

- Problem: Ensuring all components respected the global theme toggle.
- Solution: Centralized mode state in Context API and applied conditional styling across components.

4. Responsive UI Design:

- Problem: Making components like Navbar, posts, and dialogs responsive for mobile.
- Solution: Used TailwindCSS responsive utilities and tested across different screen sizes.

---

## 12. Future Improvements

- Implement Firebase Authentication for personalized user experience.
- Add user profile pages with uploaded posts and activity tracking.
- Introduce notifications panel for likes, comments, and shares.
- Implement infinite scroll or pagination for posts.
- Enhance UI/UX with animations for transitions, likes, and comments.
- Improve accessibility and mobile-first design for better usability.

---

## 13. Contributing

1. Fork the repo.
2. Create a feature branch:
   `git checkout -b feature-name`
3. Commit changes:
   `git commit -m "Add some feature"`
4. Push branch:
   `git push origin feature-name`
5. Open a Pull Request.

---

## 14. Acknowledgments

- React
- Vite
- TailwindCSS
- Material Tailwind
- Firebase
- Socket.IO

---

## 15. License

This project is licensed under the MIT License – see the LICENSE file for details.

---

## 16. 🙋‍♀️ Author / Contact

**Nagunoori Roja**

- 📧 Email: [nagunooriroja@gmail.com](mailto:nagunooriroja@gmail.com)
- 🌐 GitHub: [https://github.com/rojanagunoori](https://github.com/rojanagunoori)
- 🌐 LinkedIn: [https://www.linkedin.com/in/nagunoori-roja-51b936267/](https://www.linkedin.com/in/nagunoori-roja-51b936267/)
- 🌐 Personal Portfolio: [portfolio-roja.netlify.app](https://portfolio-roja.netlify.app/)
- 🌐 LeetCode: [https://leetcode.com/u/dSdsi6XkI8/](https://leetcode.com/u/dSdsi6XkI8/)
- 🌐 Kaggle: [https://www.kaggle.com/nagunooriroja](https://www.kaggle.com/nagunooriroja)

---

# 🧩 Template Manager App

A single-page application (SPA) for managing visual templates. This project was created as part of a job application and showcases CRUD operations, authentication, filtering, and global state management using modern Vue 3 stack.

## ✨ Features

- 🔐 **Authentication**
    - Login form with credentials validation
    - Session persistence
- 🗂 **Template Grid**
    - Display templates in a responsive grid
    - Show title and preview image
    - Edit or delete templates directly from the grid
- ➕ **Add/Edit Templates**
    - Form with fields: title (required), tags, description, width, height, and preview image
    - Form validation and error handling
    - Draft saving to LocalStorage for session recovery
- 🔍 **Filtering & Search**
    - Filter templates by tags (loaded from backend)
    - Real-time search with debounce and backend integration
- ❌ **Empty State Handling**
    - Message display when no templates are available

## 🛠️ Tech Stack

- **Vue 3** – Composition API
- **Pinia** – State management
- **Vue Router** – Navigation
- **Axios** – HTTP requests
- **Element plus** – UI kit
- **LocalStorage** – Draft preservation
- **Vite** – Project scaffolding and dev server

## 📂 Pages

- `/login` – Login page with credentials form
- `/` – Home page displaying template grid
- `/template/:id` – Template editor page

## 🧪 Demo Credentials

To access the protected features, use the following login credentials:

login: hello@aiscreen.io
password: Demo!1234
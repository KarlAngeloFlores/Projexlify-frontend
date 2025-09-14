# Projexlify - Project Management App - Frontend

## Overview
This repository contains the **frontend** of the Projexlify - Project Management App, developed with **React (Vite)**. The frontend provides a clean and responsive user interface for managing projects and tasks. It communicates with the backend via REST APIs and supports authentication/authorization.

## Tech Stack
- **React (Vite)** – Frontend framework  
- **React Router** – Client-side routing  
- **Axios/Fetch** – API communication  
- **Tailwind CSS** – Styling  
- **Lucide-react** – Icons  
- **JWT (via backend)** – Authentication

## Features
- **Authentication**: Login & register with secure JWT-based sessions (via http cookies).
- **Project Management**: Create, view, edit, delete, and manage tasks within project.
- **Task Management**: Add, update, delete, and track tasks inside projects.
- **User Dashboard**: Personalized workspace with project history.
- **Modern UI**: Built with Tailwind CSS + reusable components.
- **Filtering & Pagination**: Easy task/project browsing.

## Installation & Setup
> ⚠️ **Important:** For the frontend features to work properly, you must **run the backend server first**.  
> Default backend URL: `http://localhost:5000`

### 1.Clone the repository
> git clone <link>

### 2.Install dependencies
> npm install
- **react-router-dom**: Routing
- **axios**: API requests
- **lucide-react**: Icons
- **tailwindcss**: Styling
- **dnd-kit/core** - Drag-and-drop support
- **dnd-kit/sortable** - Sortable list support
- **dnd-kit/utilities** - Utilities for drag-and-drop

### 3. Configure a .file in the project root
#### Create a **.env** file in the project root:
> VITE_API_URL=http://localhost:5000

### 4. Run Development Server
#### Type this on terminal on frontend repository
> npm run dev



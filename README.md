# Projexlify - Project Management App
> Frontend

#### Overview
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
- **Drag and Drop**: Change status interactively.
- **Modern UI**: Built with Tailwind CSS + reusable components.
- **Filtering & Pagination**: Easy task/project browsing.

## Installation & Setup
> ⚠️ **Important:** For the frontend features to work properly, you must **run the backend server first**.  

> Backend repository: **https://github.com/KarlAngeloFlores/Projexlify-backend.git**

> Default backend URL: `http://localhost:5000`

### 1.Clone the repository
> git clone **https://github.com/KarlAngeloFlores/Projexlify-frontend.git**

### 2.Install dependencies
``` 
npm install
```

### 3. Configure a .file in the project root
#### Create a **.env** file in the project root:
```
VITE_API_URL=http://localhost:5000
```
### 4. Run Development Server
#### Type this on terminal on frontend directory    
```
npm run dev
```

## Incomplete functionalities (other scalable features that can be added with the project)
### Real-time collaboration within a project
Requirements
- Socket.IO – Real-time updates for tasks/projects
- Broadcasting events – Changes made by one user reflected instantly for others

### Advanced Project Sharing & Roles
Requirements
- Modal for giving access
- Dropdown menu for giving access

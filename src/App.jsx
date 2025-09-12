import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/protected/ProtectedRoute';
import ProjectRoute from './components/protected/ProjectRoute';

import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import ForgotPage from './pages/ForgotPage';
import ProjectPage from './pages/ProjectPage';

import Home from './pages/Home';
import TaskTable from './components/TaskTable';
import HistoryPage from './pages/HistoryPage';
import NotFoundPage from './pages/NotFoundPage';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element = {<LandingPage />}/>

          <Route path='/auth' element= {<AuthPage />}/>

          <Route path='/forgot_password' element= {<ForgotPage/>}/>

          <Route path='/home' element={<ProtectedRoute>
            <Home/>
          </ProtectedRoute>}/>

          <Route path='/project/:projectId' element={
            <ProtectedRoute>
              <ProjectRoute>
                <ProjectPage />
              </ProjectRoute>
          </ProtectedRoute>}/>

          <Route path='/history/:projectId' element={
            <ProtectedRoute>
              <ProjectRoute>
                <HistoryPage />
              </ProjectRoute>
            </ProtectedRoute>
          }/>

          <Route path='/tasks' element={<TaskTable />}/>

          {/**Not Found Page */}
          <Route path='*' element={<NotFoundPage />}/>
        </Routes> 
      </Router>
    </>
  )
}

export default App
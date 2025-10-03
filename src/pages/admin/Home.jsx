import { useEffect, useState } from "react"
import Logout from "../../components/Logout";
import authService from "../../services/auth";
import Projects from "./Projects";
import Users from "./Users";
import { Users2, Folder } from "lucide-react";
import projectsService from "../../services/projects";
import LoadingScreen from "../../components/LoadingScreen";
import ErrorPage from "../ErrorPage";
import userService from "../../services/user";

const Home = () => {

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("projects");
  
  const fetchData = async (showLoading = false) => {
    if (showLoading) setLoading(true);

    try {
      const [projectsRes, userRes, usersRes] = await Promise.all([
        projectsService.getAllProjects(),
        userService.getUser(),
        userService.getAllUsers(),
      ]);

      setProjects(projectsRes.data);
      setUser(userRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      setError(err);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const getButtonTabStyle = (tab) =>
    `flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
      activeTab === tab
        ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
        : "border-transparent text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
    }`;

  const getIconTabStyle = (tab) =>
    `w-4 h-4 ${
      activeTab === tab
        ? "text-blue-600 dark:text-blue-400"
        : "text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
    }`;

  useEffect(() => {
    fetchData(true);

    const interval = setInterval(() => {
      fetchData(false);
    }, 60000);

    return () => clearInterval(interval); 
  }, []);

  if(error) {
    return <ErrorPage />
  }

  if(loading) {
    return <LoadingScreen message="Loading..." />
  }


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white">
      {/**Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:py-6 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Admin Page
              </h1>
              <p className="text-gray-400 mt-1">
              </p>
            </div>
            <Logout user={user} />
          </div>
        </div>
      </div>

      {/**Tabs */}
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-2">
  <div className="flex border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/50 backdrop-blur-md rounded-t-lg sm:mx-0 mx-4">
    <button
      className={getButtonTabStyle("projects")}
      onClick={() => setActiveTab("projects")}
    >
      <Folder className={getIconTabStyle("projects")} /> Projects
    </button>

    <button
      className={getButtonTabStyle("users")}
      onClick={() => setActiveTab("users")}
    >
      <Users2 className={getIconTabStyle("users")} /> Users
    </button>
  </div>

      </div>
      {/**tab contents */} 
      <div>
        { activeTab === "projects" && (
          <Projects projects={projects} setProjects={setProjects} />
        ) 
        }

        { activeTab === "users" && (
          <div>
            <Users users={users} setUsers={setUsers}/>
          </div>
        ) 
        }
      </div>
      
      

    </div>
  )
}

export default Home
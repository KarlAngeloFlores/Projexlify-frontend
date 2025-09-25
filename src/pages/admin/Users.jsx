import { Search } from 'lucide-react';
import { useState } from 'react'
import UserTable from '../../components/admin/UserTable';
import userService from '../../services/user';
import DeleteUserModal from '../../components/admin/DeleteUserModal';
import UpdateUserModal from '../../components/admin/UpdateUserModal';

const Users = ({ users, setUsers }) => {

  const [searchTerm, setSearchTerm] = useState("");

  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenDelete = (user) => {
    setSelectedUser(user);
    setOpenDeleteUser(true);
  }

  //deletes permanently
  const handleDeleteUser = async (id) => {
    try {
      
      await userService.deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id))

    } catch (error) {
      throw error;
    }
  }

  const handleOpenUpdate = async (user) => {
      setSelectedUser(user);
      setOpenUpdateUser(true);
  }

  const handleUpdateUser = async (id, username) => {
    try {

        const result = await userService.updateUsername(id, username);
        const updatedUser = result.data;

        setUsers((prev) => 
          prev.map((user) => user.id === id ? { ...user, ...updatedUser } : user
          )
        );
      
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const filteredUsers = users.filter((user) => {
    const email = user.email || ""
    const username = user.username || "";
    
    const matchesSearch = email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    username.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>

      {/*Filters and search */}
      <div className='flex flex-col sm:flex-row gap-3 sm:gap-2 w-full sm:w-auto mb-6'>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
          />
        </div>

      </div>

      <div>
        <UserTable users={filteredUsers} handleOpenDelete={handleOpenDelete} handleOpenUpdate={handleOpenUpdate}/>
      </div>
        

        <DeleteUserModal 
        user={selectedUser}
        isOpen={openDeleteUser}
        onClose={() => setOpenDeleteUser(false)}
        onDeleteUser={handleDeleteUser}
        />

        <UpdateUserModal 
        user={selectedUser}
        isOpen={openUpdateUser}
        onClose={() => setOpenUpdateUser(false)}
        onUpdateUser={handleUpdateUser}
        />

    </div>
  )
}

export default Users
import api from "./api";

const userService = {
    getUser: async () => {
        try {

            const { data } = await api.get('/auth/get_member');
            return data;
            
        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg);
        }
    },

    getAllUsers: async () => {
        try {
            
            const { data } = await api.get('/admin/users');
            return data;

        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg);
        }
    },

    deleteUser: async (id) => {
    try {
        const { data } = await api.delete(`/admin/user`, {
        params: { id } 
        });
        return data;
    } catch (error) {
        const msg = error.response?.data?.message || error.message;
        throw new Error(msg);
    }
    },

    updateUsername: async (id, username) => {
        try {
            
            const { data } = await api.patch('/admin/user', {
                id, username
            });

            return data;

        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg);
        }
    }

}

export default userService;
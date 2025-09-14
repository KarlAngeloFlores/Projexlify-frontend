import api from "./api";

const tasksService = {
    getAllTasks: async (projectId) => {
        try {

        const { data } = await api.get('/project/get_all_task', {
            params: {
                projectId
            }
        });

        return data;

        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg);
        }
    },

    createTask: async (projectId, name, status, contents) => {
        try {
            
            const { data } = await api.post('/project/create_task', {
                projectId, name, status, contents
            });

            return data;

        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg);
        }
    },

    updateTask: async (projectId, taskId, name, contents, newStatus, remark) => {
        try {
            
            const { data } = await api.patch('/project/patch_task', {
                projectId, taskId, name, contents, newStatus, remark
            });

            return data;

        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg);
        }
    },

    deleteTask: async (taskId, projectId, remark) => {
        try {
            
            const { data } = await api.delete('/project/delete_task', {
                data: {
                    projectId, remark, taskId
                }
            });

            return data;

        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg);
        }
    },

    syncPositionStatus: async (tasks, taskId, newStatus, projectId) => {
        try {
            const { data } = await api.patch('/project/update_reorder', { tasks, taskId, newStatus, projectId });
            return data;
            
        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg);
        }
    }

    
};

export default tasksService;
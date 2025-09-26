import api from "./api";

const projectsService = {
    getAllProjectsByUser: async () => {
        try {
            
            const { data } = await api.get('/project/get_all_project');
            return data;

        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg);
        }
    },

    getProject: async (projectId) => {
        
        const { data } = await api.get('/project/get_project', {
            params: { projectId }
        });

        return data;

    },

    createProject: async (name, description) => {
        try {
            
            const { data } = await api.post('/project/create_project', { name, description });
            return data;

        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg);
        }
    },

    updateProject: async (projectId, name, description, newStatus, remark) => {
        try {
            
            const { data } = await api.patch('/project/patch_project', { 
                projectId, 
                name,
                description,
                newStatus, 
                remark
             });

             return data;

        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg);
        }
    },

    deleteProject: async (projectId, remark) => {
        try {
            
            const { data } = await api.delete('/project/delete_project', {
                data: {
                    projectId, remark
                }
            });

            return data;

        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg);
        }
    },

    getAllProjects: async () => {
        try {
            
            const { data } = await api.get('/admin/get_all_projects');
            return data;

        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg);
        }
    },
    
    hardDeleteProject: async (id) => {
        try {
            
            const { data } = await api.delete('/admin/delete_project', {
                params: { id } 
            });
            return data;

        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg);
        }
    },

    restoreProject: async (id) => {
        try {

            const { data } = await api.patch('/admin/restore_project', { 
                id
             });
            return data;
            
        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg);
        }
    }
}


export default projectsService;
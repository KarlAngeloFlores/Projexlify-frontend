import api from "./api";

const logService = {
    getTaskHistory: async (projectId) => {
        try {

            const { data } = await api.get('/log/get_tasks_log', {
                params: {
                    projectId
                }
            });

            return data;
            
        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg);
        }
    }
}

export default logService;
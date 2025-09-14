import api from "./api";

const authService = {
    
    register: async (username, email) => {
        try {
            const { data } = await api.post('/auth/register', { username, email });
            return data;
        } catch (error) {
            // Axios error response
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg);
        }
    },

    registerAndVerify: async (token, password, code) => {
        try {
            
            const { data } = await api.post('/auth/verify', { token, password, code });
            return data;

        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg);
        }
    },
    
    login: async (email, password) => {
        try {
            
            const { data } = await api.post('/auth/login', { email, password });
            return data;

        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg);
        }
    },

    verify: async () => {
        try {

            const { data } = await api.get('/auth/me');
            return data;
            
        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg);
        }
    },

    checkAccess: async (projectId) => {
        
        try {    
            const { data } = await api.get('/project/get_project', {
                params: { projectId }
            });

            return data;

        } catch (error) {
            throw error;
        }

    },

    getMember: async () => {
        try {
            
            const { data } = await api.get('/auth/get_member');
            return data;

        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg);
        }
    },

    forgotPassword: async (email) => {
        try {

            const { data } = await api.post('/auth/forgot_password', { email });
            return data;
            
        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg); 
        }
    },  

    verifyResetPassword: async (email, code) => {
        try {
            
            const { data } = await api.post('/auth/verify_reset_password', { email, code });
            return data;

        } catch (error) {
            const msg = error.response?.data.message || error.message;
            throw new Error(msg);
        }  
    },

    confirmPassword: async (email, newPassword, confirmPassword) => {
        try {
            
            const { data } = await api.patch('/auth/confirm_password', { email, newPassword, confirmPassword });
            return data;

        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg); 
        }
    },

    logout: async () => {
        try {
            
            const { data } = await api.post('/auth/logout', {});
            return data;

        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg); 
        }
    },

    resendVerificationCode: async (email, purpose) => {
        try {
            
            const { data } = await api.post('/auth/resend_code', { email, purpose });
            return data

        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg); 
        }
    },

    changePassword: async (oldPassword, newPassword) => {
        try {
            
            const { data } = await api.patch('/auth/change_password', { oldPassword, newPassword });
            return data;

        } catch (error) {
            const msg = error.response?.data?.message || error.message;
            throw new Error(msg); 
        }
    }


}

export default authService;
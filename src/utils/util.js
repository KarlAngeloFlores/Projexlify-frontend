const util = {
    formatDateMDY: (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            data: 'numeric',
            year: 'numeric'
        });
    } 
};

export default util;
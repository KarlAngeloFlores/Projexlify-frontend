const util = {
    formatDateMDY: (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            data: 'numeric',
            year: 'numeric'
        });
    },

    formatDateComplete: (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    }
};


export default util;
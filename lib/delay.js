export const sleep = (ms) => {
    if (process.env.ENABLE_API_DELAY === 'true') {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    
    return Promise.resolve();
};
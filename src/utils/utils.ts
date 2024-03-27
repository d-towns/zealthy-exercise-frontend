export const getEnvironmentApiUrl = () => {
    return process.env.REACT_APP_NODE_ENV === 'development' ? process.env.REACT_APP_API_URL : process.env.REACT_APP_PROD_API_URL
}
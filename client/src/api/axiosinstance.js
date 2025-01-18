import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/',
});

axiosInstance.interceptors.request.use(config => {
    const accesstoken =JSON.parse( sessionStorage.getItem('accessToken'));

    if (accesstoken) {
        config.headers.Authorization = `Bearer ${accesstoken}`;
    }

    return config;
}, (err) => Promise.reject(err));

export default axiosInstance;
import axiosInstance from "@/api/axiosinstance"

export async function registerService(formData){
    const { data}  = await axiosInstance.post('/auth/register', 
        {...formData, 
        role : 'user'
    })

    return data
}

export async function loginService(formData){
    const { data}  = await axiosInstance.post('/auth/login', formData)

    return data
}

export async function checkAuthService(formData){
    const { data}  = await axiosInstance.get('/auth/check-auth')

    return data
}

export async function mediaUploadService(formData, onProgressCallback) {
    const { data } = await axiosInstance.post('/media/upload', formData, {
        onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
                const percentageCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                if (onProgressCallback) {
                    onProgressCallback(percentageCompleted);
                }
            }
        },
    });

    return data;
}


export async function mediaDeleteService(id) {
    const { data } = await axiosInstance.delete(`/media/delete/${id}`);

    return data;
}

export async function fetchAdminCourseListService(){
    const { data } = await axiosInstance.get(`/admin/course/get`);

    return data;
}

export async function addNewCourseService(courseData){
    const { data } = await axiosInstance.post(`/admin/course/add`, courseData);

    return data;
}

export async function fetchAdminCourseDetailsService(id){
    const { data } = await axiosInstance.get(`/admin/course/get/details/${id}`);

    return data;
}

export async function updateCourseByIdService(id, courseData){
    const { data } = await axiosInstance.put(`/admin/course/update/${id}`, courseData);

    return data;
}


export async function mediaBulkUploadService(formData, onProgressCallback) {
    const { data } = await axiosInstance.post('/media/bulk-upload', formData, {
        timeout: 300000, // 5 minutes
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
                const percentageCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                if (onProgressCallback) {
                    onProgressCallback(percentageCompleted);
                }
            }
        },
    });

    return data;
}
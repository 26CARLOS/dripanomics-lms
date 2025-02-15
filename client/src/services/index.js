import axiosInstance from "@/api/axiosinstance"


////auth services
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

export async function forgotPasswordService(email) {
    const { data } = await axiosInstance.post('/auth/forgot-password', { email });
    return data;
}

export async function resetPasswordService(token, newPassword) {
    const { data } = await axiosInstance.post(`/auth/reset-password/${token}`, { 
        password: newPassword 
    });
    return data;
}

export const verifyEmailService = async (token) => {
    const { data } = await axiosInstance.get(`/auth/verify-email/${token}`);
    return data;
};

export const resendVerificationEmailService = async (email) => {
    const { data } = await axiosInstance.post('/auth/resend-verification', { email });
    return data;
};

//// media upload services
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

//// fetch courses services
export async function fetchAllStudentCoursesService(query){
    const { data } = await axiosInstance.get(`/student/course/get?${query}`);

    return data;
}

export async function fetchStudentCourseDetailsService(id){
    const { data } = await axiosInstance.get(`/student/course/get/details/${id}`);

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


////payment services

export async function createPaymentService(data){
    const { data: responseData } = await axiosInstance.post(`/student/order/create`, data);
    return responseData;
}

export async function createCartPaymentService(data){
    const { data: responseData } = await axiosInstance.post(`/student/order/create-cart`, data);
    return responseData;
}

export async function finalizePaymentsService(order_id, paymentId, payerId){
    const { data } = await axiosInstance.post(`/student/order/finalize`, {order_id, paymentId, payerId});

    return data;

}

////purchase info services

export async function fetchStudentPurchasedCoursesService(studentid){
    const { data } = await axiosInstance.get(`/student/my-courses/get/${studentid}`);
    return data;
}

export async function checkCoursePurchaseInfoService(id, studentId){
    const { data } = await axiosInstance.get(`student/course/purchase-info/${id}/${studentId}`);
    return data;
}

////cart services
export async function addToCartService(data) {
    const { data: responseData } = await axiosInstance.post('/student/cart/add', data);
    return responseData;
}

export async function getCartService(userId) {
    const { data } = await axiosInstance.get(`/student/cart/get/${userId}`);
    return data;
}

export async function removeFromCartService(userId, courseId) {
    const { data } = await axiosInstance.delete(`/student/cart/remove/${userId}/${courseId}`);
    return data;
}


////course progress services

export async function getCurrentCourseProgressService(userId, courseId) {
    const { data } = await axiosInstance.get(
      `/student/course-progress/get/${userId}/${courseId}`
    );
  
    return data;
  }
  
  export async function markLectureAsViewedService(userId, courseId, lectureId) {
    const { data } = await axiosInstance.post(
      `/student/course-progress/mark-lecture-viewed`,
      {
        userId,
        courseId,
        lectureId,
      }
    );
  
    return data;
  }
  
  export async function resetCourseProgressService(userId, courseId) {
    const { data } = await axiosInstance.post(
      `/student/course-progress/reset-progress`,
      {
        userId,
        courseId,
      }
    );
  
    return data;
  }

  ////admin search services

  export async function searchUsersService(query) {
    const { data } = await axiosInstance.get(`/admin/users/search?query=${query}`);
    return data;
}

export async function searchCoursesService(query) {
    const { data } = await axiosInstance.get(`/admin/courses/search?query=${query}`);
    return data;
}

export async function getAllUsersService() {
    const { data } = await axiosInstance.get('/admin/users');
    return data;
}

////user management services
export async function deleteUserService(userId) {
    const { data } = await axiosInstance.delete(`/admin/users/delete/${userId}`);
    return data;
}

export async function promoteUserService(userId) {
    console.log('Promoting user with ID:', userId); // Add logging
    try {
        const { data } = await axiosInstance.patch(`/admin/users/promote/${userId}`);
        console.log('Promotion response:', data); // Add logging
        return data;
    } catch (error) {
        console.error('Promotion error:', error); // Add error logging
        throw error;
    }
}
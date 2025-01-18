const cloudinary = require('cloudinary').v2;

//configure
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,      
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadMediaToCloudinary = async (filePath) => {

    try {

        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto',
        })

        return result;
        
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};


const deleteMediaFromCloudinary = async (public_id) => {    
    try {
        await cloudinary.uploader.destroy(public_id);

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

module.exports = {uploadMediaToCloudinary, deleteMediaFromCloudinary}
const express = require('express');
const multer = require('multer');
const {uploadMediaToCloudinary, deleteMediaFromCloudinary} = require('../../helpers/cloudinary');

const router = express.Router();

const upload = multer({
    dest: 'uploads/',
    limits: {
      fileSize: 100 * 1024 * 1024 // 100 MB
    }
  });
router.post('/upload', upload.single('file'), async (req, res) => {

    try {

        const result = await uploadMediaToCloudinary(req.file.path);
        res.status(200).json({
            success: true,
            data: result
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

router.delete('/delete/:id', async(req, res) => {

    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                success: false,
                message: 'Asset ID is required'
            });
        }
        await deleteMediaFromCloudinary(id);
        res.status(200).json({
            success: true,
            message: 'Media deleted successfully from cloudinary',
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
3
router.post('/bulk-upload', upload.array('files', 10), async (req, res) => {

    try {
        const files = req.files;
        const results = await Promise.all(files.map(async (file) => {
            return await uploadMediaToCloudinary(file.path);
        }));
        res.status(200).json({
            success: true,
            data: results,
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
    

module.exports = router;
    
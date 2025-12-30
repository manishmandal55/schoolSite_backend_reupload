import multer from 'multer';
import path from 'path';
import fs from 'fs';

const getFolderName = (req) => {
    const reqPath = req.originalUrl || req.baseUrl || req.path || req.url || '';
    if (reqPath.includes('/notice')) return 'notices';
    if (reqPath.includes('/event')) return 'events';
    if (reqPath.includes('/slider')) return 'sliders';
    if (reqPath.includes('/gallery')) return 'gallery';
    if (reqPath.includes('/result')) return 'results';
    if (reqPath.includes('/blog')) return 'blogs';
    if (reqPath.includes('/achievement')) return 'achievements';
    if (reqPath.includes('/review')) return 'reviews';
    return 'documents';
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderName = getFolderName(req);
        let fileTypeFolder = 'documents';
        if (file.mimetype === 'application/pdf') {
            fileTypeFolder = 'pdfs';
        } else if (file.mimetype.startsWith('image/')) {
            fileTypeFolder = 'images';
        }
        
        
        const uploadPath = `uploads/${folderName}/${fileTypeFolder}`;
        
        
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        
        cb(null, uploadPath + '/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});


const fileFilter = (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG, PNG, GIF images and PDF files are allowed'), false);
    }
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } 
});


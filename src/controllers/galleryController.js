import { promisepool } from "../config/database.js";

export const getAllGallery = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const [countResult] = await promisepool.execute('SELECT COUNT(*) as total FROM gallery');
        const total = countResult[0].total;

        const [gallery] = await promisepool.execute(
            `SELECT g.*, gc.category_name FROM gallery g 
             LEFT JOIN gallery_category gc ON g.category_id = gc.id 
             ORDER BY g.created_at DESC LIMIT ? OFFSET ?`,
            [String(limit), String(offset)]
        );

        res.json({
            status: "success",
            message: "Gallery items fetched successfully",
            data: gallery,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                limit: limit
            }
        });
    } catch (error) {
        next(error);
    }
};

export const getGalleryByCategory = async (req, res, next) => {
    try {
        const category_id = req.params.category_id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const [countResult] = await promisepool.execute(
            'SELECT COUNT(*) as total FROM gallery WHERE category_id = ?',
            [category_id]
        );
        const total = countResult[0].total;

        const [gallery] = await promisepool.execute(
            `SELECT g.*, gc.category_name FROM gallery g 
             LEFT JOIN gallery_category gc ON g.category_id = gc.id 
             WHERE g.category_id = ? 
             ORDER BY g.created_at DESC LIMIT ? OFFSET ?`,
            [category_id, String(limit), String(offset)]
        );

        res.json({
            status: "success",
            message: "Gallery items fetched successfully",
            data: gallery,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                limit: limit
            }
        });
    } catch (error) {
        next(error);
    }
};

export const getGalleryCategories = async (req, res, next) => {
    try {
        const [categories] = await promisepool.execute('SELECT * FROM gallery_category');

        res.json({
            status: "success",
            message: "Gallery categories fetched successfully",
            data: categories
        });
    } catch (error) {
        next(error);
    }
};

export const createGalleryItem = async (req, res, next) => {
    try {
        const category_id = req.body.category_id;
        const caption = req.body.caption;
        const image_url = req.file ? req.file.filename : null;

        const [result] = await promisepool.execute(
            'INSERT INTO gallery (category_id, image_url, caption) VALUES (?, ?, ?)',
            [category_id, image_url, caption]
        );

        res.status(201).json({
            status: "success",
            message: "Gallery item created successfully",
            data: { id: result.insertId }
        });
    } catch (error) {
        next(error);
    }
};

export const deleteGalleryItem = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [result] = await promisepool.execute('DELETE FROM gallery WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Gallery item not found"
            });
        }

        res.json({
            status: "success",
            message: "Gallery item deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

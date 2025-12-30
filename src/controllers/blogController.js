import { promisepool } from "../config/database.js";

export const getAllBlogs = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const [countResult] = await promisepool.execute('SELECT COUNT(*) as total FROM blog');
        const total = countResult[0].total;

        const [blogs] = await promisepool.execute(
            `SELECT b.*, bc.category_name FROM blog b 
             LEFT JOIN blog_category bc ON b.category_id = bc.category_id 
             ORDER BY b.published_date DESC LIMIT ? OFFSET ?`,
            [String(limit), String(offset)]
        );

        res.json({
            status: "success",
            message: "Blogs fetched successfully",
            data: blogs,
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

export const getBlogById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [blogs] = await promisepool.execute(
            `SELECT b.*, bc.category_name FROM blog b 
             LEFT JOIN blog_category bc ON b.category_id = bc.category_id 
             WHERE b.id = ?`,
            [id]
        );

        if (blogs.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Blog not found"
            });
        }

        res.json({
            status: "success",
            message: "Blog fetched successfully",
            data: blogs[0]
        });
    } catch (error) {
        next(error);
    }
};

export const getBlogsByCategory = async (req, res, next) => {
    try {
        const category_id = req.params.category_id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const [countResult] = await promisepool.execute(
            'SELECT COUNT(*) as total FROM blog WHERE category_id = ?',
            [category_id]
        );
        const total = countResult[0].total;

        const [blogs] = await promisepool.execute(
            `SELECT b.*, bc.category_name FROM blog b 
             LEFT JOIN blog_category bc ON b.category_id = bc.category_id 
             WHERE b.category_id = ? 
             ORDER BY b.published_date DESC LIMIT ? OFFSET ?`,
            [category_id, String(limit), String(offset)]
        );

        res.json({
            status: "success",
            message: "Blogs fetched successfully",
            data: blogs,
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

export const getBlogCategories = async (req, res, next) => {
    try {
        const [categories] = await promisepool.execute('SELECT * FROM blog_category');

        res.json({
            status: "success",
            message: "Blog categories fetched successfully",
            data: categories
        });
    } catch (error) {
        next(error);
    }
};

export const createBlog = async (req, res, next) => {
    try {
        const category_id = req.body.category_id;
        const title = req.body.title;
        const description = req.body.description;
        const published_date = req.body.published_date;
        let image_url = null;

        if (req.file) {
            image_url = req.file.filename;
        }

        const [result] = await promisepool.execute(
            'INSERT INTO blog (category_id, title, description, image_url, published_date) VALUES (?, ?, ?, ?, ?)',
            [category_id, title, description, image_url, published_date]
        );

        res.status(201).json({
            status: "success",
            message: "Blog created successfully",
            data: { id: result.insertId }
        });
    } catch (error) {
        next(error);
    }
};

export const updateBlog = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [existing] = await promisepool.execute('SELECT * FROM blog WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Blog not found"
            });
        }

        const old = existing[0];
        const category_id = req.body.category_id !== undefined ? req.body.category_id : old.category_id;
        const title = req.body.title || old.title;
        const description = req.body.description || old.description;
        const published_date = req.body.published_date || old.published_date;
        let image_url = old.image_url;

        if (req.file) {
            image_url = req.file.filename;
        }

        await promisepool.execute(
            'UPDATE blog SET category_id = ?, title = ?, description = ?, image_url = ?, published_date = ? WHERE id = ?',
            [category_id, title, description, image_url, published_date, id]
        );

        res.json({
            status: "success",
            message: "Blog updated successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const deleteBlog = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [result] = await promisepool.execute('DELETE FROM blog WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Blog not found"
            });
        }

        res.json({
            status: "success",
            message: "Blog deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const createBlogCategory = async (req, res, next) => {
    try {
        const category_name = req.body.category_name;
        const description = req.body.description;

        const [result] = await promisepool.execute(
            'INSERT INTO blog_category (category_name, description) VALUES (?, ?)',
            [category_name, description]
        );

        res.status(201).json({
            status: "success",
            message: "Blog category created successfully",
            data: { category_id: result.insertId }
        });
    } catch (error) {
        next(error);
    }
};

export const updateBlogCategory = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [existing] = await promisepool.execute('SELECT * FROM blog_category WHERE category_id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Blog category not found"
            });
        }

        const old = existing[0];
        const category_name = req.body.category_name || old.category_name;
        const description = req.body.description !== undefined ? req.body.description : old.description;

        await promisepool.execute(
            'UPDATE blog_category SET category_name = ?, description = ? WHERE category_id = ?',
            [category_name, description, id]
        );

        res.json({
            status: "success",
            message: "Blog category updated successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const deleteBlogCategory = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [result] = await promisepool.execute('DELETE FROM blog_category WHERE category_id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Blog category not found"
            });
        }

        res.json({
            status: "success",
            message: "Blog category deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

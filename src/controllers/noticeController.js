import { promisepool } from "../config/database.js";

export const getAllNotices = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const [countResult] = await promisepool.execute('SELECT COUNT(*) as total FROM notice');
        const total = countResult[0].total;

        const [notices] = await promisepool.execute(
            `SELECT n.*, nc.category_name FROM notice n 
             LEFT JOIN notice_category nc ON n.category_id = nc.category_id 
             ORDER BY n.notice_date DESC LIMIT ? OFFSET ?`,
            [String(limit), String(offset)]
        );

        res.json({
            status: "success",
            message: "Notices fetched successfully",
            data: notices,
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

export const getNoticeById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [notices] = await promisepool.execute(
            `SELECT n.*, nc.category_name FROM notice n 
             LEFT JOIN notice_category nc ON n.category_id = nc.category_id 
             WHERE n.id = ?`,
            [id]
        );

        if (notices.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Notice not found"
            });
        }

        res.json({
            status: "success",
            message: "Notice fetched successfully",
            data: notices[0]
        });
    } catch (error) {
        next(error);
    }
};

export const getNoticesByCategory = async (req, res, next) => {
    try {
        const category_id = req.params.category_id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const [countResult] = await promisepool.execute(
            'SELECT COUNT(*) as total FROM notice WHERE category_id = ?',
            [category_id]
        );
        const total = countResult[0].total;

        const [notices] = await promisepool.execute(
            `SELECT n.*, nc.category_name FROM notice n 
             LEFT JOIN notice_category nc ON n.category_id = nc.category_id 
             WHERE n.category_id = ? 
             ORDER BY n.notice_date DESC LIMIT ? OFFSET ?`,
            [category_id, String(limit), String(offset)]
        );

        res.json({
            status: "success",
            message: "Notices fetched successfully",
            data: notices,
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

export const getNoticeCategories = async (req, res, next) => {
    try {
        const [categories] = await promisepool.execute('SELECT * FROM notice_category');

        res.json({
            status: "success",
            message: "Notice categories fetched successfully",
            data: categories
        });
    } catch (error) {
        next(error);
    }
};

export const createNotice = async (req, res, next) => {
    try {
        const category_id = req.body.category_id;
        const title = req.body.title;
        const notice_date = req.body.notice_date;
        let attachment_url = null;
        let attachment_type = null;

        if (req.file) {
            attachment_url = req.file.filename;
            attachment_type = req.file.mimetype === 'application/pdf' ? 'pdf' : 'image';
        }

        const [result] = await promisepool.execute(
            'INSERT INTO notice (category_id, title, notice_date, attachment_url, attachment_type) VALUES (?, ?, ?, ?, ?)',
            [category_id, title, notice_date, attachment_url, attachment_type]
        );

        res.status(201).json({
            status: "success",
            message: "Notice created successfully",
            data: { id: result.insertId }
        });
    } catch (error) {
        next(error);
    }
};

export const updateNotice = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [existing] = await promisepool.execute('SELECT * FROM notice WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Notice not found"
            });
        }

        const old = existing[0];
        const category_id = req.body.category_id !== undefined ? req.body.category_id : old.category_id;
        const title = req.body.title || old.title;
        const notice_date = req.body.notice_date || old.notice_date;
        let attachment_url = old.attachment_url;
        let attachment_type = old.attachment_type;

        if (req.file) {
            attachment_url = req.file.filename;
            attachment_type = req.file.mimetype === 'application/pdf' ? 'pdf' : 'image';
        }

        await promisepool.execute(
            'UPDATE notice SET category_id = ?, title = ?, notice_date = ?, attachment_url = ?, attachment_type = ? WHERE id = ?',
            [category_id, title, notice_date, attachment_url, attachment_type, id]
        );

        res.json({
            status: "success",
            message: "Notice updated successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const deleteNotice = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [result] = await promisepool.execute('DELETE FROM notice WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Notice not found"
            });
        }

        res.json({
            status: "success",
            message: "Notice deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const createNoticeCategory = async (req, res, next) => {
    try {
        const category_name = req.body.category_name;
        const description = req.body.description;

        const [result] = await promisepool.execute(
            'INSERT INTO notice_category (category_name, description) VALUES (?, ?)',
            [category_name, description]
        );

        res.status(201).json({
            status: "success",
            message: "Notice category created successfully",
            data: { category_id: result.insertId }
        });
    } catch (error) {
        next(error);
    }
};

export const updateNoticeCategory = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [existing] = await promisepool.execute('SELECT * FROM notice_category WHERE category_id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Notice category not found"
            });
        }

        const old = existing[0];
        const category_name = req.body.category_name || old.category_name;
        const description = req.body.description !== undefined ? req.body.description : old.description;

        await promisepool.execute(
            'UPDATE notice_category SET category_name = ?, description = ? WHERE category_id = ?',
            [category_name, description, id]
        );

        res.json({
            status: "success",
            message: "Notice category updated successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const deleteNoticeCategory = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [result] = await promisepool.execute('DELETE FROM notice_category WHERE category_id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Notice category not found"
            });
        }

        res.json({
            status: "success",
            message: "Notice category deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

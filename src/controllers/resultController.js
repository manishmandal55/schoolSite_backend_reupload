import { promisepool } from "../config/database.js";

export const getAllResults = async (req, res, next) => {
    try {
        const category = req.query.category;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        let countQuery = 'SELECT COUNT(*) as total FROM result';
        let countParams = [];
        if (category) {
            countQuery += ' WHERE category = ?';
            countParams.push(category);
        }
        const [countResult] = await promisepool.execute(countQuery, countParams);
        const total = countResult[0].total;

        let query = 'SELECT * FROM result';
        let params = [];
        if (category) {
            query += ' WHERE category = ?';
            params.push(category);
        }
        query += ` ORDER BY published_date DESC LIMIT ? OFFSET ?`;
        params.push(String(limit), String(offset));

        const [results] = await promisepool.execute(query, params);

        res.json({
            status: "success",
            message: "Results fetched successfully",
            data: results,
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

export const getResultById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [results] = await promisepool.execute('SELECT * FROM result WHERE id = ?', [id]);

        if (results.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Result not found"
            });
        }

        res.json({
            status: "success",
            message: "Result fetched successfully",
            data: results[0]
        });
    } catch (error) {
        next(error);
    }
};

export const createResult = async (req, res, next) => {
    try {
        const title = req.body.title;
        const category = req.body.category;
        const published_date = req.body.published_date;
        const attachment_url = req.file ? req.file.filename : null;
        const attachment_type = req.file ? (req.file.mimetype === 'application/pdf' ? 'pdf' : 'image') : null;

        const [result] = await promisepool.execute(
            'INSERT INTO result (title, category, published_date, attachment_url, attachment_type) VALUES (?, ?, ?, ?, ?)',
            [title, category, published_date, attachment_url, attachment_type]
        );

        res.status(201).json({
            status: "success",
            message: "Result created successfully",
            data: { id: result.insertId }
        });
    } catch (error) {
        next(error);
    }
};

export const updateResult = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [existing] = await promisepool.execute('SELECT * FROM result WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Result not found"
            });
        }

        const old = existing[0];
        const title = req.body.title || old.title;
        const category = req.body.category || old.category;
        const published_date = req.body.published_date || old.published_date;
        let attachment_url = old.attachment_url;
        let attachment_type = old.attachment_type;

        if (req.file) {
            attachment_url = req.file.filename;
            attachment_type = req.file.mimetype === 'application/pdf' ? 'pdf' : 'image';
        }

        await promisepool.execute(
            'UPDATE result SET title = ?, category = ?, published_date = ?, attachment_url = ?, attachment_type = ? WHERE id = ?',
            [title, category, published_date, attachment_url, attachment_type, id]
        );

        res.json({
            status: "success",
            message: "Result updated successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const deleteResult = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [result] = await promisepool.execute('DELETE FROM result WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Result not found"
            });
        }

        res.json({
            status: "success",
            message: "Result deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

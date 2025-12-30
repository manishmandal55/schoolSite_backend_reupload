import { promisepool } from "../config/database.js";
import jwt from 'jsonwebtoken';

export const getAllSliders = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 3;

        const [sliders] = await promisepool.execute(
            `SELECT * FROM home_slider ORDER BY display_order ASC LIMIT ?`,
            [String(limit)]
        );

        res.json({
            status: "success",
            message: "Sliders fetched successfully",
            data: sliders
        });
    } catch (error) {
        next(error);
    }
};

export const getSliderById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [sliders] = await promisepool.execute('SELECT * FROM home_slider WHERE id = ?', [id]);

        if (sliders.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Slider not found"
            });
        }

        res.json({
            status: "success",
            message: "Slider fetched successfully",
            data: sliders[0]
        });
    } catch (error) {
        next(error);
    }
};

export const createSlider = async (req, res, next) => {
    try {
        const title = req.body.title;
        const image_url = req.file ? req.file.filename : req.body.image_url;
        const display_order = req.body.display_order;

        let order = display_order;
        if (!order) {
            const [max] = await promisepool.execute(
                'SELECT COALESCE(MAX(display_order), 0) + 1 as next_order FROM home_slider'
            );
            order = max[0].next_order;
        }

        const [result] = await promisepool.execute(
            'INSERT INTO home_slider (title, image_url, display_order) VALUES (?, ?, ?)',
            [title, image_url, order]
        );

        res.status(201).json({
            status: "success",
            message: "Slider created successfully",
            data: { id: result.insertId }
        });
    } catch (error) {
        next(error);
    }
};

export const updateSlider = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [existing] = await promisepool.execute('SELECT * FROM home_slider WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Slider not found"
            });
        }

        const old = existing[0];
        const title = req.body.title !== undefined ? req.body.title : old.title;
        const image_url = req.file ? req.file.filename : (req.body.image_url !== undefined ? req.body.image_url : old.image_url);
        const display_order = req.body.display_order !== undefined ? req.body.display_order : old.display_order;

        await promisepool.execute(
            'UPDATE home_slider SET title = ?, image_url = ?, display_order = ? WHERE id = ?',
            [title, image_url, display_order, id]
        );

        res.json({
            status: "success",
            message: "Slider updated successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const deleteSlider = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [result] = await promisepool.execute('DELETE FROM home_slider WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Slider not found"
            });
        }

        res.json({
            status: "success",
            message: "Slider deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const getAllFAQs = async (req, res, next) => {
    try {
        const [faqs] = await promisepool.execute('SELECT * FROM faqs ORDER BY display_order ASC');

        res.json({
            status: "success",
            message: "FAQs fetched successfully",
            data: faqs
        });
    } catch (error) {
        next(error);
    }
};

export const getFAQById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [faqs] = await promisepool.execute('SELECT * FROM faqs WHERE id = ?', [id]);

        if (faqs.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "FAQ not found"
            });
        }

        res.json({
            status: "success",
            message: "FAQ fetched successfully",
            data: faqs[0]
        });
    } catch (error) {
        next(error);
    }
};

export const createFAQ = async (req, res, next) => {
    try {
        const question = req.body.question;
        const answer = req.body.answer;
        const display_order = req.body.display_order || 0;

        const [result] = await promisepool.execute(
            'INSERT INTO faqs (question, answer, display_order) VALUES (?, ?, ?)',
            [question, answer, display_order]
        );

        res.status(201).json({
            status: "success",
            message: "FAQ created successfully",
            data: { id: result.insertId }
        });
    } catch (error) {
        next(error);
    }
};

export const updateFAQ = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [existing] = await promisepool.execute('SELECT * FROM faqs WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "FAQ not found"
            });
        }

        const old = existing[0];
        const question = req.body.question || old.question;
        const answer = req.body.answer || old.answer;
        const display_order = req.body.display_order !== undefined ? req.body.display_order : old.display_order;

        await promisepool.execute(
            'UPDATE faqs SET question = ?, answer = ?, display_order = ? WHERE id = ?',
            [question, answer, display_order, id]
        );

        res.json({
            status: "success",
            message: "FAQ updated successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const deleteFAQ = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [result] = await promisepool.execute('DELETE FROM faqs WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "FAQ not found"
            });
        }

        res.json({
            status: "success",
            message: "FAQ deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const getAllReviews = async (req, res, next) => {
    try {
        let isAdmin = false;
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                isAdmin = !!decoded.adminId;
            } catch (err) {
                isAdmin = false;
            }
        }

        let reviews;
        if (isAdmin) {
            const status = req.query.status;
            if (status) {
                const [result] = await promisepool.execute(
                    'SELECT * FROM reviews WHERE status = ? ORDER BY created_at DESC',
                    [status]
                );
                reviews = result;
            } else {
                const [result] = await promisepool.execute('SELECT * FROM reviews ORDER BY created_at DESC');
                reviews = result;
            }
        } else {
            const [result] = await promisepool.execute(
                'SELECT * FROM reviews WHERE status = ? ORDER BY created_at DESC',
                ['approved']
            );
            reviews = result;
        }

        res.json({
            status: "success",
            message: "Reviews fetched successfully",
            data: reviews
        });
    } catch (error) {
        next(error);
    }
};

export const createReview = async (req, res, next) => {
    try {
        const name = req.body.name;
        const position = req.body.position || null;
        const review_text = req.body.review_text;
        const image = req.file ? req.file.filename : null;

        const [result] = await promisepool.execute(
            'INSERT INTO reviews (name, position, review_text, status, image) VALUES (?, ?, ?, ?, ?)',
            [name, position, review_text, 'pending', image]
        );

        res.status(201).json({
            status: "success",
            message: "Review submitted successfully",
            data: { id: result.insertId }
        });
    } catch (error) {
        next(error);
    }
};

export const updateReview = async (req, res, next) => {
    try {
        const id = req.params.id;
        const status = req.body.status;

        const [existing] = await promisepool.execute('SELECT * FROM reviews WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Review not found"
            });
        }

        if (status) {
            await promisepool.execute('UPDATE reviews SET status = ? WHERE id = ?', [status, id]);
        }

        res.json({
            status: "success",
            message: "Review updated successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const deleteReview = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [result] = await promisepool.execute('DELETE FROM reviews WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Review not found"
            });
        }

        res.json({
            status: "success",
            message: "Review deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

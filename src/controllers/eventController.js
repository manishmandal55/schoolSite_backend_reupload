import { promisepool } from "../config/database.js";

export const getAllEvents = async (req, res, next) => {
    try {
        const category = req.query.category;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        let countQuery = 'SELECT COUNT(*) as total FROM event';
        let countParams = [];
        if (category) {
            countQuery += ' WHERE category = ?';
            countParams.push(category);
        }
        const [countResult] = await promisepool.execute(countQuery, countParams);
        const total = countResult[0].total;

        let query = 'SELECT * FROM event';
        let params = [];
        if (category) {
            query += ' WHERE category = ?';
            params.push(category);
        }
        query += ` ORDER BY event_date DESC LIMIT ? OFFSET ?`;
        params.push(String(limit), String(offset));

        const [events] = await promisepool.execute(query, params);

        res.json({
            status: "success",
            message: "Events fetched successfully",
            data: events,
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

export const getEventById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [events] = await promisepool.execute('SELECT * FROM event WHERE id = ?', [id]);

        if (events.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Event not found"
            });
        }

        res.json({
            status: "success",
            message: "Event fetched successfully",
            data: events[0]
        });
    } catch (error) {
        next(error);
    }
};

export const createEvent = async (req, res, next) => {
    try {
        const category = req.body.category;
        const title = req.body.title;
        const description = req.body.description;
        const event_date = req.body.event_date;
        let pdf_url = req.body.pdf_url || null;

        if (req.file) {
            pdf_url = req.file.filename;
        }

        const [result] = await promisepool.execute(
            'INSERT INTO event (category, title, description, event_date, pdf_url) VALUES (?, ?, ?, ?, ?)',
            [category, title, description, event_date, pdf_url]
        );

        res.status(201).json({
            status: "success",
            message: "Event created successfully",
            data: { id: result.insertId }
        });
    } catch (error) {
        next(error);
    }
};

export const updateEvent = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [existing] = await promisepool.execute('SELECT * FROM event WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Event not found"
            });
        }

        const old = existing[0];
        const category = req.body.category || old.category;
        const title = req.body.title || old.title;
        const description = req.body.description !== undefined ? req.body.description : old.description;
        const event_date = req.body.event_date || old.event_date;
        let pdf_url = old.pdf_url;
        if (req.file) {
            pdf_url = req.file.filename;
        } else if (req.body.pdf_url !== undefined) {
            pdf_url = req.body.pdf_url;
        }

        await promisepool.execute(
            'UPDATE event SET category = ?, title = ?, description = ?, event_date = ?, pdf_url = ? WHERE id = ?',
            [category, title, description, event_date, pdf_url, id]
        );

        res.json({
            status: "success",
            message: "Event updated successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const deleteEvent = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [result] = await promisepool.execute('DELETE FROM event WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Event not found"
            });
        }

        res.json({
            status: "success",
            message: "Event deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

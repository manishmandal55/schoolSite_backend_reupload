import { promisepool } from "../config/database.js";

export const getAllVacancies = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const status = req.query.status;
        const offset = (page - 1) * limit;

        let countQuery = 'SELECT COUNT(*) as total FROM vacancy';
        let countParams = [];
        if (status) {
            countQuery += ' WHERE status = ?';
            countParams.push(status);
        }
        const [countResult] = await promisepool.execute(countQuery, countParams);
        const total = countResult[0].total;

        let query = `SELECT v.*, vc.category_name FROM vacancy v 
                     LEFT JOIN vacancy_category vc ON v.category_id = vc.category_id`;
        let params = [];
        if (status) {
            query += ' WHERE v.status = ?';
            params.push(status);
        }
        query += ` ORDER BY v.posted_date DESC LIMIT ? OFFSET ?`;
        params.push(String(limit), String(offset));

        const [vacancies] = await promisepool.execute(query, params);

        res.json({
            status: "success",
            message: "Vacancies fetched successfully",
            data: vacancies,
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

export const getVacancyById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [vacancies] = await promisepool.execute(
            `SELECT v.*, vc.category_name FROM vacancy v 
             LEFT JOIN vacancy_category vc ON v.category_id = vc.category_id 
             WHERE v.id = ?`,
            [id]
        );

        if (vacancies.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Vacancy not found"
            });
        }

        res.json({
            status: "success",
            message: "Vacancy fetched successfully",
            data: vacancies[0]
        });
    } catch (error) {
        next(error);
    }
};

export const getVacanciesByCategory = async (req, res, next) => {
    try {
        const category_id = req.params.category_id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const [countResult] = await promisepool.execute(
            'SELECT COUNT(*) as total FROM vacancy WHERE category_id = ?',
            [category_id]
        );
        const total = countResult[0].total;

        const [vacancies] = await promisepool.execute(
            `SELECT v.*, vc.category_name FROM vacancy v 
             LEFT JOIN vacancy_category vc ON v.category_id = vc.category_id 
             WHERE v.category_id = ? 
             ORDER BY v.posted_date DESC LIMIT ? OFFSET ?`,
            [category_id, String(limit), String(offset)]
        );

        res.json({
            status: "success",
            message: "Vacancies fetched successfully",
            data: vacancies,
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

export const getVacancyCategories = async (req, res, next) => {
    try {
        const [categories] = await promisepool.execute('SELECT * FROM vacancy_category');

        res.json({
            status: "success",
            message: "Categories fetched successfully",
            data: categories
        });
    } catch (error) {
        next(error);
    }
};

export const createVacancy = async (req, res, next) => {
    try {
        const category_id = req.body.category_id;
        const title = req.body.title;
        const description = req.body.description;
        const application_deadline = req.body.application_deadline;
        const posted_date = req.body.posted_date;
        const status = req.body.status || 'open';

        const [result] = await promisepool.execute(
            'INSERT INTO vacancy (category_id, title, description, application_deadline, posted_date, status) VALUES (?, ?, ?, ?, ?, ?)',
            [category_id, title, description, application_deadline, posted_date, status]
        );

        res.status(201).json({
            status: "success",
            message: "Vacancy created successfully",
            data: { id: result.insertId }
        });
    } catch (error) {
        next(error);
    }
};

export const updateVacancy = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [existing] = await promisepool.execute('SELECT * FROM vacancy WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Vacancy not found"
            });
        }

        const old = existing[0];
        const category_id = req.body.category_id !== undefined ? req.body.category_id : old.category_id;
        const title = req.body.title || old.title;
        const description = req.body.description || old.description;
        const application_deadline = req.body.application_deadline !== undefined ? req.body.application_deadline : old.application_deadline;
        const posted_date = req.body.posted_date || old.posted_date;
        const status = req.body.status || old.status;

        await promisepool.execute(
            'UPDATE vacancy SET category_id = ?, title = ?, description = ?, application_deadline = ?, posted_date = ?, status = ? WHERE id = ?',
            [category_id, title, description, application_deadline, posted_date, status, id]
        );

        res.json({
            status: "success",
            message: "Vacancy updated successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const deleteVacancy = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [result] = await promisepool.execute('DELETE FROM vacancy WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Vacancy not found"
            });
        }

        res.json({
            status: "success",
            message: "Vacancy deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

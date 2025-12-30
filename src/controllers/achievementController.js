import { promisepool } from "../config/database.js";

export const getAllAchievements = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const [countResult] = await promisepool.execute('SELECT COUNT(*) as total FROM achievement');
        const total = countResult[0].total;

        const [achievements] = await promisepool.execute(
            'SELECT * FROM achievement ORDER BY achievement_date DESC LIMIT ? OFFSET ?',
            [String(limit), String(offset)]
        );

        res.json({
            status: "success",
            message: "Achievements fetched successfully",
            data: achievements,
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

export const getAchievementById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [achievements] = await promisepool.execute(
            'SELECT * FROM achievement WHERE id = ?',
            [id]
        );

        if (achievements.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Achievement not found"
            });
        }

        res.json({
            status: "success",
            message: "Achievement fetched successfully",
            data: achievements[0]
        });
    } catch (error) {
        next(error);
    }
};

export const createAchievement = async (req, res, next) => {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const achievement_date = req.body.achievement_date;
        let image_urls = null;

        if (req.files && req.files.length > 0) {
            image_urls = req.files.map(file => file.filename).join(',');
        }

        const [result] = await promisepool.execute(
            'INSERT INTO achievement (title, description, achievement_date, image_urls) VALUES (?, ?, ?, ?)',
            [title, description, achievement_date, image_urls]
        );

        res.status(201).json({
            status: "success",
            message: "Achievement created successfully",
            data: { id: result.insertId }
        });
    } catch (error) {
        next(error);
    }
};

export const updateAchievement = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [existing] = await promisepool.execute('SELECT * FROM achievement WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Achievement not found"
            });
        }

        const old = existing[0];
        const title = req.body.title || old.title;
        const description = req.body.description !== undefined ? req.body.description : old.description;
        const achievement_date = req.body.achievement_date || old.achievement_date;
        let image_urls = old.image_urls;

        if (req.files && req.files.length > 0) {
            image_urls = req.files.map(file => file.filename).join(',');
        }

        await promisepool.execute(
            'UPDATE achievement SET title = ?, description = ?, achievement_date = ?, image_urls = ? WHERE id = ?',
            [title, description, achievement_date, image_urls, id]
        );

        res.json({
            status: "success",
            message: "Achievement updated successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const deleteAchievement = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [result] = await promisepool.execute('DELETE FROM achievement WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Achievement not found"
            });
        }

        res.json({
            status: "success",
            message: "Achievement deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};


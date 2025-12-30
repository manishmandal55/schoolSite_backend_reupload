import { promisepool } from "../config/database.js";

export const getAllTeam = async (req, res, next) => {
    try {
        const role = req.query.role;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        let countQuery = 'SELECT COUNT(*) as total FROM team';
        let countParams = [];
        if (role) {
            countQuery += ' WHERE role = ?';
            countParams.push(role);
        }
        const [countResult] = await promisepool.execute(countQuery, countParams);
        const total = countResult[0].total;

        let query = 'SELECT * FROM team';
        let params = [];
        if (role) {
            query += ' WHERE role = ?';
            params.push(role);
        }
        query += ` ORDER BY name ASC LIMIT ? OFFSET ?`;
        params.push(String(limit), String(offset));

        const [team] = await promisepool.execute(query, params);

        res.json({
            status: "success",
            message: "Team members fetched successfully",
            data: team,
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

export const getTeamById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [members] = await promisepool.execute('SELECT * FROM team WHERE id = ?', [id]);

        if (members.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Team member not found"
            });
        }

        res.json({
            status: "success",
            message: "Team member fetched successfully",
            data: members[0]
        });
    } catch (error) {
        next(error);
    }
};

export const createTeamMember = async (req, res, next) => {
    try {
        const role = req.body.role;
        const name = req.body.name;
        const email = req.body.email;
        const number = req.body.number;
        const position = req.body.position;
        const description = req.body.description;

        const [result] = await promisepool.execute(
            'INSERT INTO team (role, name, email, number, position, description) VALUES (?, ?, ?, ?, ?, ?)',
            [role, name, email, number, position, description]
        );

        res.status(201).json({
            status: "success",
            message: "Team member created successfully",
            data: { id: result.insertId }
        });
    } catch (error) {
        next(error);
    }
};

export const updateTeamMember = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [existing] = await promisepool.execute('SELECT * FROM team WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Team member not found"
            });
        }

        const old = existing[0];
        const role = req.body.role || old.role;
        const name = req.body.name || old.name;
        const email = req.body.email !== undefined ? req.body.email : old.email;
        const number = req.body.number || old.number;
        const position = req.body.position || old.position;
        const description = req.body.description !== undefined ? req.body.description : old.description;

        await promisepool.execute(
            'UPDATE team SET role = ?, name = ?, email = ?, number = ?, position = ?, description = ? WHERE id = ?',
            [role, name, email, number, position, description, id]
        );

        res.json({
            status: "success",
            message: "Team member updated successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTeamMember = async (req, res, next) => {
    try {
        const id = req.params.id;

        const [result] = await promisepool.execute('DELETE FROM team WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "Team member not found"
            });
        }

        res.json({
            status: "success",
            message: "Team member deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

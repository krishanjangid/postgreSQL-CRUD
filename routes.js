import { Router } from "express";
import db from "./queries.js";


const router = Router();

router.get("/users", async (req, res) => {
     const users = await db.query('SELECT * FROM users ORDER BY id ASC');
     return res.status(200).json(users.rows);
});

router.get("/get/user/:id", async(req, res) => {
    const user = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id])

    if(user.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user.rows);

});

router.post("/create/user", async(req, res) => {
    const user = await db.query('INSERT INTO users (name, email) VALUES ($1, $2)', [req.body.name, req.body.email]);
    return res.status(201).json(user.rows);
});

router.put("/update/user/:id", (req, res) => {
    db.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [req.body.name, req.body.email, req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        return res.status(200).json(result.rows);
    });
});

router.get("/delete/user/:id", (req, res) => {
    db.query('DELETE FROM users WHERE id = $1', [req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        return res.status(200).json(result.rows);
    });
});

export default router;


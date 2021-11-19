import { Request, Response } from 'express';
import pool from '../dbconfig/dbconnector';

class ApiController {

    public async get(req :Request, res :Response) {
        try {
            console.log(req.params.tablename)
            const client = await pool.connect();
            const table = req.params.tablename
            const sql = `SELECT * FROM ${table}`;
            const { rows } = await client.query(sql);
            const todos = rows;
            console.log(todos)
            client.release();
            res.send(todos);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default ApiController;

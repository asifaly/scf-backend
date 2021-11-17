import { Request, Response } from 'express';
import pool from '../dbconfig/dbconnector';

class TodosController {

    public async get(req :Request, res :Response) {
        console.log('called')
        try {
            const client = await pool.connect();
            const sql = 'SELECT * FROM todos';
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

export default TodosController;
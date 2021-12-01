import { Request, Response } from 'express';
import pool from '../config/dbconnector';

class ApiController {

    public async get(req :Request, res :Response) {
        try {
            console.log(req.params.tablename)
            const client = await pool.connect();
            const table = req.params.tablename
            const sql = `SELECT * FROM ${table} ORDER BY id ASC`;
            const { rows } = await client.query(sql);
            const todos = rows;
            console.log(todos)
            client.release();
            res.send(todos);
        } catch (error) {
            res.status(400).send(error);
        }
    }
    
    public async post (req: Request, res: Response) {
        try {
          const table = req.params.tablename
          const client = await pool.connect();
          const { name, city, country_code, base_currency } = req.body;
          const query = `INSERT INTO ${table}(name, city, country_code, base_currency) 
          VALUES('${name}','${city}','${country_code}','${base_currency}') RETURNING *`;
        
          const { rows } = await client.query(query)
          const data = rows
          console.log(data)
          client.release();
          res.status(201).send({
            status: 'Created',
            result: data,
          });
        } catch (error) {
            res.status(400).send(error)
        }
    }

    public async put (req: Request, res: Response) {
        try {
          const table = req.params.tablename
          const id = req.params.recordid
          const client = await pool.connect();
          const select = `SELECT * FROM ${table} WHERE id = ${id}`
           /* eslint no-var: 0 */
          var {rows} = await client.query(select)
          const { name = rows[0].name, city = rows[0].city, country_code = rows[0].country_code, base_currency = rows[0].base_currency } = req.body;
          const updatequery = `UPDATE ${table}
                        SET name='${name}', city = '${city}', country_code = '${country_code}', base_currency = '${base_currency}'
                        WHERE id = ${id}`;
        
          await client.query(updatequery)
           /* eslint no-var: 0 */
          var {rows} = await client.query(select) 
          console.log(rows)
          client.release();
          res.status(201).send({
            status: 'UPDATED',
            result: rows,
          });
        } catch (error) {
            res.status(400).send(error)
        }
    }
}

export default ApiController;

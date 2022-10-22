// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {connection} from "../../utils/db";

export interface SQLResponse {
    rows: string[][]
    columns: string[]

}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<SQLResponse>
) {

    connection.query(
        req.body.sql,
        (err, results, fields) => {
            if (err) {
                res.status(200).json({error: `${err}`})
                return
            }
            if (results.length > 0) {
                const columns = Object.keys(results[0])
                const rows = results.map((row) => Object.values(row))
                res.status(200).json({columns, rows})
            }
            res.status(200).json({columns: [], rows: []})
        }
    );
}
import {Client} from 'pg'


const db = (req, res)=>{
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    })
    
    client.connect()
    const query = req.body.query

    client.query(query)
}

export default db
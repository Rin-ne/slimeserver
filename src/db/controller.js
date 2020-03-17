import {Client} from 'pg'


const db = (req, res)=>{
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
        rejectUnauthorized: true
    })
    
    client.connect()
    const query = "create database slime;"

    client.query(query, (err, row)=>{
       res.send(JSON.stringify(row))
        
    })
    client.end()
    //pusher
}

export default db
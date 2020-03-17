import {Client} from 'pg'


const db = (req, res)=>{
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    })
    
    client.connect()
    const query = "show databases;"

    client.query(query, (err, res)=>{
        if (err) throw err;
        res.send(JSON.stringify(res))
    })
    client.end()
    //pusher
}

export default db
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { Client } from 'pg'
import session from 'express-session'
import chat from './api/chat'

let x = express()

const PORT = process.env.PORT || 3000;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });

x.use(cors())
x.use(bodyParser.json())
x.use(bodyParser.urlencoded({ extended : true}))
x.use(session({ secret : "nodirectaccess" }))

x.all("/", (req, res)=>{
    res.send("Slimechat API V.0.1 Beta --- NO DIRECT ACCESS ALLOWED")
})
x.all("/chat", chat)
x.listen(PORT, ()=>{
    console.log("server started on port" + PORT)
})
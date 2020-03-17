let express = require('express')
let cors = require('cors')
let bodyParser = require('body-parser')
let x = express()
let { Client } = require('pg');

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

x.all("/", (req, res)=>{
    res.send("Slimechat API V.0.1 Beta --- NO DIRECT ACCESS ALLOWED")
})

x.listen(PORT, ()=>{
    console.log("server started on port" + PORT)
})
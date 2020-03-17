import { Client } from 'pg'

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  
client.connect();
const login = (req, res)=>{
    if(req.session.login){
        res.send("OK")
    }else{
        if(req.body.userid){
            
        }else{
            res.send("NOT OK")
        }
    }
}

export default login
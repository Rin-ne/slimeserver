let express = require('express')
let cors = require('cors')
let x = express()
const PORT = process.env.PORT || 3000;

x.use(cors())

x.all("/", (req, res)=>{
    res.send("Slimechat API V.0.1 Beta --- NO DIRECT ACCESS ALLOWED")
})

x.listen(PORT, ()=>{
    console.log("server started on port" + PORT)
})
let express = require('express')
let cors = require('cors')
let x = express()
x.use(cors())

x.all("/", (req, res)=>{
    res.send("Slimechat API V.0.1 Beta --- NO DIRECT ACCESS ALLOWED")
})

x.listen(80)
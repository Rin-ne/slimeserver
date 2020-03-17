import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { Client } from 'pg'
import session from 'express-session'

const chat = (req, res)=>{
    if(req.session.login){
        if(req.body.msg){
            res.send("impossible")
        }
        else{
            res.send("impossible")
        }
    }else{
        res.send(`
            <script>
                window.location.href = "https://slimeserver.herokuapp.com/login"
            </script>
        `)
    }
}

export default chat
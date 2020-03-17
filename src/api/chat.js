
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
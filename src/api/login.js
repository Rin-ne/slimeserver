import sql from "../db/config"

const users = (req, res) => {
  if (req.query.phone) {
    const phone = req.query.phone
    sql.serialize(()=>{
      sql.get("SELECT * FROM api_users WHERE phoneNumber='"+phone+"'", (err, row)=>{
        if(err || !row){
          res.send("")
        }else{
          res.send(JSON.stringify(row))
        }
      });
    })
  }else{
    res.send("GET QUERY NOT FOUND")
  }
}

const usersPost = (req, res) => {

}
export default users
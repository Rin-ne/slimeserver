import sql from "../db/config.js"
import fs from "fs"

const usersPost = (req, res) => {
  const nomor = req.body.nomor
  const avatar = req.body.avatar
  const frontName = req.body.frontName
  const status = req.body.status
  fs.writeFile(__dirname+"/../../img/"+nomor+".png", avatar, {encoding: "base64"}, function(err) {
    console.log("File created")
  })
  console.log(nomor)
  const query = "INSERT INTO api_users(phoneNumber, name, avatar, status) VALUES('"+nomor+"', '"+frontName+"', '"+__dirname+"/../../img/"+nomor+".png"+"', '"+status+"')"
  console.log(query)
  sql.run(query, (err)=>{
    if(err) throw err
    else{
      res.send("User Created")
    }
  })
}

export default usersPost

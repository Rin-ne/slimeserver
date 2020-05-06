import sql from "../db/config.js"
import fs from "fs"

const usersPost = (req, res) => {
  const nomor = req.body.nomor
  const avatar = req.body.avatar
  const frontName = req.body.frontName
  const status = req.body.status
  console.log(avatar)
  fs.writeFile(__dirname+"/../../img/"+frontName+".png", avatar, {encoding: "base64"}, function(err) {
    console.log("File created")
  })
  fs.writeFile(__dirname+"/../../img/"+frontName+".txt", avatar, ()=>{
    
  })
  console.log(nomor)
  const query = "INSERT INTO api_users(phoneNumber, name, avatar, status) VALUES('"+nomor+"', '"+frontName+"', '"+__dirname+"/../../img/"+frontName+".png"+"', '"+status+"')"
  console.log(query)
  sql.run(query, (err)=>{
    if(err) throw err
    res.send("User Created")
  })
}

export default usersPost

import sql from "../db/config.js"

const usersPost = (req, res) => {
  const nomor = req.body.nomor
  const avatar = req.body.avatar
  const frontName = req.body.frontName
  const status = req.body.status
  console.log(nomor)
  const query = "INSERT INTO api_users(phoneNumber, name, avatar, status) VALUES('"+nomor+"', '"+frontName+"', '"+avatar+"', '"+status+"')"
  console.log(query)
  sql.serialize(()=>{
    sql.run(query, (err)=>{
      
    })
  })
}

export default usersPost

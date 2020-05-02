import sql from '../db/config'

export default function checkUser(req, res) {
  let data = req.body.data
  data = JSON.parse(data)
  if (!Array.isArray(data)) res.send("404")
  let friends = []
  const test = (data)=>new Promise((res, rej)=>{
    let x = 0
    while(x != data.length){
      let el = data[x]
      try{
        const query = `SELECT * FROM api_users WHERE phoneNumber='${el.number}'`
        sql.get(query, (err, row) => {
          if (row) {
            friends.forEach((le)=>{
              if(row != null && el != null){

                if(row.phoneNumber == le.phoneNumber){
                  row = null
                  el = null
                }
              }
            })
            friends.push({...row, el})
            x++
          }
          if(err) throw err
        })
      }
      catch(err){
  
      }
      x++
    }
    setTimeout(()=>res("whatever"), 500)
    
  })
  test(data).then(()=>{
    res.send(JSON.stringify(friends))
  })
  
}
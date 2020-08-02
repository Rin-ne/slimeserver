import sql from '../db/config'
import * as admin from 'firebase-admin'
export default function checkUser(req, res) {
  const db = admin.firestore().collection("users")
  db.get().then((users) => {
    let data = req.body.data
    try {
      data = JSON.parse(data)
    } catch (e) {
    }
    if (!Array.isArray(data)) res.send("404")
    let friends = []
    const $_asw = users.docs.map((user) => {
      return user.data()
    })
    let $ = {}
    $_asw.forEach(($$) => {
      $[$$.phoneNumber] = $$
    })

    let x = 0

    const returna = data.map((dat) => {
      try {

        let ne
        console.log(dat)
        if ($[dat.number] !== undefined) {
          const $$ = $[dat.number]
          ne = {
            id: 0,
            phoneNumber: $$.phoneNumber,
            name: $$.name,
            status: $$.status,
            avatar: ".",
            el: dat
          }
        }
        if (ne !== undefined) {
          return ne
        }
      } catch (e) {
        console.log(e)
      }
    })
    let newreturna = returna.filter(function (element) {
      return element !== undefined;
    });
    
    console.log($)
    console.log(data)
    console.log(newreturna)
    res.status(200).send(JSON.stringify(newreturna))
    // const test = (data)=>new Promise((res, rej)=>{
    //   let x = 0
    //   while(x != data.length){
    //     let el = data[x]
    //     try{
    //       const query = `SELECT * FROM api_users WHERE phoneNumber='${el.number}'`
    //       sql.get(query, (err, row) => {
    //         if (row) {
    //           friends.forEach((le)=>{
    //             if(row != null && el != null){
    //               if(row.phoneNumber == le.phoneNumber){
    //                 row = null
    //                 el = null
    //               }
    //             }
    //           })
    //           friends.push({...row, el})
    //           x++
    //         }
    //         if(err) throw err
    //       })
    //     }
    //     catch(err){

    //     }
    //     x++
    //   }
    //   setTimeout(()=>res("whatever"), 500)

    // })
    // test(data).then(()=>{
    //   friends.push({
    //     id:666,
    //     phoneNumber:"+6667778889990",
    //     name : "Slime Indonesia",
    //     avatar : ".",
    //     status : "Saya Slime",
    //     el : {
    //       name:"Slime Indonesia",
    //       number : "+6667778889990"
    //     }
    //   })
    //   friends.push({
    //     id : 57,
    //     phoneNumber:"+6289517148350",  
    //     name : "Anggita P. Lesmana",
    //     status:"CEO Slime Indonesia",
    //     avatar:".",
    //     el:{
    //       name : "Anggita Lesmana",
    //       number: "+6289517148350",
    //     }
    //   })
    //   res.send(JSON.stringify(friends))

    // })

  })
}
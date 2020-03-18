
// const decrypti = (text, key)=>{
//     const ENCRYPTION_KEY = key
//     let textParts = text.split(':')
//     let iv = Buffer.from(textParts.shift(), 'hex')
//     let encryptedText = Buffer.from(textParts.join(':'), 'hex')
//     let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)
//     let decrypted = decipher.update(encryptedText)
//     decrypted = Buffer.concat([decrypted, decipher.final()])
//     return decrypted.toString()
// }


const login = (req, res)=>{
    // const key = "0PHPMXrZmS9ReV3c05rAZleES0gAhn42"
    // if(req.session.login){
    //     res.send("OK")
    // }
    // else{
    //     if(req.query.userid){
    //         sql.serialize(()=>{
    //             sql.get("SELECT * FROM api_users WHERE username='"+req.query.userid+"'", (err, row)=>{
    //                 if(err) throw err
    //                 if(req.query.password == decrypti(row.password, key)){
    //                     res.send("OK")
    //                 }else{
    //                     res.send("NOT OK")
    //                 }
    //             })
    //         })
    //     }else{
    //         res.send("NOT OK")
    //     }
    // }
}

export default login
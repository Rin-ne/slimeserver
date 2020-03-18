import * as admin from 'firebase-admin';
const serviceAccount = require("./slimechat-3-firebase-adminsdk-c8du0-3edfcc387d.json")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://slimechat-3.firebaseio.com"
  });

const Admin = (req, res)=>{

}

export default Admin
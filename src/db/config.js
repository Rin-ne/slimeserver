import sqlite3 from "sqlite3"

const DB = __dirname + "/../../db/db.sqlite3"
let sql = new sqlite3.Database(DB, sqlite3.OPEN_READWRITE, (err) => {
  if(err) throw err
  console.log("Connected to database")
})

export default sql
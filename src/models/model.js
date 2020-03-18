import sql from "../db/config"

const orm = {
    get : (table, column = "*", where = "id = 0 OR 1 = 1")=>{
        const query = "SELECT "+column+" FROM "+table+" WHERE "+where
        let pass = {
            val : "",
            set : function(val){
                this.val = val
            }
        }
        sql.serialize(()=>{
            sql.all(query, (err, rows)=>{
                if(err) throw err
                pass.set(rows)
            })
        })
        return pass.val
    },
    set : (table, column = "*", where = "id = 0 OR 1 = 1")=>{

    },
    new : (table, value, column = null)=>{
        if(column) column = "(" + column + ")"
        value = "("+value+")"
        const query = "INSERT INTO "+table+column+" VALUES"+value
        sql.serialize(()=>{
            sql.run(query, (err)=>{
                if(err) throw err
            })
        })
    }
}

export default orm
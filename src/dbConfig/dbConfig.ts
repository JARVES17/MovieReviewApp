import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL!)
        const connection= mongoose.connection
        connection.on("connected", () => {
            console.log("connected to db")
        })
        connection.on("error", (err) => {
            console.log("error occured while connecting to db" + err)
            process.exit()
        })
        
    } catch (error:any) {
        console.log("error while Connecting to Db " + error)
        
    }
}
export default connect;
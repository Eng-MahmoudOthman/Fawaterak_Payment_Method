import { Schema , model } from "mongoose";


const schema = new Schema({
   name: String ,
   phone: String ,
   email: String ,
} , { timestamps:true } )


export const paymentModel = model("payment" , schema)

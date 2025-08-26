import { Schema , model } from "mongoose";


const schema = new Schema({
   orderId: String ,
   invoiceUrl: String ,
   status: { 
      type: String, 
      default: "pending" 
   },
   amount: Number ,
   customer: {
      name: String ,
      email: String ,
      phone: String ,
   },
   createdAt: { 
      type: Date , 
      default: Date.now 
   },
} , { timestamps:true } )


export const paymentModel = model("user" , schema)

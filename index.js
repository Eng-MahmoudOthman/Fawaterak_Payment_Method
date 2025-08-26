//! Handle Error External Express => Start the Code :
process.on("uncaughtException" , (error)=>{
   console.log("Error" , error);
})

import express from 'express'
import cors from 'cors'
import env from "dotenv"
import { dbConnection } from './DataBase/dbConnection.js';
import v1_routes from "./src/routes/v1.routes.js"
import bodyParser from 'body-parser';
import { webhookMiddleWre } from './src/modules/fawaterak/fawaterak.controller.js';

env.config() ;

const app = express()
const port = process.env.PORT ||  5000 ;








//& Express Middle Ware :
app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }))
app.use(express.json()) ;

//& Receive Webhook From Paymob :
app.post("/webhook" , webhookMiddleWre)



// & Create Payment Method :
app.use(v1_routes);



//& Specific Function Vercel : 
const startServer = () => {
   try {
      dbConnection() ;
      const server = app.listen(port, () => console.log(`Server is running ....`))
   } catch (err) {
      console.log(err)
   }
}
startServer();







//! Handle Error dbConnection And External Express => End the Code :
process.on("unhandledRejection" , (error)=>{
   console.log("Error" , error);
});




// 🔑 Test Mode Fawaterak :

// Card Number      :   4242 4242 4242 4242
// Expiry Date      :   12/30
// CVV              :   123
// Card Holder Name :   Test User

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

env.config() ;

const app = express()
const port = process.env.PORT ||  5000 ;








//& Express Middle Ware :
app.use(cors());
// app.use(bodyParser.json({ limit: '1mb' }))
app.use(express.json()) ;

// مثال Express Route
app.post("/api/payments/webhook", (req, res) => {
   console.log("📩 Webhook data:", req.body);
   res.sendStatus(200); // لازم ترجع 200 OK
});

// & Create Payment Method :
app.use(v1_routes);

app.get("/success", (req, res) => res.send("✅ Payment Successful"));
app.get("/fail", (req, res) => res.send("❌ Payment Failed"));




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





// Mastercard Approved :
// 5123456789012346
// Test Account
// 12/25
// 123


// URL Server On Vercel :
// https://paymob-method.vercel.app/



// Postman Documentation :
// https://documenter.getpostman.com/view/29733612/2sAYkDLf9v
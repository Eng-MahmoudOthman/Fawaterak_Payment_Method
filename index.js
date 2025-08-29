//! Handle Error External Express => Start the Code :
process.on("uncaughtException" , (error)=>{
   console.log("Error" , error);
})

import express from 'express'
import cors from 'cors'
import env from "dotenv"
import { dbConnection } from './DataBase/dbConnection.js';
import v1_routes from "./src/routes/v1.routes.js"

env.config() ;

const app = express()
const port = process.env.PORT ||  5000 ;








//& Express Middle Ware :
app.use(cors());

// Encoded Server data (Json) :
app.use(express.json()) ;

// Encoded Server data (Form-data , Application/x-www-form-urlencoded) :
app.use(express.urlencoded({ extended: true })); 




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






//Mahmoud Mostafa Test :
// FAWATERK_API_KEY = "09bed1a5e398df815f3540e8f3572bcdc3c7d55e3e7bc2a915"
// PROVIDER_KEY = "FAWATERAK.1986"
// FAWATERK_BASE_URL = "https://staging.fawaterk.com"




// Mahmoud Othman Test :
// FAWATERK_API_KEY = "2f4aa243556e7f2e4af804dcfa05d8695ad997ff2c57545076"
// PROVIDER_KEY = "FAWATERAK.1996"
// FAWATERK_BASE_URL = "https://staging.fawaterk.com"







// Yahia Mohamed Production:
// FAWATERK_API_KEY = "943a1e0fe3e6fdc3ee0f52ac8a3012c663ceee26f7f3651c01"
// PROVIDER_KEY = "FAWATERAK.24473"
// FAWATERK_BASE_URL = "https://app.fawaterk.com"



// Mahmoud Othman Production : Not Valid Payment Method, Please Call Phone Fawaterak 
// FAWATERK_API_KEY = "c55ce1155bb07f469dec48867fd7de8b180523198437111c3a"
// PROVIDER_KEY = "FAWATERAK.24569"
// FAWATERK_BASE_URL = "https://app.fawaterk.com"
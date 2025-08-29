import { Router } from "express";
import { getSuccess , createSession, webhookMiddleWre, paymentFailed, paymentSuccess, getPaymentMethods  } from "../../modules/fawaterak/fawaterak.controller.js"



const router  = Router() ; 

   
      router.route("/")
         .get (getSuccess) 

   //^ Operation Success :
      router.route("/success")
      .get (paymentSuccess) 
      
   //^ Operation Failed :
      router.route("/fail")
         .get (paymentFailed) 


         
      //!=======================================

   //^ Get Payment Method Id :
      router.route("/payment-method")
         .get (getPaymentMethods) 

   //^ Create Session and send payment link to client :
      router.route("/create-session")
         .post (createSession) 

   //^ Receive Order Payment information by WebHook  :
      router.route("/webhook")
         .post (webhookMiddleWre) 
   
export default router ;



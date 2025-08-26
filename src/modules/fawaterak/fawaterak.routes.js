import { Router } from "express";
import { getSuccess , createSession, webhookMiddleWre, paymentFailed, paymentSuccess  } from "../../modules/fawaterak/fawaterak.controller.js"



const router  = Router() ; 

   
      router.route("/")
         .get (getSuccess) 

      router.route("/success")
         .get (paymentSuccess) 

      router.route("/fail")
         .get (paymentFailed) 

      router.route("/create-session")
         .post (createSession) 

      router.route("/webhook")
         .post (webhookMiddleWre) 
   
export default router ;



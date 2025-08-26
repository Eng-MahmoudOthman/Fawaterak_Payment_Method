import { Router } from "express";
import { getSuccess , createSession, webhookMiddleWre  } from "../../modules/fawaterak/fawaterak.controller.js"



const router  = Router() ; 

   
      router.route("/")
         .get (getSuccess) 

      router.route("/success")
         .get (getSuccess) 
         
      router.route("/fail")
         .get (getSuccess) 

      router.route("/create-session")
         .post (createSession) 

      router.route("/webhook")
         .post (webhookMiddleWre) 
   
export default router ;



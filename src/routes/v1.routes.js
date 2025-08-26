
import { Router } from "express" ;
import fawaterakRouter from "../modules/fawaterak/fawaterak.routes.js" ;




const router = Router() ;
   router.use("/api/payments" , fawaterakRouter) ;
export default router ;

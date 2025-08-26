import env from "dotenv"
import axios from 'axios';
import { catchError } from "../../utilities/catchError.js";
import { paymentModel } from "../../../DataBase/models/payment.model.js";
env.config()



const FAWATERK_API_KEY = process.env.FAWATERK_API_KEY ;
const FAWATERK_BASE_URL = process.env.FAWATERK_BASE_URL ;
const BASE_URL = process.env.BASE_URL ;


//& Get All Payments :
   export const getSuccess = catchError(
      async(req , res , next)=>{
         const invoices = await paymentModel.find() ;
         console.log("Successfully Ya Mahmoud Othman");
         res.json({message:"Successfully Ya Mahmoud Othman" , invoices})
      }
   )

//& Create Payment Method :
   export async function getPaymentMethods() {
      try {
         const response = await axios.get(
            " https://staging.fawaterk.com/api/v2/getPaymentmethods",
            {
            headers: {
               Authorization: `Bearer ${FAWATERK_API_KEY}`,
               "Content-Type": "application/json",
            },
            }
         );

         console.log("Payment Method" , response.data);
      } catch (err) {
         console.error(err.response?.data || err.message);
      }
   }


//& Create Session :
   export const createSession = async (req , res , next) => {
      try {
         // const { first_name , last_name , email, phone, 200  , payment_method_id } = req.body;

         const response = await axios.post(`${FAWATERK_BASE_URL}/invoiceInitPay`,
            {
               providerKey: "FAWATERAK.1986",
               customer: { first_name:"Mahmoud" , last_name:"Othman" , email:"mahmoud@gmail.com" , phone:"+201123333434" },
               cartItems: [
                  {
                     name: "Order Payment",
                     price: 200,
                     quantity: 1,
                  },
               ],
               cartTotal: 200 , // مجموع كل المنتجات
               orderDetails:{orderName:143423423 , name:"Mahmoud Othman" , gender:"male" , age:33} , 
               currency: "EGP",
               payment_method_id : 2 ,
               successUrl: `${BASE_URL}/api/payments/success`,
               failUrl: `${BASE_URL}/api/payments/fail` ,
            },
            {
            headers: {
               Authorization: `Bearer ${FAWATERK_API_KEY}`,
               "Content-Type": "application/json",
            },
            }
         );

         const invoice = response.data ;

         // const newPayment = await paymentModel.create({
         //    orderId: invoice.data.invoice_id,
         //    invoiceUrl: invoice.data.url,
         //    amount,
         //    customer: { first_name:"Mahmoud" , last_name:"Othman" , email:"mahmoud@gmail.com" , phone:"01123333434" } ,
         // })

         res.json({ success: true, invoice: invoice.data });
      } catch (error) {
         // console.error(error);
         console.error(error.response?.data || error.message);
         res.status(500).json({ success: false, message: "Error creating invoice" });
      }
   };



//& Receive Webhook From Paymob :
   export const webhookMiddleWre = catchError(
      async(req , res , next)=>{
         try {
            console.log(`💰 Successfully Payment Message`);
            console.log(`💰 ${req.body}`);
            // await paymentModel.findOneAndUpdate(
            //    { orderId: invoice_id },
            //    { status },
            //    { new: true }
            // );

            res.json({message:"💰 Successfully Payment Message"});
         } catch (error) {
            console.error(error.message);
            res.sendStatus(500);
         }
      }
   )




//& Success Payment :
   export const paymentSuccess = catchError(
      async(req , res , next)=>{
         res.send("✅ Payment Successful");
      }
   )


//& Failed Payment 
   export const paymentFailed = catchError(
      async(req , res , next)=>{
         res.send("❌ Payment Failed");
      }
   )

//& Create Online Order :
   export const createOnlineOrder = ()=>{
      console.log("Order Successfully")
   }






// 🏦 بيانات بطاقة فيزا للاختبار

// يمكنك استخدام بطاقة فيزا التالية لاختبار المعاملات الناجحة:
// رقم البطاقة: 4005 5500 0000 0001
// اسم حامل البطاقة: Fawaterak test
// تاريخ الانتهاء: 12/26
// CVV: 100




// Payment Method {
//   status: 'success',
//   vendorSettingsData: { custome_iframe_title: null },
//   data: [
//     {
//       paymentId: 2,
//       name_en: 'Visa-Mastercard',
//       name_ar: 'فيزا -ماستر كارد',
//       redirect: 'true',
//       logo: 'https://staging.fawaterk.com/clients/payment_options/MC_VI_MEpng'
//     },
//     {
//       paymentId: 3,
//       name_en: 'Fawry',
//       name_ar: 'فوري',
//       redirect: 'false',
//       logo: 'https://staging.fawaterk.com/clients/payment_options/fawrypng'
//     },
//     {
//       paymentId: 4,
//       name_en: 'MobileWallets',
//       name_ar: 'المحافظ الالكترونية',
//       redirect: 'false',
//       logo: 'https://staging.fawaterk.com/clients/payment_options/pay5.png'
//     }
//   ]

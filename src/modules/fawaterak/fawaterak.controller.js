import env from "dotenv"
import axios from 'axios';
import { catchError } from "../../utilities/catchError.js";
import { paymentModel } from "../../../DataBase/models/payment.model.js";
env.config()



const FAWATERK_API_KEY = process.env.FAWATERK_API_KEY ;
const PROVIDER_KEY = process.env.PROVIDER_KEY ;
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
   export const getPaymentMethods = catchError(async(req , res , next)=>{
      const  headers =  { Authorization: `Bearer ${FAWATERK_API_KEY}`,"Content-Type": "application/json"} ;
      const {data} = await axios.get("https://staging.fawaterk.com/api/v2/getPaymentmethods",{headers});
      res.json({message:"success" , payment_method :data})
      // console.log("Payment Method" , data);
   }) ;


//& Create Session :
   export const createSession = async (req , res , next) => {
      try {
         const { name , email, phone, amount , gender , age , birthDay , payment_method_id } = req.body;
         const first_name = name.split(" ")[0] + "  " ;
         const last_name = name.split(" ")[1] ;

         const response = await axios.post(`${FAWATERK_BASE_URL}/invoiceInitPay`,
            {
               providerKey: PROVIDER_KEY,
               customer: { first_name , last_name , email , phone},
               cartItems: [
                  {
                     name: "Order Payment",
                     price: amount,
                     quantity: 1,
                  },
               ],
               cartTotal: amount , // مجموع كل المنتجات
               payLoad:{name  , email , phone , gender , age , birthDay} , 
               currency: "EGP",
               payment_method_id ,
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
         res.json({ success: true, invoice: invoice.data });
      } catch (error) {
         // console.error(error);
         console.error(error.response?.data || error.message);
         res.status(500).json({ success: false, message: "Error creating invoice" });
      }
   };



//& Receive Webhook From Fawaterak :
   export const webhookMiddleWre = catchError(
      async(req , res , next)=>{
         try {
            console.log(`💰 Successfully Payment Message`);
            console.log("==================");
            console.log("req.body" ,  req.body)
            console.log("req.body.customerData" ,  req.body.customerData)
            console.log("req.body.pay_load" ,  req.body.pay_load)

            if(req.body.invoice_status === "paid"){
               await createOnlineOrder(req.body) ;
            }

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
   export const createOnlineOrder = async(body)=>{
      const {paidAmount , customerData , hashKey , invoice_id , pay_load , invoice_status } = body ;


      console.log("💰 Order Successfully Created") ;
      console.log("💰 pay_load" , pay_load) ;


      await paymentModel.create({
         orderId: invoice_id ,
         invoiceUrl: hashKey ,
         amount: paidAmount ,
         status: invoice_status ,
         customer: {
            name : pay_load.name ,
            email: pay_load.email ,
            phone: pay_load.phone
         } ,
      });
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











// body {
//   invoice_key: '1ZjTybaYFBmn0kN',
//   invoice_id: '1069672',
//   payment_method: 'Card',
//   invoice_status: 'paid',
//   pay_load: '{"orderName":143423423,"name":"Mahmoud Othman","gender":"male","age":33}',
//   paidAmount: '200',
//   paidCurrency: 'EGP',
//   customerData: {
//     customer_unique_id: '-',
//     customer_first_name: 'Mahmoud',
//     customer_last_name: 'Othman',
//     customer_email: 'mahmoud@gmail.com',
//     customer_phone: '+201123333434'
//   },
//   hashKey: '5fad7d99164da41fbd91eea321b3e607133e20e18a95aefd035057e718380b33',
//   cardDiscountAmount: '0',
//   discountBankCode: '',
//   paymentToken: 'eyJpdiI6ImJFWnZCUkJqbDU0VTFDMXlzazZLblE9PSIsInZhbHVlIjoiaDJiY0RaQTIxZkNhVGV5eCt6dE5JR0UwUUM2YXNSSnBudFN5R09IcE1nQT0iLCJtYWMiOiI0NGU0OTk4ZTI3N2JiMmFjZWUxNTYxNmVmNDI5YTkwZTU0ODE3MzYzZGU1OGE2NDMyM2MwMzhjMmM5ZjhmZWRhIiwidGFnIjoiIn0=',
//   referenceNumber: 'IN-1069672'
// }
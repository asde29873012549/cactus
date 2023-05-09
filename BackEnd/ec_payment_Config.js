import * as dotenv from 'dotenv'
dotenv.config()

export const options = {
	"OperationMode": "Test", //Test or Production
	"MercProfile": {
	  "MerchantID": process.env.REACT_APP_EC_PAY_MERCHANT_ID,
	  "HashKey": process.env.REACT_APP_EC_PAY_HashKey,
	  "HashIV": process.env.REACT_APP_EC_PAY_HashIV
	},
	"IgnorePayment": [
  //    "Credit",
  //    "WebATM",
  //    "ATM",
  //    "CVS",
  //    "BARCODE",
  //    "AndroidPay"
	],
	"IsProjectContractor": false
}
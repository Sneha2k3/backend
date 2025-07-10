// GET /api/esewa/verify?amt=100&oid=ABC123&refId=REF123
const axios = require("axios");
const TransactionLog = require("../models/transactionLogSchema");
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');

const secret = "8gBm/:&EnhH.1/q";
exports.esewaPay = async (req, res) => {
  const { fail,success,amt, oid, refId, productId, userId } = req.query;
  console.log("esewaPay called with:", { amt, oid, refId, productId });
  try {
    const verifyURL = `https://rc-epay.esewa.com.np/api/epay/main/v2/form`;

    const formData = new FormData();
    formData.append("amount", "100");
    formData.append("tax_amount", 0);
    formData.append("total_amount", "100");
    formData.append("product_code", "EPAYTEST");
    formData.append("refId", refId);
    formData.append("productId", "random-shit");
    formData.append("success_url", success);
    formData.append("failure_url", fail);
    formData.append("transaction_uuid", uuidv4());
    formData.append("product_service_charge", 0);
    formData.append("product_delivery_charge", 0);


    const signature = [];
    for (let value of ["total_amount", "transaction_uuid", "product_code"]) {
      signature.push(`${value}=${formData.get(value)}`);
    }

    const hmac = crypto.createHmac('sha256', secret)
      .update(signature.join(','))
      .digest('base64');

    formData.append("signed_field_names", "total_amount,transaction_uuid,product_code");
    formData.append("signature", hmac);

    console.log("signature", hmac);
    await TransactionLog.create({
      user: userId,
      gateway: "esewa",
      amount: amt,
      status: "pending",
      productId: productId,
    });

    const response = await axios.post(verifyURL, formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    );

    console.log("Response from eSewa:", response.request._redirectable._options.href);

    res.status(200).json({
      success: true,
      message: "Payment verification initiated",
      url: response.request._redirectable._options.href,
    });
    // if (response.data.includes("<response_code>Success</response_code>")) {
    //   res.json({ success: true });
    //   await TransactionLog.findOneAndUpdate(
    //     { productId: productId, gateway: "esewa" },
    //     {
    //       status: "success",
    //       refId,
    //       rawResponse:response.data,
    //     }
    //   );      
    // } else {
    //   await TransactionLog.findOneAndUpdate(
    //     { productId: productId, gateway: "esewa" },
    //     {
    //       status: "failed",
    //       refId,
    //       rawResponse: response.data,
    //     }
    //   );
    //   console.log(response.data);
    //   res.status(400).json({ success: false, raw: response.data });
    // }
    //  */
  } catch (err) {
    console.log(err.response?.data);
    res.status(500).json({ error: err.toString() });
  }

}

exports.khaltiPay = async (req, res) => {
  const {fail,success, amount, user } = req.body || {amount : 1000, user : {fullName: "",email: "",phone:""}} ;
  try {
    const response = await axios.post(
      "https://dev.khalti.com/api/v2/epayment/initiate/",
      {
        "return_url": success,
        "website_url": fail,
        "amount": amount,
        "purchase_order_id": "test12",
        "purchase_order_name": "test",
        "customer_info": {
          "name": user?.fullName || "Khalti Bahadur",
          "email": user?.email || "example@gmail.com",
          "phone": user?.phone || "9800000123"
        },

        "merchant_username": "merchant_name",
        "merchant_extra": "merchant_extra"
      },
      {
        headers: {
          Authorization: "key 05bf95cc57244045b8df5fad06748dab",
        },
      }
    );

    const data = response.data;
    console.log(response);
    // await TransactionLog.create({
    //   user: req.user._id,
    //   gateway: "khalti",
    //   amount: data.amount,
    //   status: "success",
    //   productId: data.product_identity || null,
    //   refId: data.idx,
    //   rawResponse: data,
    // });

    res.json({ success: true , response:response.data});
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(400).json({ success: false, error: err?.response?.data });

      }
}



exports.paymentSuccess = async (req,res)=> {
    const { gateway,totalAmount,productId } = req.query; 
    try {
        await TransactionLog.create({
            user: req.user?._id || null,
            gateway: gateway, 
            amount: amount,
            status: "success",
            productId: productId,
            refId: "ref-id-placehodler",
            rawResponse: err?.response?.data || {},
        })
        json.status(201).json( {success: true, message : "Transaction succesfully added"});
    }catch(err) {
        console.log(err);
        json.status(500).json({error : err.data})
    }
}

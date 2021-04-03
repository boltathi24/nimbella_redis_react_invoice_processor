const nim = require('@nimbella/sdk')


async function main(args) {
    response = new Object();
    try {
    let redis = nim.redis()
    var count=await redis.getAsync(args.user+"_total_invoices");
    var invoices=[];
    for(var i=1;i<=count;i++)
    {
        invoices.push(await redis.getAsync(args.user+"_invoice_"+i));
    }
    response.body = {
        message: "Invoices Retrieved Successfully",
        success: true,
        data: invoices,        

      };
      response.statusCode=200;
    }
    catch (e) {
        response.body = {
          message: "Exception has occured while processing",
          exception: e.message,
          success: false,
        }
        response.statusCode=400;
    return  response;
}
}



exports.main = main
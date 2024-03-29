    module.exports = async functions (context, req) {
        context.log('Javascript HTTP trigger function processed a request.');

        const name = (req.query.name || (req.body && req.body.name));
        const responseMessage = name
            ? "Hello," + name + ". This HTTP triggered function executed successfully."
            : "This HTTP triggered function executed successfully. Pass a name in the query string or the request."

        context.res = {
            //status:200, /* Defaults to 200 */
            body: responseMessage
        };
}

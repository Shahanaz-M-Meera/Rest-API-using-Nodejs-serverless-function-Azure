    module.exports = async functions (context, req) {
        context.log('Person HTTP trigger function processed a request.');

        const data = {
            1: 'Harry Styles',
            2: 'Louis Tomlinson',
            3: 'Liam Payne'
        }

        const id = req.query.id;
        const responseMessage = id && data[id]
            ? data[id]
            : "Input a valid ID"

        context.res = {
            //status:200, /* Defaults to 200 */
            body: responseMessage
        };
}

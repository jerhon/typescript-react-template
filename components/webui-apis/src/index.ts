import bodyParser from "body-parser";
import express from "express";
import swaggerMiddleware from "swagger-express-middleware";


const app = express();

swaggerMiddleware('swagger.json', app, function (err, middleware) { 
    
    app.use(middleware.parseRequest());
    app.use(middleware.validateRequest());
    app.use(middleware.files({apiPath: "/swagger/definition"}));

    // TODO: call the model later on...
    app.get('/api/items', (req, res) => {
        res.json([{
            name: 'lorem',
            description: 'this is sample item #1'
        }, 
        {
            name: 'ipsum',
            description: 'this is sample item #2'
        },
        {
            name: 'glarg',
            description: 'this is sample item #3'
        }]);
    });

    // get the current user
    app.get('/api/user/me', (req, res) => {
        res.json({
            username: 'jeremy',
            name: 'jeremy'
        });
    });

    app.listen(3000);

});
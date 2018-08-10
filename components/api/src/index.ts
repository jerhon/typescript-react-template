import bodyParser from "body-parser";
import express from "express";
import path from "path";
import swaggerMiddleware from "swagger-express-middleware";

const app = express();

swaggerMiddleware(path.join(__dirname, "swagger.json"), app, (err, middleware) => {
    app.use(middleware.parseRequest());
    app.use(middleware.validateRequest());
    app.use(middleware.files({ apiPath: "/swagger/definition" }));

    // TODO: call the model later on...
    app.get("/api/items", (req, res) => {
        res.json([{
            description: "this is sample item #1",
            name: "lorem",
        },
        {
            description: "this is sample item #2",
            name: "ipsum",
        },
        {
            description: "this is sample item #3",
            name: "glarg",
        }]);
    });

    // get the current user
    app.get("/api/user/me", (req, res) => {
        res.json({
            email: "jeremy@jeremy.com",
            name: "jeremy",
            username: "jeremy",
        });
    });

    app.listen(3001);
});

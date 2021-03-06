import * as mongoose from 'mongoose';
import {config} from "./config/default";
import * as express from "express";
import * as session from "express-session";
import * as bodyParser from 'body-parser';
import {router} from "./src/router/user";
// 链接数据库
mongoose.connect(config.database.mongodb);
mongoose.connection.on("error", (error) => {
    console.error(error);
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(session(config.session));
app.use("/user", router);

app.listen(8001, function(){
    console.log("listen port 8001");
});

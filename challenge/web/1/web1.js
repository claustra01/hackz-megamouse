var express = require("express");
var app = express();

const FLAG = process.env.FLAG;

app.get("/", (req, res, next) => {
    return res.send('FLAG: <a href="/flag">/flag</a>');
});

const block = (req, res, next) => {
    if (req.path.includes('/flag')) {
        return res.send(403, 'Forbidden');
    }

    next();
}

app.get("/flag", block, (req, res, next) => {
    return res.send(FLAG);
})

var server = app.listen(50000);

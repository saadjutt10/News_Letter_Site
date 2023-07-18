const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');
const { request } = require('http');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/SignUp.html");
});

app.post("/", function (req, res) {
    const fname = req.body.fName;
    const lname = req.body.lName;
    const mail = req.body.email;
    console.log(fname + " " + lname + " " + mail)
    const data = {
        members: [
            {
                email_address: mail,
                status: "subscribed",
                merge_fields: {
                    LNAME: lname,
                    FNAME: fname
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/4e215e34e1"
    const options = {
        method: "POST",
        auth: "saad1 :5facaab37377294e5fcf081ceb4d6cfa-us21"
    };
    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {

            res.sendFile(__dirname + "/success.html");
        }
        else {

            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});

app.post("/failure", function (req, res) {
    res.redirect("/");
})
app.post("/success", function (req, res) {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is up and running");
});

//List ID
// 4e215e34e1.
//API Key
//5facaab37377294e5fcf081ceb4d6cfa-us21
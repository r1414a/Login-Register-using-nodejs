const express = require('express');
const app = express();
const path = require('path');
const pug = require('pug');
const port = 8000;
const Details = require('./model/database');


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



app.get('/', async (req, res) => {
    try {
        //res.sendFile(path.join(__dirname, "public", "form.html"));
        res.render('home')
    } catch (error) {
        console.log(error)
    }
})

app.get('/user-registered-successfully', async(req,res) => {
    try{
            res.send("User Registered Successfully!!!!!!!");
    }catch(error){
        console.log(error);
    }
})

app.get('/userregistration', async(req,res) => {
    try{
            res.render("registration-form");
    }catch(error){
        console.log(error);
    }
})


app.get('/login-page', async(req,res) => {
    try{
            res.render("login-form");
    }catch(error){
        console.log(error);
    }
})


async function checkIfUserPresent(user_pass, req, res) {
    // both username and password should be present
    const present = "Either username password already present in database or you didn't set anything as password and username.";


    const data = await Details.find({ name: user_pass.name, password: user_pass.password });
    if (data.length === 0 && user_pass.name != '' && user_pass.password != '') {
        const save_user_pass = new Details(user_pass);
        save_user_pass.save().then(() => {
            res.render('user-registered-successfully');
        })
    } else {
        res.render('form',{present: present});
        return ;
    }
}




app.post('/userregistration', async (req, res) => {
    try {
        console.log(req.body);
        const user_pass = req.body;
        await checkIfUserPresent(user_pass, req, res);
        await loginUser(user_pass,req,res);
    } catch (error) {
        console.log(error);
    }
})

async function loginUser(user_pass,req,res){
    const data = await Details.find({ name: user_pass.name, password: user_pass.password });
    if (data.length === 0 && user_pass.name != '' && user_pass.password != ''){
        res.send("You need to Register First.")
    // } else if(data.length === 0 && user_pass.name === '' && user_pass.password === '') {
    //     res.send("")
    // }
    }else{
        res.send('login sucessfull');
    }
} 

app.post("/login-page", async (req,res) => {
    try{
        console.log(req.body);
        const user_pass = req.body;
        await loginUser(user_pass,req,res);
    }catch(error){
        console.log(error);
    }
})

app.listen(port, (req, res) => {
    console.log(`server started listing on port ${port}`);
})
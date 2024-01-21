const express = require('express');
const app = express();
const path = require('path');
const pug = require('pug');
const port = 8000;
const Details = require('./model/database');


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//For Serving static files
app.use('/static', express.static('static'));

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

// app.get('/user-registered-successfully', async(req,res) => {
//     try{
//             res.send("User Registered Successfully!!!!!!!");
//     }catch(error){
//         console.log(error);
//     }
// })

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
    const str1 = "{message : User already present in database. Please register with different username}";
    const str2 = "Register"
    const findUser = await Details.find({ name: user_pass.name });
    if (findUser.length === 0) {
        const save_user_pass = new Details(user_pass);
        save_user_pass.save().then(() => {
            res.render('user-registered-successfully');
        })
    } else {
        res.render('error',{msg: str1, page:str2});
        return ;
    }
}




app.post('/userregistration', async (req, res) => {
    try {
        console.log(req.body);
        const user_pass = req.body;
        await checkIfUserPresent(user_pass, req, res);
    } catch (error) {
        console.log(error);
    }
})

async function loginUser(user_pass,req,res){
    const str1 = "{message : It's looks like you are not present in our database.So, please Register First.}";
    const str2 = "{message : Either username or password is incorrect.}";
    const str3 = 'Register';
    const str4 = 'Login';
    const onlyuser = await Details.find({ name: user_pass.name });
    const onlypass = await Details.find({ password: user_pass.password });
    if (onlyuser.length === 0 && onlypass.length === 0){
        res.render('error',{msg:str1,page:str3});
    }else if(onlyuser.length !== 0 && onlypass.length !== 0){
        res.render('user-login-successfully');
    }else{
        res.render('error',{msg:str2,page:str4});
    }
} 

app.post("/login-page", async (req,res) => {
    try{
        const user_pass = req.body;
        await loginUser(user_pass,req,res);
    }catch(error){
        console.log(error);
    }
})

app.listen(port, (req, res) => {
    console.log(`server started listing on port ${port}`);
})
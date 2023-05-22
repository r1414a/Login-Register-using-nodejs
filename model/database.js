
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://r1414a:h4ck3r07@book-directory-cluster0.xfiw54k.mongodb.net/test',
 {useNewUrlParser: true}).then(() =>{
        console.log("Connected to Database.");
 }).catch((error) => {
      console.log(error);
 })

 

const detailSchema = new mongoose.Schema({
    name: String,
    password: String
  });

  const Details = mongoose.model('Details', detailSchema);


module.exports = Details;
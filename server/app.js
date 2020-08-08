const express = require('express');
const app = express();
const port = 5000; // server port
var bodyParser = require('body-parser');
const dbConfig = require("./config/db.config.js");
var  adtbl = require('./models/adtbl')
const adtblModel  = require('./models/adtbl')
app.use(function(req,res, next){
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
})


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

var mysql = require('mysql');

var sqlInfo = {
	  host     : dbConfig.HOST,
      user     : dbConfig.USER,
      password : dbConfig.PASSWORD,
      database : dbConfig.DB,		
};


var con;
function handleDisconnect()
{
	con = mysql.createConnection(sqlInfo);

	con.connect(function(err)
	{
	  if(err){
		console.log('Error connecting to Db');
		console.log(err);
		return;
	  }
	  console.log('Connection established');
	});
	
	con.on('error', function(err) {
		console.log('db error 1', err);
		if(err.code === 'PROTOCOL_CONNECTION_LOST') // Connection to the MySQL server is usually -D9_I6MTa+6uoW6jpa
		{											// lost due to either server restart, or a
		  handleDisconnect();                       // connnection idle timeout (the wait_timeout
		} else {                                    // server variable configures this)
		  console.log('db error 2', err);
		}
	});
}

handleDisconnect();






app.get('/', (req, res) => {
	console.log("test")
    res.send('Hello World, from express');
});

app.get('/fetchAds' , (req, res) => {
	var sortBy = "Price ASC";
con.query('SELECT * FROM adtbls  ORDER BY  '+sortBy+' ', (err, rows) => {
if (!err)
res.send(rows);
else
console.log(err);
})
} );



app.post('/filterAds' , (req, res) => {

console.log(req.body)
var query_string = 'SELECT * FROM adtbls WHERE title LIKE "%'+ req.body.title+'%" ORDER BY  '+req.body.sortBy+'';
console.log(query_string);
con.query(query_string, (err, rows) => {
if (!err)
res.send(rows);
else
console.log(err);
})
} );



app.post('/sortAds' , (req, res) => {

//var sortBy = "Price ASC"
console.log(req.body)

var query_string = 'SELECT * FROM adtbls WHERE title LIKE "%'+ req.body.title+'%" ORDER BY  '+req.body.sortBy+'';
console.log(query_string);
con.query(query_string, (err, rows) => {
if (!err)
res.send(rows);
else
console.log(err);
})
} );




app.post('/postAds' , (req, res) => {

	console.log("req",req.body)

    // const User_City = req.body.User_City;
    // const User_profileimage = req.file.path;
    // const User_level = req.body.User_level;

    // const User_Bank_Name = req.body.User_Bank_Name;
    // const Branch_Code = req.body.Branch_Code;
    // const User_Bank_ACCNum = req.body.User_Bank_ACCNum;
    // const User_Status = req.body.User_Status;
    // const User_Email= req.body.User_Email;//where
    
    adtblModel.create(
        { 

            title:req.body.title,
            image:req.body.image,
            price:req.body.price,
         }).then(result =>{
        res.status(201).json({
            message : "ad row created",
            user:result
        })
    })
    .catch(err => {
       console.log(err)
       res.status(500).json({
           error : err
       })
    });

} );


app.listen(port, () => console.log(`ad listening on port ${port}!`))
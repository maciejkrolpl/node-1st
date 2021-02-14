//  mysql://bb585779422210:8e90195a@us-cdbr-east-03.cleardb.com/heroku_f3768a999b8c5ca?reconnect=true

const cool = require('cool-ascii-faces');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const mysql = require('mysql');


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .get('/stream', (req, res) => res.send(cool.faceStream()))
  .get('/times', (req, res) => res.send(showTimes()))
  .get('/db', (req, res) => res.send(showDB()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
  
showTimes = () => {
  let result = '';
  const times = process.env.TIMES || 5;
  for (i = 0; i < times; i++) {
    result += i + ' ';
  }
  return result;
}

showDB = () => {
  console.log('im in showdb');
  const con = mysql.createConnection({
    host: 'us-cdbr-east-03.cleardb.com',
    user: 'bb585779422210',
    password: '8e90195a',
  });


  con.connect(function(err) {
    if (err) {
      console.error(err);
      return err;
    };
  });

}
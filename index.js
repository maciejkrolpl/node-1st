const cool = require('cool-ascii-faces');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const {Pool} = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .get('/stream', (req, res) => res.send(cool.faceStream()))
  .get('/times', (req, res) => res.send(showTimes()))
  .get('/db', async (req, res)=> {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results' : (result) ? result.rows : null};
      res.render('pages/db', results);
      client.release();
    } catch(error) {
      console.error(error);
      res.send('Error ' + error);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
  
showTimes = () => {
  let result = '';
  const times = process.env.TIMES || 5;
  for (i = 0; i < times; i++) {
    result += i + ' ';
  }
  return result;
}
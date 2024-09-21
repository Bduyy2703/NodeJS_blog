
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars'); // Import đúng cách express-handlebars
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname , 'public')))

// Ghi log http
app.use(morgan('combined'));

// Cấu hình Template engine
app.engine('hbs', engine({
  extname: 'hbs'
})); // Sử dụng hàm 'engine' từ express-handlebars
app.set('view engine', 'hbs');


app.set('views', path.join(__dirname, 'resources/views'));

// Xử lý route
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/news', (req, res) => {
  res.render('news');
});
// Khởi động server
app.listen(port, () => {
  console.log(`Ứng dụng đang lắng nghe tại cổng ${port}`);
});

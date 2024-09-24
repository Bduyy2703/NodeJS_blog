
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars'); // Import đúng cách express-handlebars
const app = express();
const port = 3000;
const route = require('./routes')

app.use(express.static(path.join(__dirname , 'public')))
app.use(express.urlencoded(
  {
    extended : true
  }
))
app.use(express.json())
// Ghi log http
app.use(morgan('combined'));

// Cấu hình Template engine
app.engine('hbs', engine({
  extname: 'hbs'
})); // Sử dụng hàm 'engine' từ express-handlebars
app.set('view engine', 'hbs');


app.set('views', path.join(__dirname, 'resources/views'));

// Xử lý route

route(app);


// Khởi động server
app.listen(port, () => {
  console.log(`Ứng dụng đang lắng nghe tại cổng ${port}`);
});

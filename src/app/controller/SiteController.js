const Course = require('../models/course')
class SiteController {
    // đây là ví dụ base của 1 API sử dụng async / await
    // async index(req, res) {
    //     try {
    //         const courses = await Course.find({}); // Tìm kiếm dữ liệu từ MongoDB
    //         res.json(courses); // Nếu thành công, trả về dữ liệu JSON
    //     } catch (err) {
    //         res.status(400).json({ error: 'ERROR!!!' }); // Nếu lỗi, trả về lỗi
    //     }
    // }
    index(req,res,next){
        // lean để có thể truy cập vào các thuộc tính của hbs không có lean thì không vào được phải cấu hình nhiều ví dụ như sử dung mongoose handle to ọbject
        Course.find({}).lean() 
            .then(courses=>res.render('home',{courses}))
            .catch(next)
    }
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
const Course = require('../models/course')
class MeController {
    // đây là ví dụ base của 1 API sử dụng async / await
    // async index(req, res) {
    //     try {
    //         const courses = await Course.find({}); // Tìm kiếm dữ liệu từ MongoDB
    //         res.json(courses); // Nếu thành công, trả về dữ liệu JSON
    //     } catch (err) {
    //         res.status(400).json({ error: 'ERROR!!!' }); // Nếu lỗi, trả về lỗi
    //     }
    // }
    storedCourses(req, res, next) {
        
        Course.find({}).lean()
            .then(courses => {
                courses = courses.map((course, index) => ({
                    ...course,
                    indexPlusOne: index + 1 // Bắt đầu từ 1
                }));
                res.render('me/stored-Courses', { courses });
            })
            .catch(next);
    }
    trashCourses(req,res,next){
        Course.findWithDeleted({deleted: true}).lean()
        .then(courses => {
            courses = courses.map((course, index) => ({
                ...course,
                indexPlusOne: index + 1 // Bắt đầu từ 1
            }));
            res.render('me/trash-Courses', { courses });
        })
        .catch(next);
    }
}

module.exports = new MeController();
const Course = require('../models/course')
const {mongooseToObject} = require('../../util/mongoose') // khai báo handle data db

class CourseController {
    // đây là ví dụ base của 1 API sử dụng async / await
    // async index(req, res) {
    //     try {
    //         const courses = await Course.find({}); // Tìm kiếm dữ liệu từ MongoDB
    //         res.json(courses); // Nếu thành công, trả về dữ liệu JSON
    //     } catch (err) {
    //         res.status(400).json({ error: 'ERROR!!!' }); // Nếu lỗi, trả về lỗi
    //     }
    // }

    //api
    // async show(req, res) {
    //     try {
    //         const course = await Course.findOne({ slug: req.params.slug });  // Tìm khóa học dựa vào slug
    //         if (!course) {
    //             return res.status(404).send('Course not found');  // Nếu không tìm thấy, trả về 404
    //         }
    //         res.json(course);  // Trả về thông tin khóa học
    //     } catch (err) {
    //         res.status(500).send('Internal Server Error');  // Xử lý lỗi máy chủ
    //     }
    // }
    show(req,res,next){

        Course.findOne({slug: req.params.slug }) // lưu ý khi sử dụng handle mongoose to object thì không xử dụng lean() như ở trang home
        .then(course=>res.render('course',{course:mongooseToObject(course)}))// xử lý truyền dữ liệu từ db ở trong hbs
        .catch(next)
  
    }
    //get
    create(req, res, next) {
        res.render('create');
    }
    //post
    store(req, res, next) {
        try {
            console.log(req.body); // In req.body
            const course = new Course(req.body);
            course.save()
                .then(() => res.redirect('/me/stored/courses')) // Chuyển hướng nếu lưu thành công
                .catch(error => {
                    console.error("Error saving course:", error); // Ghi lỗi vào console
                    res.status(500).send('Internal Server Error'); // Trả về lỗi HTTP 500
                });
        } catch (error) {
            console.error("Error creating course:", error); // Bắt lỗi nếu có
            res.status(500).send('Internal Server Error'); // Trả về lỗi HTTP 500
        }
    }
    
    
    edit(req,res,next){
        Course.findById(req.params.id)
            .then(course=>res.render('edit',{course:mongooseToObject(course)}))
            .catch(next)
    }   
    update(req,res,next){
        Course.updateOne({_id:req.params.id},req.body)
            .then(()=>{res.redirect('/me/stored/courses')})
            .catch(next) 
    }
    delete(req,res,next){
        Course.delete({_id:req.params.id})
            .then(()=>{res.redirect('back')})
            .catch(next) 
    }
    restore(req,res,next){
        Course.restore({_id:req.params.id})
        .then(()=>{res.redirect('back')})
        .catch(next) 
    }
    forcedelete (req,res,next){
        Course.deleteOne({_id:req.params.id})
        .then(()=>{res.redirect('back')})
        .catch(next) 
    }
    handleForm(req,res,next){
        switch(req.body.action){
            case 'delete':
                Course.delete({_id:{$in:req.body.courseIds}})
                .then(()=>{res.redirect('back')})
                .catch(next) 
                break;
            default :
            res.json({message :'Action is invalid'});
        }
    }
}

module.exports = new CourseController();
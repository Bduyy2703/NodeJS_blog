const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

// Kích hoạt plugin slug
mongoose.plugin(slug);

// Tạo schema cho Course
const CourseSchema = new Schema({
  name: { type: String, required: true }, // Đánh dấu là bắt buộc
  description: { type: String },
  image: { type: String },
  videoID: { type: String },
  level: { type: String },
  slug: { type: String, slug: 'name', unique: true, slug_padding_size: 4 }, // Thêm trường slug
}, {
  timestamps: true,
});

// Kích hoạt plugin xóa mềm
CourseSchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
  deletedAt: true,
});

// Xuất mô hình
module.exports = mongoose.model('Course', CourseSchema);

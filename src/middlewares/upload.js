const multer = require("multer");
const fs = require("fs");
const path = require("path");

// /** Image upload using disk storage */
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     if (file.fieldname == "product_image") {
//       fs.mkdirSync(path.join(__dirname, "../public/product_images"), {
//         recursive: true,
//       });
//       cb(null, path.join(__dirname, "../public/product_images"));
//     }
//     else if (file.fieldname == "subCategory_image") {
//       fs.mkdirSync(path.join(__dirname, "../public/subCategory_image"), {
//         recursive: true,
//       });
//       cb(null, path.join(__dirname, "../public/subCategory_image"));
//     }
//     else if (file.fieldname == "childSubCategory_image") {
//       fs.mkdirSync(path.join(__dirname, "../public/childSubCategory_image"), {
//         recursive: true,
//       });
//       cb(null, path.join(__dirname, "../public/childSubCategory_image"));
//     }
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
//       cb("Only .png, .jpg and .jpeg format are allowed!");
//     }

//     cb(null, new Date().getTime() + ext);
//   },
// });

// const upload = multer({
//   storage: storage,
// });

// module.exports = { upload };

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { files: 50, fileSize: 10485760 },  /**its limit for file size */
});

module.exports = {upload};

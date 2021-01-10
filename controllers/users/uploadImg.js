const fs = require('fs');
const users = require('../../models').user;

module.exports = (req, res) => {
  console.log('req.file :' + req.file);
  const { file } = req;
  // const imageData = fs.readFileSync(req.file.path);
  // console.log(imageData);
  users
    .create({ img: file })
    .then((image) => {
      // res.status(201).send(image);
      res.json({ success: true, file1: req.file, data: image, update: false });
    })
    .catch((err) => console.log(err));
};

// function toBuffer(ab) {
//   var buf = Buffer.alloc(ab.byteLength);
//   var view = new Uint8Array(ab);
//   for (var i = 0; i < buf.length; ++i) {
//       buf[i] = view[i];
//   }
//   return buf;
// }

// function toArrayBuffer(buf) {
//   var ab = new ArrayBuffer(buf.length);
//   var view = new Uint8Array(ab);
//   for (var i = 0; i < buf.length; ++i) {
//       view[i] = buf[i];
//   }
//   return ab;
// }

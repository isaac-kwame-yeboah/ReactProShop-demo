                                    // File Upload Route //
// Bring in path // 
import path from "path";

// Bring in express //
import express from "express";

// Bring in multer //
import multer from "multer";

// Bring in express router // 
const router = express.Router(); 


 // Storage || Where we want our image to be stored // 
     const storage = multer.diskStorage({
             // Destination of saved image // 
             // Note: null is for error && cb means callback //
       destination(req, file, cb){
         cb(null, "uploads/");
       }, 
            // Filename to be formatted //
       filename(req, file, cb){
       cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
       }
     });
 
         // Check File Types //
      function checkFileType(file, cb){
          const filetypes = /jpg|jpeg|png/;
          const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
          const mimetype = filetypes.test(file.mimetype); 
             if(extname && mimetype){
               return cb(null, true);
           } else {
            cb ("Images only!");
           }
      } 

        // Actual Image Upload //
      const upload = multer({
         storage,
      }); 

// Actual Image Route  || NOTE: upload.single("image") is the Middleware where ("image") is the fieldName  //
      router.post("/" , upload.single("image"), (req, res) => {
        res.send({
             message: "Image Uploaded",
             image: `/${req.file.path}`,
        });
      });
 
export default router;
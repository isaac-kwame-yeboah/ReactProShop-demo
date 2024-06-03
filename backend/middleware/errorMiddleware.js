            // Custom Error Handler // 


            // notFound middleware function // 
     const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`); 
      res.status(400); 
      next(error);
     } 

      

         // errorHandler Middleware function || Override default errorHandler //   
         const errorHandler = (err, req, res, next) => {
        let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
        let message = err.message;

               // check for Mongoose bad ObjectId //  
           if(err.name === "CastError" && err.kind === "ObjectId"){
             message = `Resource not found`;
             statusCode = 404;
           }

                  // Final Response //  
               res.status(statusCode).json({
                message,
                stack: process.env.NODE_ENV === "production" ? "null" : err.stack,
               });
         }; 



         export {
                 notFound, errorHandler
                 };
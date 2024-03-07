// import { body, validationResult } from "express-validator";

// const validateRequest = async (req, res, next) => {
//     console.log(`validation: ${req.body}`);
//     const rules = [
//         body('name').notEmpty().withMessage('Name is required.'),
//         body('price').isFloat({ gt: 0 }).withMessage('Price must be positive.'),
//         body('desc').notEmpty().withMessage('Description is needed.'),
//         body('imageUrl').custom((value, { req }) => {
//             if(!req.file) {
//                 throw new Error('Image is required.')
//             }
//             else {
//                 return true
//             }
//         }),
//     ];

//     await Promise.all(
//         rules.map((rule) => rule.run(req))
//     );

//     let validationErrors = validationResult(req);
//     if(!validationErrors.isEmpty()) {
//         return res.render('new-product', {
//             errorMessage:
//               validationErrors.array()[0].msg,
//         });
//     }
//     next();
// }

// export default validateRequest;

import {
    body,
    validationResult,
  } from 'express-validator';
  
  const validateRequest = async (
    req,
    res,
    next
  ) => {
    // console.log(`Validation ${req.body}`);
    // 1. Setup rules for validation.
    const rules = [
      body('name')
        .notEmpty()
        .withMessage('Name is required'),
      body('price')
        .isFloat({ gt: 0 })
        .withMessage(
          'Price should be a positive value'
        ),
      body('imageUrl').custom((value, { req }) => {
        if (!req.file) {
          throw new Error('Image is required');
        }
        return true;
      }),
    ];
  
    // 2. run those rules.
    await Promise.all(
      rules.map((rule) => rule.run(req))
    );
  
    // 3. check if there are any errors after running the rules.
    var validationErrors = validationResult(req);
    console.log(validationErrors);
    // 4. if errros, return the error message
    if (!validationErrors.isEmpty()) {
      return res.render('new-product', {
        errorMessage:
          validationErrors.array()[0].msg,
      });
    }
    next();
  };
  
  export default validateRequest;
  
import { check } from 'express-validator';


export const checkOrderIdV = [check("id").isInt().withMessage("Invalid user ID")]

export const postOrderV = [
    check("price")
        .isFloat()
        .notEmpty()
        .withMessage("Price needs to be a number"),
    check("user_id")
        .isInt()
        .notEmpty()
        .withMessage("User ID needs to be a number"),
]

export const putOrderV = [
    check("price")
        .isFloat()
        .optional()
        .withMessage("Price needs to be a number"),
    check("date")
        .isDate()
        .optional()
        .withMessage("Date needs to be a date"),
    check("user_id")
        .isInt()
        .optional()
        .withMessage("User ID needs to be a number"),
]
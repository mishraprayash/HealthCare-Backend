import { z } from 'zod';
import { sendErrorResponse } from '../lib/responseHelper.js';



// commonly used fields 

const nameFormat = z.string().min(2, { message: "Name must be at least 2 characters long" })
const emailFormat = z.string().email({ message: "Invalid email format" })
const passwordFormat = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long" })
  .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })

const phoneNoFormat = z.string().length(10)



// ======= User auth schema ========
export const userRegisterSchema = z.object({
  name: nameFormat,
  email: emailFormat,
  password: passwordFormat
});

export const userLoginSchema = z.object({
  email: emailFormat,
  password: passwordFormat
});

// ======== Patient Schemas ==========

export const patientRegisterSchema = z.object({
  name: nameFormat,
  email: emailFormat,
  phoneNo: phoneNoFormat,
  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .int({ message: "Age must be an integer" })
    .min(1, { message: "Age must be at least 1" })
    .max(120, { message: "Age must be at most 120" }),

  gender: z.enum(["MALE", "FEMALE", "OTHERS", "male", "female", "Male", "Female", "others", "Others", "F", 'f', "M", "m", "O", 'o'], {
    required_error: "Gender is required",
    invalid_type_error: "Gender must one of the followings: MALE, FEMALE, OTHERS, male, female, others, Male, Female, Others, F, f, M, m, O, o"
  }),

  condition: z.array(z.string()).nonempty('Condition must contain at least one item'),
});

export const doctorRegisterSchema = z.object({
  name: nameFormat,
  email: emailFormat,
  phoneNo:phoneNoFormat,
  specialization: z.array(z.string()).nonempty('Specialization must contain at least one item'),
})


const uuidSchema = z.object({
  id: z.string().uuid("Invalid UUID format")
})


export const validateUUIDParam = (req, res, next) => {
  const validationResult = uuidSchema.safeParse(req.params);

  if (!validationResult.success) {
    return res.status(400).json({
      error: validationResult.error.errors[0].message,
    });
  }
  next();
};

/**
 * Creates a validation middleware for a specific schema
 * @param {z.ZodSchema} schema - The Zod schema to validate against
 * @returns {Function} Express middleware function
 */
export const validateSchema = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error.errors) {
        const validationErrors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));

        return sendErrorResponse(
          res,
          400,
          "Validation failed",
          { errors: validationErrors }
        );
      }

      return sendErrorResponse(res, 400, "Invalid input data");
    }
  };
};



// =========== Predefined Validators ===========

// User validators
export const validateUserRegister = validateSchema(userRegisterSchema);
export const validateUserLogin = validateSchema(userLoginSchema);

// patient validators

export const validatePatientRegister = validateSchema(patientRegisterSchema)

export const validateDoctorRegister = validateSchema(doctorRegisterSchema)
import { z } from 'zod';
import { sendErrorResponse } from '../lib/responseHelper.js';
import { email } from 'zod/v4';



// ======= User auth schema ========
export const userRegisterSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z
    .string()
    .email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
});

export const userLoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
});

// ======== Patient Schemas ==========

export const patientRegisterSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(100, { message: "Name must be at most 100 characters long" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces" }),

  email: z
    .string()
    .email({ message: "Invalid email format" })
    .max(255, { message: "Email must be at most 255 characters long" }),

  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .int({ message: "Age must be an integer" })
    .min(1, { message: "Age must be at least 1" })
    .max(120, { message: "Age must be at most 120" }),

  gender: z.enum(["Male", "Female", "Others"], {
    required_error: "Gender is required",
    invalid_type_error: "Gender must be either Male, Female, or Others",
  }),

  condition: z
    .string()
    .min(3, { message: "Condition description must be at least 3 characters long" })
    .max(500, { message: "Condition description must be at most 500 characters long" }),
});


const uuidSchema = z.object({
  id: z.string().uuid("Invalid UUID format")
})


export const validateUUIDParam = (req,res,next) => {
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
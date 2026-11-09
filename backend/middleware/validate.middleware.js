import { ZodError } from "zod";

export const validate = (schema) => 
  async (req, res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((err) => ({
          field: err.path ? err.path.join(".") : "",
          message: err.message,
        }));

        return res.status(400).json({
          status: "fail",
          errors: formattedErrors,
        });
      }
      return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
  };
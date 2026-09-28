

const validateUpdateProvider = (req, res, next) => {
  
  const errors = [];
  
  const { name, businessName, bio, phone } = req.body;

  if (name !== undefined && (typeof name !== "string" || name.trim().length === 0)) {
    errors.push("Name must be a non-empty string");
  }

  if (businessName !== undefined && (typeof businessName !== "string" || businessName.trim().length === 0)) {
    errors.push("Business name must be a non-empty string");
  }

  if (bio !== undefined && typeof bio !== "string") {
    errors.push("Bio must be a string");
  }

  if (phone !== undefined && typeof phone !== "string") {
    errors.push("Phone must be a string");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
  
};










module.exports ={validateUpdateProvider };




const validateCreateService = (req, res, next) => {
  
  const errors = [];
  
  const { name, description, durationMinutes, priceMinorUnits, currency } = req.body;

  
  if (!name || typeof name !== "string" || name.trim().length === 0){
    errors.push("Name is required");
  }

  if (description !== undefined && typeof description !== "string"){
    errors.push("Description must be a string");
  }

  if (durationMinutes === undefined || !Number.isInteger(durationMinutes) || durationMinutes < 1){
    errors.push("Duration (in minutes) must be a whole number greater than 0");
  }

  if (priceMinorUnits === undefined || !Number.isInteger(priceMinorUnits) || priceMinorUnits < 0){
    errors.push("Price (in minor units) must be a whole number, 0 or greater");
  }

  if (!currency || !/^[A-Za-z]{3}$/.test(currency)){
    errors.push("Currency must be a valid 3-letter code (e.g. NGN, USD)");
  }

  if (errors.length > 0){
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
};








const validateUpdateService = (req, res, next) => {
  
  const errors = [];
  
  const { name, description, durationMinutes, priceMinorUnits, currency, isActive } = req.body;
  

  if (name !== undefined && (typeof name !== "string" || name.trim().length === 0)){
    errors.push("Name must be a non-empty string");
  }

  if (description !== undefined && typeof description !== "string"){
    errors.push("Description must be a string");
  }

  if (durationMinutes !== undefined && (!Number.isInteger(durationMinutes) || durationMinutes < 1)){
    errors.push("Duration (in minutes) must be a whole number greater than 0");
  }

  if (priceMinorUnits !== undefined && (!Number.isInteger(priceMinorUnits) || priceMinorUnits < 0)){
    errors.push("Price (in minor units) must be a whole number, 0 or greater");
  }

  if (currency !== undefined && !/^[A-Za-z]{3}$/.test(currency)){
    errors.push("Currency must be a valid 3-letter code (e.g. NGN, USD)");
  }

  if (isActive !== undefined && typeof isActive !== "boolean"){
    errors.push("isActive must be true or false");
  }

  if (errors.length > 0){
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }


  next();
};









module.exports = { validateCreateService, validateUpdateService };
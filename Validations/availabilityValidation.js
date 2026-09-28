

const validDays = [
  "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"
];




const validateCreateAvailability = (req, res, next) => {
  
  const errors = [];
  
  const { dayOfWeek, startTime, endTime } = req.body;

  
  if (!dayOfWeek || !validDays.includes(dayOfWeek.toLowerCase())){
    errors.push("dayOfWeek must be one of: " + validDays.join(", "));
  }

  
  const start = new Date(startTime);
  const end = new Date(endTime);

  
  if (!startTime || isNaN(start.getTime())){
    errors.push("startTime must be a valid date/time");
  }

  
  if (!endTime || isNaN(end.getTime())){
    errors.push("endTime must be a valid date/time");
  }

  
  if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end <= start){
    errors.push("endTime must be after startTime");
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



const validateUpdateAvailability = (req, res, next) => {
  
  const errors = [];
  
  const { dayOfWeek, startTime, endTime } = req.body;

  
  if (dayOfWeek !== undefined && !validDays.includes(dayOfWeek.toLowerCase())){
    errors.push("dayOfWeek must be one of: " + validDays.join(", "));
  }

  
  let start, end;

  if (startTime !== undefined){
    start = new Date(startTime);
    if (isNaN(start.getTime())) {
      errors.push("startTime must be a valid date/time");
    }
  }

  if (endTime !== undefined){
    end = new Date(endTime);
    if (isNaN(end.getTime())) {
      errors.push("endTime must be a valid date/time");
    }
  }

  if (start && end && end <= start){
    errors.push("endTime must be after startTime");
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



module.exports = { validateCreateAvailability, validateUpdateAvailability };
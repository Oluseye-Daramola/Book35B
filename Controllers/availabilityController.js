
const Availability = require("../Models/Availability");




const createAvailability = async (req, res, next) => {

  try{

    const { dayOfWeek, startTime, endTime } = req.body;


    const availability = await Availability.create({
      provider: req.provider._id,
      dayOfWeek,
      startTime,
      endTime,
    });

    
    res.status(201).json({
      success: true,
      data: { availability },
    });

    
  }catch(err){

    next(err);
  }
  
}






const getAvailability = async(req, res, next)=>{

  try{

    const availability = await Availability.find({ provider: req.provider._id });

    
    res.status(200).json({
      success: true,
      data: { availability },
    });
    
  }catch(err){

    next(err);
    
  }
  
}






const updateAvailability = async(req, res, next) =>{

  try{

    const availability = await Availability.findById(req.params.id);
    

    if (!availability) {
      return res.status(404).json({
        success: false,
        message: "Availability not found",
      });
    }


    if (availability.provider.toString() !== req.provider._id.toString()){ 
      return res.status(403).json({success: false,
        message: "You do not have access to this availability",
      });
    }


    const { dayOfWeek, startTime, endTime } = req.body;

    const updates = {};
    if (dayOfWeek !== undefined) updates.dayOfWeek = dayOfWeek;
    if (startTime !== undefined) updates.startTime = startTime;
    if (endTime !== undefined) updates.endTime = endTime;
    
    const updatedAvailability = await Availability.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    
    res.status(200).json({
      success: true,
      data: { availability: updatedAvailability },
    });
    
  }catch(err){

    next(err);
  }
  
}





const deleteAvailability = async (req, res, next) => {
  
  try {
    const availability = await Availability.findById(req.params.id);

    if (!availability) {
      return res.status(404).json({
        success: false,
        message: "Availability not found",
      });
    }

    if (availability.provider.toString() !== req.provider._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You do not have access to this availability",
      });
    }

    await Availability.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Availability deleted successfully",
    });
    
  } catch (err) {
    next(err);
    
  }
  
};










module.exports = { createAvailability, getAvailability, updateAvailability, deleteAvailability };
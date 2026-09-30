

const Appointment = require("../Models/Appointment");

const getAppointments = async(req, res, next)=>{

  try{

    const appointment = await Appointment.find({ provider: req.user._id });

    
    res.status(200).json({
      success: true,
      data: { appointment },
    });
    
  }catch(err){

    next(err);
    
  }
  
}


const getAppointmentById = async(req, res, next)=>{

  try{


    const appointment = await Appointment.findById(req.params.id);
    

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "No appointment booked",
      });
    }


    if (appointment.provider.toString() !== req.user._id.toString()) {
      
      return res.status(403).json({
        success: false,
        message: "You do not have any appointment",
      });
    }


    res.status(200).json({
      success: true,
      data: { appointment },
    });

    
  }catch(err){

    next(err);
  }

}



const cancelAppointment = async (req, res, next) => {
  
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    if (appointment.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You do not have access to this appointment",
      });
    }

    if (appointment.status === "completed") {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel an appointment that has already been completed",
      });
    }

    if (appointment.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "This appointment is already cancelled",
      });
    }

    appointment.status = "cancelled";
    await appointment.save();

    res.status(200).json({
      success: true,
      data: { appointment },
    });
  } catch (err) {
    
    next(err);
  }
};


module.exports = { getAppointments, getAppointmentById, cancelAppointment };

const Provider = require("../Models/Provider");
const Service = require("../Models/Service");
const Appointment = require("../Models/Appointment");
const { checkSlotAvailability } = require("../Utils/generateSlots");

const getPublicProviderProfile = async (req, res, next) => {

  try {

    const { slug } = req.params;

    const provider = await Provider.findOne({ slug, isActive: true });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        provider: {
          name: provider.name,
          businessName: provider.businessName,
          bio: provider.bio,
          slug: provider.slug,
        },
      },
    });

  } catch (err) {

    next(err);
  }

};

const getPublicProviderServices = async (req, res, next) => {
  try {

    const { slug } = req.params;

    const provider = await Provider.findOne({ slug, isActive: true });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    const services = await Service.find({ provider: provider._id, isActive: true });

    res.status(200).json({
      success: true,
      data: { services },
    });
  } catch (err) {
    next(err);
  }
};


const createAppointment = async (req, res, next) => {
  try {
    const {
      provider: providerId,
      service: serviceId,
      customerName,
      customerEmail,
      customerPhone,
      startTime,
      endTime,
      notes,
    } = req.body;

    const provider = await Provider.findOne({ _id: providerId, isActive: true });
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    const service = await Service.findOne({
      _id: serviceId,
      provider: providerId,
      isActive: true,
    });
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found for this provider",
      });
    }

    const requestedStart = new Date(startTime);
    const requestedEnd = new Date(endTime);
    const requestedMinutes = (requestedEnd - requestedStart) / (1000 * 60);

    if (requestedMinutes !== service.durationMinutes) {
      return res.status(400).json({
        success: false,
        message: `This service takes exactly ${service.durationMinutes} minutes; the selected time range doesn't match`,
      });
    }

    const existingAppointments = await Appointment.find({
      provider: providerId,
      status: { $in: ["pending", "confirmed"] },
      startTime: { $lt: requestedEnd },
      endTime: { $gt: requestedStart },
    });

    const isAvailable = checkSlotAvailability(startTime, endTime, existingAppointments);
    if (!isAvailable) {
      return res.status(409).json({
        success: false,
        message: "This time slot is no longer available. Please choose another.",
      });
    }

    const appointment = await Appointment.create({
      provider: providerId,
      service: serviceId,
      customerName,
      customerEmail,
      customerPhone,
      startTime: requestedStart,
      endTime: requestedEnd,
      notes,
    });

    res.status(201).json({
      success: true,
      data: { appointment },
    });
  } catch (err) {
    next(err);
  }
};


module.exports = { getPublicProviderProfile, getPublicProviderServices, createAppointment };
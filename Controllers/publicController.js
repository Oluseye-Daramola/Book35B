

const Provider = require("../Models/Provider");
const Service = require("../Models/Service");









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

















module.exports= { getPublicProviderProfile, getPublicProviderServices }
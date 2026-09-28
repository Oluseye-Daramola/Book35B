

const Provider = require("../Models/Provider");



//Captures displays users profile
const getMe = async (req, res, next) =>{
  
  try {
    
    res.status(200).json({
      
      success: true,
      
      data: {
        provider: {
          id: req.provider._id,
          name: req.provider.name,
          businessName: req.provider.businessName,
          slug: req.provider.slug,
          email: req.provider.email,
          phone: req.provider.phone,
          bio: req.provider.bio,
        },
        
      },
      
    });
    
  } catch (err) {
    next(err);
  }
  
};




//Possible User Profile edits
const updateMe = async (req, res, next) => {
  try {
    const { name, businessName, bio, phone } = req.body;

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (businessName !== undefined) updates.businessName = businessName;
    if (bio !== undefined) updates.bio = bio;
    if (phone !== undefined) updates.phone = phone;

    const updatedProvider = await Provider.findByIdAndUpdate(
      req.provider._id,
      updates,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: {
        provider: {
          id: updatedProvider._id,
          name: updatedProvider.name,
          businessName: updatedProvider.businessName,
          slug: updatedProvider.slug,
          email: updatedProvider.email,
          phone: updatedProvider.phone,
          bio: updatedProvider.bio,
        },
      },
    });
    
  } catch (err) {
    next(err);
  }
  
};








module.exports ={ getMe, updateMe };
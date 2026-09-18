import Business from "../models/Business.js";

// GET Business
export const getBusiness = async (req, res) => {
  try {
    const { id } = req.params;

    const business = await Business.findById(id);

    if (!business) {
      return res.status(404).json({
        message: "Business not found"
      });
    }

    res.status(200).json(business);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch business",
      error: error.message
    });
  }
};


// CREATE Business
export const createBusiness = async (req, res) => {
  try {
    const { name, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({
        message: "Business name and type are required"
      });
    }

    const business = await Business.create({
      name,
      type
    });

    res.status(201).json({
      message: "Business created successfully",
      business
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to create business",
      error: error.message
    });
  }
};
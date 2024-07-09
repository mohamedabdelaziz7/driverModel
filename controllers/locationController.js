exports.allowLocationAccess = async (req, res) => {
    const { driverId, location } = req.body;
  
    try {
      const driver = await Driver.findById(driverId);
      if (!driver) {
        return res.status(404).json({ error: 'Driver not found' });
      }
  
      driver.location = location;
      await driver.save();
  
      res.status(200).json(driver);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

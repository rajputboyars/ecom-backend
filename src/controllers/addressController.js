import User from '../models/user.js';

export async function addAddress(req, res) {
  const { userId, address } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.addresses.push(address);
    await user.save();
    res.status(201).json({ message: 'Address added successfully', address });
  } catch (error) {
    res.status(500).json({ message: 'Error adding address', error });
  }
}

export async function getAllAddresses(req, res) {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching addresses', error });
  }
}

export async function updateAddress(req, res) {
  const { userId, addressId } = req.params;
  const updatedAddress = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === addressId);
    if (addressIndex === -1) {
      return res.status(404).json({ message: 'Address not found' });
    }

    user.addresses[addressIndex] = updatedAddress;
    await user.save();

    res.status(200).json({ message: 'Address updated successfully', address: updatedAddress });
  } catch (error) {
    res.status(500).json({ message: 'Error updating address', error });
  }
}

export async function deleteAddress(req, res) {
  const { userId, addressId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.addresses = user.addresses.filter(addr => addr._id.toString() !== addressId);
    await user.save();

    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting address', error });
  }
}

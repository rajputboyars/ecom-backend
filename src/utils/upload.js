import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // Your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY,        // Your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET,  // Your Cloudinary API secret
});

// Upload file to Cloudinary
export async function uploadFile(file) {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: 'ecommerce/products', // Optional: you can organize images in folders
      use_filename: true,           // Use original filename
      unique_filename: false,      // Don't generate random filenames
    });

    return {
      url: result.secure_url,  // The URL of the uploaded image
      public_id: result.public_id, // Cloudinary public ID (for deletion or further manipulation)
    };
  } catch (error) {
    throw new Error('File upload failed: ' + error.message);
  }
}

// Function to delete an uploaded image from Cloudinary
export async function deleteFile(publicId) {
  try {
    const result = await cloudinary.v2.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error('Failed to delete file: ' + error.message);
  }
}

import cloudinary from 'cloudinary';
import { env } from './env.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: env('CLOUDINARY_CLOUD_NAME', null),
  api_key: env('CLOUDINARY_API_KEY', null),
  api_secret: env('CLOUDINARY_API_SECRET', null),
});

export function uploadToCloudinary(filePath) {
  return cloudinary.v2.uploader.upload(filePath);
}

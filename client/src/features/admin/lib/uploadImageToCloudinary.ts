import axios from "axios";

export const uploadImageToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "Projects");

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
      formData,
    );

    const imageUrl = res.data?.secure_url;

    if (!imageUrl) throw new Error("Upload failed");

    return imageUrl;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Upload failed:", error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }

    throw new Error("Upload failed");
  }
};

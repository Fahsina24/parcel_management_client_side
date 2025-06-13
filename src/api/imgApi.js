import axios from "axios";

// Upload image and return image url

export const imageUpload = async (imageData) => {
  const formData = new FormData();
  formData.append("image", imageData);

  // send image to imgBB

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageApi}`,
    formData
  );

  return data.data.display_url;
};

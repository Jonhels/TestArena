import api from "../api/api";

const resolveProfileImage = (imagePath) => {
  if (!imagePath) return "";

  const base = api.defaults.baseURL.replace(/\/api$/, "");
  const isAbsolute = imagePath.startsWith("http");

  return isAbsolute ? imagePath : `${base}${imagePath}`;
};

export default resolveProfileImage;

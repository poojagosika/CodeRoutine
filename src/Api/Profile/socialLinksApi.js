import axiosInstance from "../axiosConfig";

export const addOrUpdateSocialLinks = async (data) => {
  return await axiosInstance.put(
    "/api/users/profile/addOrUpdateSocialLinks",
    data
  );
};

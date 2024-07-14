import axiosInstance from "../axiosConfig";

export const addOrUpdateSocialLinks = async (data) => {
  return await axiosInstance.post(
    "/api/users/profile/profile/addOrUpdateSocialLinks",
    data
  );
};

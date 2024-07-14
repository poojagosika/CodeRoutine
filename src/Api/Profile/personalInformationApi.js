import axiosInstance from "../axiosConfig";

export const personalInformationUpdate = async (data) => {
  return await axiosInstance.put(
    "/api/users/profile/personalInformation",
    data
  );
};

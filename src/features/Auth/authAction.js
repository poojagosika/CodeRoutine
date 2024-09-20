import axiosInstance from "../../Api/axiosConfig";

export const signup = createAsyncThunk("auth/signup", async (userData) => {
  const response = await axiosInstance.post("/api/signup", userData);
  return response.data;
});

export const getProfileById = async (res, req) => {
  try {
    const { id: userId } = req.params;
    const profile = await user.findOne({ _id: userId });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    return res.status(200).json({ profile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

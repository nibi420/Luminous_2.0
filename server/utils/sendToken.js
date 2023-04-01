export const sendToken = (res, user, statusCode, message) => {
  const userData = {
    _id: user._id,
    name: user.fullname,
    email: user.email,
    username: user.username,
    role: user.role,
    profile_picture: user.profile_picture,
    verified: user.verified,
  };

  const token = user.getJWTToken();

  const options = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, message, user: userData });
};

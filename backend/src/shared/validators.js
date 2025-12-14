const validateEmailPassword = ({ email, password }) => {
  if (!email || !password) {
    return "Email and password are required";
  }

  if (!email.includes("@")) {
    return "Invalid email format";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }

  return null;
};

module.exports = { validateEmailPassword };

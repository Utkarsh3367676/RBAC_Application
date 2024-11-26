export const validateUser = (userData) => {
  const errors = {};

  if (!userData.name || userData.name.length < 2) {
    errors.name = "Name must be at least 2 characters long";
  }

  if (!userData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
    errors.email = "Invalid email format";
  }

  return errors;
};

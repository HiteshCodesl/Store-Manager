import bcrypt from "bcrypt";

export const hash = async (password: string) => {
  return bcrypt.hash(password, 10);
};

export const compare = async (password: string, hashed: string) => {
  return bcrypt.compare(password, hashed);
};

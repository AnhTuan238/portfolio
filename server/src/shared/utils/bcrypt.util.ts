import bcrypt from "bcryptjs";

export const compareValue = async (
  value: string,
  hashedValue: string
): Promise<boolean> => await bcrypt.compare(value, hashedValue);

export const hashValue = async (value: string): Promise<string> =>
  await bcrypt.hash(value, 12);

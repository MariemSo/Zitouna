import prisma from "../prisma/prisma";
import bcrypt from "bcrypt";
import {
  LoginUserInput,
  RegisterUserInput,
  UpdateProfileInput,
} from "../types/userTypes";
import jwt from "jsonwebtoken";

const registerUser = async (input: RegisterUserInput) => {
  const {
    userName,
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    address,
  } = input;

  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const resolvedUserName = userName ?? `${firstName} ${lastName}`;
  const user = await prisma.user.create({
    data: {
      userName: resolvedUserName,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber: phoneNumber || null,
      address: address || null,
    },
  });
  return {
    id: user.id,
    email: user.email,
    userName: user.userName,
  };
};

const loginUser = async (input: LoginUserInput) => {
  const { email, password } = input;

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error("User Not Found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password.");
  }

  //JWT Token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" },
  );
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      userName: user.userName,
      role: user.role,
    },
  };
};

const getUserProfile = async (userId: number) => {
  if (!userId) {
    throw new Error("User Not Found");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      userName: true,
      address: true,
      phoneNumber: true,
      role: true,
    },
  });

  if (!user) {
    throw new Error("User Not Found");
  }
  console.log(user)
  return user;
};

const updateUserProfile = async (userId: number, input: UpdateProfileInput) => {
  const { firstName, lastName, userName, address, phoneNumber } = input;
  return prisma.user.update({
    where: { id: userId },
    data: {
      firstName,
      lastName,
      userName,
      address,
      phoneNumber,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      userName: true,
      address: true,
      phoneNumber: true,
      role: true,
    },
  });
};

export { registerUser, loginUser, getUserProfile, updateUserProfile };

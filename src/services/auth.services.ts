import { Users } from "../model/user.js";
import { loginType, registerType } from "../types/user.type.js";

export async function createUser(userInput: registerType) {
  let { is_Error } = await getUser({
    username: userInput.username,
    password: userInput.password,
  });

  const isUserExist = await Users.findOne({ email: userInput.email });

  if (isUserExist) {
    is_Error = false;
  }

  if (!is_Error) {
    return {
      is_Error: true,
      errorMessage: "User already exist. please login.",
      statusCode: 401,
    };
  }

  const user = await Users.create(userInput);

  if (!user) {
    return {
      is_Error: true,
      errorMessage: "something went wrong",
      data: undefined,
      statusCode: 500,
    };
  }

  user.password = undefined;
  return {
    is_Error: false,
    errorMessage: "success",
    data: user,
    statusCode: 200,
  };
}

export async function getUser(userInput: loginType) {
  const user = await Users.findOne({ username: userInput.username }).select(
    "+password",
  );

  if (!user) {
    return {
      is_Error: true,
      errorMessage: "User does not exist. Please Create a account",
      data: undefined,
      statusCode: 500,
    };
  }

  const isValidatePassword = await user.validatePassword(userInput.password);

  if (!isValidatePassword) {
    return {
      is_Error: true,
      errorMessage: "password and username are not valid",
      data: undefined,
      statusCode: 401,
    };
  }

  user.password = undefined;
  return {
    is_Error: false,
    errorMessage: "success",
    data: user,
    statusCode: 200,
  };
}

export async function getUserById(userId: string) {
  const user = await Users.findById(userId);

  if (!user) {
    return {
      is_Error: true,
      errorMessage: "user not found",
      data: undefined,
      statusCode: 404,
    };
  }

  user.password = undefined;

  return {
    is_Error: false,
    errorMessage: "success",
    data: user,
    statusCode: 200,
  };
}

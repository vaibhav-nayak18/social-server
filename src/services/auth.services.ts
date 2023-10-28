import { Users } from '../model/user.js';
import { IUser, loginType, registerType } from '../types/user.type.js';
import client from '../redis/client.js';

export async function createUser(userInput: registerType) {
  if (!userInput) {
    return {
      is_Error: true,
      errorMessage: 'user data not found',
      data: undefined,
      statusCode: 400,
    };
  }
  const user = await Users.create(userInput);

  if (!user) {
    return {
      is_Error: true,
      errorMessage: 'something went wrong',
      data: undefined,
      statusCode: 500,
    };
  }

  return {
    is_Error: false,
    errorMessage: 'success',
    data: user,
    statusCode: 200,
  };
}

export async function getUser(userInput: loginType) {
  if (!userInput) {
    return {
      is_Error: true,
      errorMessage: 'user data not found',
      data: undefined,
      statusCode: 400,
    };
  }
  const user = await Users.findOne({ username: userInput.username }).select(
    '+password',
  );

  if (!user) {
    return {
      is_Error: true,
      errorMessage: 'something went wrong',
      data: undefined,
      statusCode: 500,
    };
  }

  const isValidatePassword = await user.validatePassword(userInput.password);

  if (!isValidatePassword) {
    return {
      is_Error: true,
      errorMessage: 'password and username are not valid',
      data: undefined,
      statusCode: 401,
    };
  }

  return {
    is_Error: false,
    errorMessage: 'success',
    data: user,
    statusCode: 200,
  };
}

export async function getUserById(userId: string | null) {
  if (!userId) {
    return {
      is_Error: true,
      errorMessage: 'invalid, please login ',
      data: undefined,
      statusCode: 404,
    };
  }

  const user = await Users.findById(userId);

  if (!user) {
    return {
      is_Error: true,
      errorMessage: 'user not found',
      data: undefined,
      statusCode: 404,
    };
  }

  return {
    is_Error: false,
    errorMessage: 'success',
    data: user,
    statusCode: 200,
  };
}

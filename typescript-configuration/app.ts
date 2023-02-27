let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'max';

// userName = userInput -> error

// function that is 'never' type
function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

// the generateError never produce return value, hence it called 'never' type

generateError('An error occurred!', 500);

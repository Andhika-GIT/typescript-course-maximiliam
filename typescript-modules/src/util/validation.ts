namespace App {
  // validation type
  export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  export const validate = (input: Validatable) => {
    let isValid = true;

    // if we insert required into the argument
    if (input.required) {
      isValid = isValid && input.value.toString().trim().length > 0;
    }

    // if we insert minLength into the argument and if the value is string
    if (input.minLength !== undefined && typeof input.value === 'string') {
      isValid = isValid && input.value.length >= input.minLength;
    }

    // if we insert minLength into the argument and if the value is string
    if (input.maxLength !== undefined && typeof input.value === 'string') {
      isValid = isValid && input.value.length >= input.maxLength;
    }

    // if we insert min into the argument and if the value is number
    if (input.min != null && typeof input.value === 'number') {
      isValid = isValid && input.value >= input.min;
    }

    // if we insert max into the argument and if the value is number
    if (input.max != null && typeof input.value === 'number') {
      isValid = isValid && input.value <= input.max;
    }

    return isValid;
  };
}

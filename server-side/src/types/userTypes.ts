interface RegisterUserInput {
    userName?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: number;
    address?: string;
}
interface LoginUserInput {
    email: string;
    password: string;
}

type UpdateProfileInput = Omit<RegisterUserInput, 'password'>;

export { RegisterUserInput , LoginUserInput,UpdateProfileInput };
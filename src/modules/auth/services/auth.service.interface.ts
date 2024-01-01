import { RequestUserDto } from "../../../modules/user/dtos/request.user.dto";
import { SignInResponse } from "../types/sign-in.response.type";

export abstract class AuthServiceInterface {
  abstract signUp(signUpDto: RequestUserDto): Promise<void>;
  abstract signIn(email: string, password: string): Promise<SignInResponse>;
}

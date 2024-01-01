import { RequestUserDto } from "../../../modules/user/dtos/request.user.dto";
import { SignInUserDto } from "../../../modules/user/dtos/sign-in.user.dto";
import { UserPayloadEntity } from "../types/payload.type";
import { SignInResponse } from "../types/sign-in.response.type";

export interface AuthControllerInterface {
  signUp(signUpDto: RequestUserDto): Promise<void>;
  signIn(signInDto: SignInUserDto): Promise<SignInResponse>;
  getUser(user: UserPayloadEntity): Promise<UserPayloadEntity>;
}

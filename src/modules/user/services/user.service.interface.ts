import { AccountEntity } from "../../../common/entity/account.entity";
import { AccountRoleType } from "../../../common/enums/account-role.enum";
import { RequestUserDto } from "../dtos/request.user.dto";

export abstract class UserServiceInterface {
  abstract create(
    userDto: RequestUserDto,
    role?: AccountRoleType,
  ): Promise<AccountEntity>;
  abstract findOne(email: string): Promise<AccountEntity>;
  abstract hashPassword(password: string): Promise<string>;
}

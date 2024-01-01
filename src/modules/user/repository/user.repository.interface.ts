import { AccountEntity } from "../../../common/entity/account.entity";
import { AccountRoleType } from "../../../common/enums/account-role.enum";
import { RequestUserDto } from "../dtos/request.user.dto";

export abstract class UserRepositoryInterface {
  abstract create(
    userDto: RequestUserDto,
    role?: AccountRoleType,
  ): Promise<AccountEntity>;
  abstract findOne(email: string): Promise<AccountEntity>;
}

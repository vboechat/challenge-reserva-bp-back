import { AccountEntity } from "../../../common/entity/account.entity";
import { RequestUserDto } from "../../../modules/user/dtos/request.user.dto";
import { UpdateUserDto } from "../../../modules/user/dtos/update.user.dto";

export abstract class ClientRepositoryInterface {
  abstract findAll(page?: number): Promise<Array<AccountEntity>>;
  abstract findById(clientId: number): Promise<AccountEntity>;
  abstract create(requestBody: RequestUserDto): Promise<AccountEntity>;
  abstract update(
    clientId: number,
    requestBody: UpdateUserDto,
  ): Promise<AccountEntity>;
  abstract delete(clientId: number): Promise<void>;
}

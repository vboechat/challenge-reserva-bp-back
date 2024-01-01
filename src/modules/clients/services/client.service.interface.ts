import { PaginationDto } from "../../../common/dtos/pagination.dto";
import { AccountEntity } from "../../../common/entity/account.entity";
import { RequestUserDto } from "../../../modules/user/dtos/request.user.dto";
import { UpdateUserDto } from "../../../modules/user/dtos/update.user.dto";

export abstract class ClientServiceInterface {
  abstract findAll(page?: PaginationDto): Promise<Array<AccountEntity>>;
  abstract findById(clientId: number): Promise<AccountEntity>;
  abstract create(requestBody: RequestUserDto): Promise<void>;
  abstract update(
    clientId: number,
    requestBody: UpdateUserDto,
  ): Promise<AccountEntity>;
  abstract delete(clientId: number): Promise<void>;
}

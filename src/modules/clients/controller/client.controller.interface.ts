import { PaginationDto } from "../../../common/dtos/pagination.dto";
import { AccountEntity } from "../../../common/entity/account.entity";
import { RequestUserDto } from "../../../modules/user/dtos/request.user.dto";
import { UpdateUserDto } from "../../../modules/user/dtos/update.user.dto";

export interface ClientControllerInterface {
  findAll(paginationDto?: PaginationDto): Promise<Array<AccountEntity>>;
  findById(clientId: number): Promise<AccountEntity>;
  create(requestBody: RequestUserDto): Promise<void>;
  update(clientId: number, requestBody: UpdateUserDto): Promise<AccountEntity>;
  delete(clientId: number): Promise<void>;
}

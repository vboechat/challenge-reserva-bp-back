import { PaginationDto } from "../../../common/dtos/pagination.dto";
import { AccountEntity } from "../../../common/entity/account.entity";
import { RequestUserDto } from "../../../modules/user/dtos/request.user.dto";
import { UpdateUserDto } from "../../../modules/user/dtos/update.user.dto";

export abstract class BrokerServiceInterface {
  abstract createBroker(broker: RequestUserDto): Promise<void>;
  abstract getBrokers(page?: PaginationDto): Promise<Array<AccountEntity>>;
  abstract getBrokerById(id: number): Promise<AccountEntity>;
  abstract updateBroker(
    id: number,
    broker: UpdateUserDto,
  ): Promise<AccountEntity>;
  abstract deleteBroker(id: number): Promise<void>;
}

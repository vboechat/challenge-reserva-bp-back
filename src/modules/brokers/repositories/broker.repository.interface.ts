import { AccountEntity } from "../../../common/entity/account.entity";
import { UpdateUserDto } from "../../../modules/user/dtos/update.user.dto";

export abstract class BrokerRepositoryInterface {
  abstract getBrokers(page?: number): Promise<Array<AccountEntity>>;
  abstract getBrokerById(id: number): Promise<AccountEntity>;
  abstract updateBroker(
    id: number,
    broker: UpdateUserDto,
  ): Promise<AccountEntity>;
  abstract deleteBroker(id: number): Promise<void>;
}

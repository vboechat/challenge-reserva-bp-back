import { PaginationDto } from "../../../common/dtos/pagination.dto";
import { AccountEntity } from "../../../common/entity/account.entity";
import { UserPayloadEntity } from "../../../modules/auth/types/payload.type";
import { RequestUserDto } from "../../../modules/user/dtos/request.user.dto";
import { UpdateUserDto } from "../../../modules/user/dtos/update.user.dto";

export interface BrokerControllerInterface {
  createBroker(broker: RequestUserDto): Promise<void>;
  getBrokers(page?: PaginationDto): Promise<Array<AccountEntity>>;
  getBrokerById(id: number): Promise<AccountEntity>;
  updateBroker(
    user: UserPayloadEntity,
    broker: UpdateUserDto,
  ): Promise<AccountEntity>;
  deleteBroker(user: UserPayloadEntity): Promise<void>;
}

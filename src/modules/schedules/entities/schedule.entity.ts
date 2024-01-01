import { AccountEntity } from "src/common/entity/account.entity";

export class ScheduleEntity {
  id: number;
  fromDate: Date;
  toDate: Date;
  clientId: number;
  client: AccountEntity;
  brokerId: number;
  broker: AccountEntity;
  createdAt: Date;
  updatedAt: Date;
}

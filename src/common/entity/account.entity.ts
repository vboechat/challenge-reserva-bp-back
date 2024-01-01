import { AccountRoleType } from "../enums/account-role.enum";

export class AccountEntity {
  id: number;
  username: string;
  email: string;
  password: string;
  role: AccountRoleType;
  createdAt: Date;
  updatedAt: Date;
}

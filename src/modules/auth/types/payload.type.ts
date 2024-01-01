import { AccountRoleType } from "../../../common/enums/account-role.enum";

export type UserPayloadEntity = {
  sub: number;
  username: string;
  email: string;
  role: Array<AccountRoleType>;
};

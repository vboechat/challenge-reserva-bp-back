import { SetMetadata } from "@nestjs/common";
import { AccountRole } from "src/common/enums/account-role.enum";

export const ROLES_KEY = "role";
export const Role = (...role: AccountRole[]) => SetMetadata(ROLES_KEY, role);

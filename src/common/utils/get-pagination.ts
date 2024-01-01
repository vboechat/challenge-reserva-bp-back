import { PrismaService } from "../services/prisma.service";

/**
 * This function returns all accounts if no page is provided (0) or the number of records to skip and take if page is
 * higher than 1
 *
 * @param prismaService - Prisma Service instance
 * @param page - How many records to skip
 * @returns skip and take values to use in repository
 */
export const getPagination = async (
  prismaService: PrismaService,
  page: number,
) => {
  const take = page >= 20 ? 20 : await prismaService.accounts.count();

  if (page === 20) {
    page = 0;
  }

  const pagination = {
    skip: page,
    take,
  };

  return pagination;
};

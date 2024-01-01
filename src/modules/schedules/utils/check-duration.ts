import { BadRequestException } from "@nestjs/common";

/**
 * @description Check if schedule is between 30 minutes and 2 hours
 *
 * @param fromDate datetime when schedule will start
 * @param toDate datetime when schedule will end
 */
export default function checkDuration(fromDate: Date, toDate: Date) {
  const from = new Date(fromDate);
  const to = new Date(toDate);

  const diff = Math.abs(to.getTime() - from.getTime());
  const minutes = Math.floor(diff / 1000 / 60);

  if (minutes < 30) {
    throw new BadRequestException(
      "Schedule duration must be at least 30 minutes",
    );
  }

  if (minutes > 120) {
    throw new BadRequestException(
      "Schedule duration must be less than 2 hours",
    );
  }
}

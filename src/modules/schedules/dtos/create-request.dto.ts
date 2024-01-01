import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNumber, MinDate } from "class-validator";

export class CreateScheduleRequestDto {
  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @MinDate(new Date())
  fromDate: Date;

  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @MinDate(new Date())
  toDate: Date;

  @ApiProperty()
  @IsNumber()
  brokerId: number;
}

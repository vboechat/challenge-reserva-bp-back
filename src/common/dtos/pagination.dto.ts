import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsOptional, IsPositive } from "class-validator";

export class PaginationDto {
  @IsNumberString()
  @IsPositive()
  @IsOptional()
  @ApiProperty({ default: 0 })
  page?: number;
}

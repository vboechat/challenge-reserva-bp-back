import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseIdPipe implements PipeTransform {
  transform(id: number) {
    if (isNaN(id)) {
      throw new BadRequestException();
    }

    const positiveId = Math.abs(id);

    return positiveId;
  }
}

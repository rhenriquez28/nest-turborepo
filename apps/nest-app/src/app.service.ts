import { NestLibService } from "@app/nest-lib";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  constructor(private nestLibService: NestLibService) {}

  getHello(): string {
    return "Hello World! " + this.nestLibService.getHello();
  }
}

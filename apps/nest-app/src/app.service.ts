import { NestLibService } from "nest-lib";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  constructor(private nestLibService: NestLibService) {}

  getHello(): string {
    return "Hello World! heyyy" + this.nestLibService.getHello();
  }
}

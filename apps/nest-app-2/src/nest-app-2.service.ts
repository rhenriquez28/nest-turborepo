import { NestLib2Service } from "@app/nest-lib-2";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NestApp2Service {
  constructor(private nestLib2Service: NestLib2Service) {}

  getHello(): string {
    return "Hello World!" + this.nestLib2Service.getHello();
  }
}

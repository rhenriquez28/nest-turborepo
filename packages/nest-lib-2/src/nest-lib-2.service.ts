import { Injectable } from "@nestjs/common";

@Injectable()
export class NestLib2Service {
  getHello() {
    return "hellooooo";
  }
}

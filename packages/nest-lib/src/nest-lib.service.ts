import { Injectable } from "@nestjs/common";

@Injectable()
export class NestLibService {
  getHello() {
    return "hello from nest lib!!!! heyyyyyy";
  }
}

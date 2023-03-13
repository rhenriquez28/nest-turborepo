import { Module } from "@nestjs/common";
import { NestLib2Module } from "@app/nest-lib-2";
import { NestApp2Controller } from "./nest-app-2.controller";
import { NestApp2Service } from "./nest-app-2.service";

@Module({
  imports: [NestLib2Module],
  controllers: [NestApp2Controller],
  providers: [NestApp2Service],
})
export class NestApp2Module {}

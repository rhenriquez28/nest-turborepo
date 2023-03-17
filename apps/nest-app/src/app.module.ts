import { NestLibModule } from "nest-lib";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [NestLibModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

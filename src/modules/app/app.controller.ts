import { Body, Controller, Get, Post, UseGuards, UsePipes } from "@nestjs/common";
import { AppService } from "./app.service";
// import { IntToFloatPipe } from "@/common/pipes/int-to-float.pipe";
import { AuthGuard } from "../../common/guards/auth.guard";
import { UserAgent } from "../../common/decorators/user-agent.decorator";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard)
  @Get("@me")
  getProfile(@UserAgent() userAgent: string) {
    return {
      id: "Ты тупой",
      email: "Твой email тупой",
      name: "Твое имя тупое",
      userAgent,
    };
  }

  // @UsePipes(IntToFloatPipe)
  @Post()
  create(@Body("number") number: number) {
    return `Число ${number}`;
  }
}

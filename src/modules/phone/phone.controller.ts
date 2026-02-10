import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { PhoneService } from "./phone.service";
import { PhoneDto } from "./dto/phone.dto";

@Controller("phone")
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Get()
  getAll() {
    return this.phoneService.getAll();
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.phoneService.findById(id);
  }

  @Post()
  create(@Body() dto: PhoneDto) {
    return this.phoneService.create(dto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.phoneService.delete(id);
  }
}

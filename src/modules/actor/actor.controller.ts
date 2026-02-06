import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorDto } from './dto/actor.dto';

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get(":id")
  findById(@Param('id') id: string) {
    return this.actorService.findById(id)
  }

  @Post()
  create(@Body() dto: ActorDto) {
    return this.actorService.create(dto)
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: ActorDto) {
    return this.actorService.update(id, dto)
  }
}

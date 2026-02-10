import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ActorEntity } from "./entities/actor.entity";
import { Repository } from "typeorm";
import { ActorDto } from "./dto/actor.dto";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class ActorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: ActorDto) {
    const { name } = dto;

    return await this.prisma.actor.create({
      data: {
        name,
      },
    });
  }

  async findById(id: string) {
    const actor = await this.prisma.actor.findUnique({
      where: {
        id,
      },
    });

    if (!actor) {
      throw new NotFoundException("Нет такого автора");
    }

    return actor;
  }

  async update(id: string, dto: ActorDto) {
    const actor = await this.findById(id);

    const { name } = dto;

    const updatedActor = await this.prisma.actor.update({
      where: { id },
      data: {
        name,
      },
    });

    return updatedActor;
  }

  // async create(dto: CreateActorDto): Promise<ActorEntity> {
  //   const { name } = dto;

  //   const actor = this.actorRepository.create({ name });

  //   return await this.actorRepository.save(actor);
  // }
}

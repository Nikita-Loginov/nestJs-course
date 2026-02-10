import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MovieEntity } from "./entities/movie.entity";
import { In, Repository } from "typeorm";
import { MovieDto } from "./dto/movie.dto";
import { ActorEntity } from "../actor/entities/actor.entity";
import { PosterMovieEntity } from "./entities/poster.entity";
import { PrismaService } from "../../prisma/prisma.service";
@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}

  findAll({ limit = 1, page = 1 }: { limit?: number; page?: number } = {}) {
    if (isNaN(limit) || limit <= 0) {
      throw new NotFoundException("Недопустимое значение limit");
    }

    if (isNaN(page) || page <= 0) {
      throw new NotFoundException("Недопустимое значение page");
    }

    return this.prisma.movie.findMany({
      include: {
        actors: true,
        reviews: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async findById(id: string) {
    const movie = await this.prisma.movie.findUnique({
      where: {
        id,
      },
      include: {
        poster: true,
        actors: true,
        reviews: true,
      }
    });

    if (!movie) {
      throw new NotFoundException("Фильм не найден");
    }

    return movie;
  }

  async create(dto: MovieDto) {
    const { title, releaseYear, actorIds, imageUrl } = dto;

    const actors = await this.prisma.actor.findMany({
      where: {
        id: {
          in: actorIds,
        },
      },
    });

    if (!actors || !actors.length) {
      throw new NotFoundException("Нет такого актера");
    }

    const movie = await this.prisma.movie.create({
      data: {
        title,
        releaseYear,
        actors: {
          connect: actorIds.map(id => ({ id })),
        },
        poster: imageUrl
          ? {
              create: {
                url: imageUrl,
              },
            }
          : undefined,
      },
    });

    return movie;
  }

  async update(id: string, dto: MovieDto) {
    const movie = await this.findById(id);

    const { title, releaseYear, actorIds } = dto;

    const updatedMovie = await this.prisma.movie.update({
      where: {id},
      data: {
        title,
        releaseYear,
        actors: actorIds && actorIds.length > 0 ? {
          connect: actorIds.map(id => ({ id })),
        } : undefined,
      },
      include: {
        actors: true,
        reviews: true,
      }
    })

    return updatedMovie;
  }

  async delete(id : string) {
    const movie = await this.findById(id);

    await this.prisma.movie.delete({
      where: {
        id
      }
    })

    return true
  }

  // async findAll(): Promise<MovieEntity[]> {
  //   return this.moviesRepository.find({
  //     order: {
  //       createdAt: "desc",
  //     },
  //     relations: ["reviews", "actors", "poster"],
  //   });
  // }

  // async create(dto: MovieDto): Promise<MovieEntity> {
  //   const { title, releaseYear, actorIds, imageUrl } = dto;

  //   const actors = await this.actorsRepository.find({
  //     where: {
  //       id: In(actorIds),
  //     },
  //   });

  //   if (!actors || !actors.length) {
  //     throw new NotFoundException("Нет такого актера");
  //   }

  //   let poster: PosterMovieEntity | null = null;

  //   if (imageUrl) {
  //     poster = this.posterRepository.create({ url: imageUrl });

  //     await this.posterRepository.save(poster);
  //   }

  //   const movie = this.moviesRepository.create({ title, releaseYear, actors, poster });

  //   return await this.moviesRepository.save(movie);
  // }

  // async findById(id: string): Promise<MovieEntity> {
  //   const movie = await this.moviesRepository.findOne({
  //     where: {
  //       id,
  //     },
  //   });

  //   if (!movie) {
  //     throw new NotFoundException("Фильм не найден");
  //   }

  //   return movie;
  // }

  // async update(id: string, dto: MovieDto): Promise<MovieEntity> {
  //   const movie = await this.findById(id);

  //   const updateMovie = Object.assign(movie, dto);

  //   return this.moviesRepository.save(updateMovie);
  // }

  // async delete(id: string): Promise<boolean> {
  //   await this.findById(id);

  //   await this.moviesRepository.delete(id);

  //   return true;
  // }
}

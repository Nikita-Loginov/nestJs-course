import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MovieEntity } from "./entities/movie.entity";
import { In, Repository } from "typeorm";
import { MovieDto } from "./dto/movie.dto";
import { ActorEntity } from "src/actor/entities/actor.entity";
import { PosterMovieEntity } from "./entities/poster.entity";

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity) private moviesRepository: Repository<MovieEntity>,
    @InjectRepository(ActorEntity) private actorsRepository: Repository<ActorEntity>,
    @InjectRepository(PosterMovieEntity) private posterRepository: Repository<PosterMovieEntity>
  ) {}

  async findAll(): Promise<MovieEntity[]> {
    return this.moviesRepository.find({
      order: {
        createdAt: "desc",
      },
      relations: ["reviews", "actors", "poster"],
    });
  }

  async create(dto: MovieDto): Promise<MovieEntity> {
    const { title, releaseYear, actorIds, imageUrl } = dto;

    const actors = await this.actorsRepository.find({
      where: {
        id: In(actorIds),
      },
    });

    if (!actors || !actors.length) {
      throw new NotFoundException("Нет такого актера");
    }

    let poster: PosterMovieEntity | null = null;

    if (imageUrl) {
      poster = this.posterRepository.create({ url: imageUrl });

      await this.posterRepository.save(poster);
    }

    const movie = this.moviesRepository.create({ title, releaseYear, actors, poster });

    return await this.moviesRepository.save(movie);
  }

  async findById(id: string): Promise<MovieEntity> {
    const movie = await this.moviesRepository.findOne({
      where: {
        id,
      },
    });

    if (!movie) {
      throw new NotFoundException("Фильм не найден");
    }

    return movie;
  }

  async update(id: string, dto: MovieDto): Promise<MovieEntity> {
    const movie = await this.findById(id);

    const updateMovie = Object.assign(movie, dto);

    return this.moviesRepository.save(updateMovie);
  }

  async delete(id: string): Promise<boolean> {
    await this.findById(id);

    await this.moviesRepository.delete(id);

    return true;
  }
}

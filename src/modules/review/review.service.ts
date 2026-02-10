import { Body, Injectable, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReviewEntity } from "./entities/review.entity";
import { Repository } from "typeorm";
import { CreateReviewDto } from "./dto/create-review.dto";
import { MovieService } from "../movie/movie.service";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class ReviewService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly movieService: MovieService
  ) {}

  async create(dto: CreateReviewDto) {
    const { text, movieId, rating } = dto;

    const movie = await this.movieService.findById(movieId);

    const review = await this.prisma.review.create({
      data: {
        text,
        movieId,
        rating
      }
    })

    return review
  }

  // async create(dto: CreateReviewDto): Promise<ReviewEntity> {
  //   const {text, movieId, rating } = dto;

  //   const movie = await this.movieService.findById(movieId);

  //   const review = this.reviewsRepository.create({text, movie, rating})

  //   return await this.reviewsRepository.save(review)
  // }
}

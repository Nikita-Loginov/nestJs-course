import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ReviewEntity } from './entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from '../movie/entities/movie.entity';
import { MovieService } from '../movie/movie.service';
import { ActorEntity } from '../actor/entities/actor.entity';
import { PosterMovieEntity } from '../movie/entities/poster.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([ReviewEntity, MovieEntity, ActorEntity, PosterMovieEntity])],
  controllers: [ReviewController],
  providers: [ReviewService, MovieService],
})
export class ReviewModule {}

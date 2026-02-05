import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { ReviewEntity } from '../review/entities/review.entity';
import { ActorEntity } from '../actor/entities/actor.entity';
import { PosterMovieEntity } from './entities/poster.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([MovieEntity, ReviewEntity, ActorEntity, PosterMovieEntity])],
  controllers: [MovieController],
  providers: [MovieService],
  // exports: [MovieService]
})
export class MovieModule {}

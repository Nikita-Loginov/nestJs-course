import { ActorEntity } from "src/modules/actor/entities/actor.entity";
import { ReviewEntity } from "../../review/entities/review.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { PosterMovieEntity } from "./poster.entity";

export enum Genre {
  ACTION = "action",
  COMEDY = "comedy",
}

@Entity({ name: "movies" })
export class MovieEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 128,
  })
  title: string;

  @Column({
    type: "text",
    nullable: true,
    default: "",
  })
  description: string;

  @Column({
    name: "release_year",
    type: "int",
    unsigned: true,
  })
  releaseYear: number;

  @Column({
    type: "decimal",
    precision: 3,
    scale: 1,
    default: 0.0,
  })
  rating: number;

  @Column({
    type: "enum",
    enum: Genre,
    default: Genre.COMEDY,
  })
  genre: Genre;

  @Column({
    name: 'poster_id',
    type: 'uuid',
    nullable: true,
  })
  posterId: string;

  @OneToOne(() => PosterMovieEntity, (poster) => poster.movie, {onDelete: 'CASCADE', nullable: true})
  @JoinColumn({name: 'poster_id'})
  poster: PosterMovieEntity | null

  @OneToMany(() => ReviewEntity, (review) => review.movie)
  reviews: ReviewEntity[]

  @ManyToMany(() => ActorEntity, (actor) => actor.movies)
  @JoinTable({
    name: 'movie_actors',
    joinColumn: {name: 'movie_id', referencedColumnName: 'id'},
    inverseJoinColumn: {name: 'actor_id', referencedColumnName: 'id'}
  })
  actors: ActorEntity[]

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt: Date;
}

import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MovieEntity } from "./movie.entity";

@Entity({
  name: "poster_movie",
})
export class PosterMovieEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  url: string;

  @OneToOne(() => MovieEntity, (movie) => movie.poster)
  movie: MovieEntity[]

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt: Date;
}

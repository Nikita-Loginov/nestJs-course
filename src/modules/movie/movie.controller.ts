import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MovieDto } from "./dto/movie.dto";

@Controller("movie")
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  findAll(@Query() query: { limit?: string; page?: string }) {
    const { limit, page } = query;

    return this.movieService.findAll({ limit: +limit, page: +page });
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.movieService.findById(id);
  }

  @Post()
  create(@Body() dto: MovieDto) {
    return this.movieService.create(dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: MovieDto) {
    return this.movieService.update(id, dto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.movieService.delete(id);
  }
}

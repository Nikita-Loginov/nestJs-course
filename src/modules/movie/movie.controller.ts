import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MovieDto } from "./dto/movie.dto";
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FindAllMovieQueryDto } from "./dto/find-all-movie.query.dto";
@Controller("movie")
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({
    summary: "Получить все фильмы",
    description: "Возвращает список всех фильмом",
  })
  @ApiResponse({status: HttpStatus.OK, description: "Фильмы получены"})
  @Get()
  findAll(@Query() query: FindAllMovieQueryDto) {
    const { limit, page } = query;

    return this.movieService.findAll({ limit: +limit, page: +page });
  }

  @ApiOperation({
    summary: "Получить фильм",
    description: "Возвращает фильм",
  })
  @Get(":id")
  @ApiResponse({status: HttpStatus.OK, description: "Фильм получен"})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: "Фильм не найден"})
  findById(@Param("id") id: string) {
    return this.movieService.findById(id);
  }

  @ApiOperation({ summary: 'Создать фильм' })
  @Post()
  create(@Body() dto: MovieDto) {
    return this.movieService.create(dto);
  }

  @ApiOperation({ summary: 'Обновить фильм' })
  @Put(":id")
  update(@Param("id") id: string, @Body() dto: MovieDto) {
    return this.movieService.update(id, dto);
  }

  @ApiOperation({ summary: 'Удалить фильм' })
  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.movieService.delete(id);
  }
}

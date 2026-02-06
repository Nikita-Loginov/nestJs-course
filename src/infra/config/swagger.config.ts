import {  DocumentBuilder } from "@nestjs/swagger";

export const getSwaggerConfig = () => {
  return new DocumentBuilder()
    .setTitle("Документация для api")
    .setDescription("Документация для курса nest js")
    .setTitle("1.0.0")
    .build();
};

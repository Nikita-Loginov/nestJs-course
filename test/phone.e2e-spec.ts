import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import request from "supertest";
import { App } from "supertest/types";
import { AppModule } from "../src/modules/app/app.module";
import { PrismaService } from "../src/prisma/prisma.service";
import { PhoneDto } from "../src/modules/phone/dto/phone.dto";

const dto: PhoneDto = {
  brand: "some brand",
  price: 300,
};

describe("PhoneController (e2e)", () => {
  let app: INestApplication<App>;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());

    await app.init();

    prisma = app.get(PrismaService);
  });

  afterAll(async () => {
    await prisma.phone.deleteMany();
    await app.close();
  });

  it("POST /phone - should create phone", async () => {
    const response = await request(app.getHttpServer()).post("/phone").send(dto);

    expect(response.body).toMatchObject(dto);
    expect(response.body).toHaveProperty("id");
  });

  it("GET /phone/:id - should return 404 if phone not found", async () => {
    await request(app.getHttpServer()).get("/phone/12345").expect(404);
  });

  it("GET /phone/:id - should return phone by id", async () => {
    const created = await request(app.getHttpServer()).post("/phone").send(dto);

    const phoneId = created.body.id;

    const response = await request(app.getHttpServer()).get(`/phone/${phoneId}`);

    expect(response.body).toMatchObject({
      id: phoneId,
      brand: dto.brand,
      price: dto.price,
    });
  });
});

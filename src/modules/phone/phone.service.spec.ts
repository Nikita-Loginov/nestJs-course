import { v4 as uuid4 } from "uuid";
import { PhoneDto } from "./dto/phone.dto";
import { PhoneService } from "./phone.service";
import { PrismaService } from "../../prisma/prisma.service";
import { Test, TestingModule } from "@nestjs/testing";

const phoneId = uuid4();

const phones: (PhoneDto & { id: string })[] = [
  {
    id: phoneId,
    brand: "some brand name",
    price: 300,
  },
  {
    id: uuid4(),
    brand: "some brand name",
    price: 300,
  },
  {
    id: uuid4(),
    brand: "some brand name",
    price: 300,
  },
];

const phone: PhoneDto & { id: string } = phones[0];

const phoneServiceMock = {
  phone: {
    findMany: jest.fn().mockResolvedValue(phones),
    findUnique: jest.fn().mockResolvedValue(phone),
    create: jest.fn().mockResolvedValue(phone),
    delete: jest.fn().mockResolvedValue({ message: "phone удален" }),
  },
};
describe("Phone Service", () => {
  let service: PhoneService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhoneService,
        {
          provide: PrismaService,
          useValue: phoneServiceMock,
        },
      ],
    }).compile();

    service = module.get<PhoneService>(PhoneService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return an array of phones", async () => {
    const phonesRes = await service.getAll();
    expect(phonesRes).toEqual(phones);
  });

  it("should return a phone by id", async () => {
    expect(service.findById(phoneId)).resolves.toEqual(phone);
  });

  it("should create a new phone", async () => {
    expect(
      service.create({
        brand: "new Brand",
        price: 300,
      })
    ).resolves.toEqual(phone);
  });

  it("should delete phone", async () => {
    expect(service.delete(phoneId)).resolves.toEqual({ message: "phone удален" });
  });
});

import { Test, TestingModule } from "@nestjs/testing";
import { PhoneController } from "./phone.controller";
import { PhoneService } from "./phone.service";
import { v4 as uuid4 } from "uuid";
import { PhoneDto } from "./dto/phone.dto";
import { NotFoundException } from "@nestjs/common";

const phoneId = uuid4();

const phone: PhoneDto & { id: string } = {
  id: phoneId,
  brand: "test brand",
  price: 200,
};

const phoneServiceMock = {
  getAll: jest.fn().mockResolvedValue([phone]),
  findById: jest.fn().mockResolvedValue(phone),
  create: jest.fn().mockResolvedValue(phone),
  delete: jest.fn().mockResolvedValue({ message: "phone удален" }),
};

describe("Phone Controller", () => {
  let controller: PhoneController;
  let service: PhoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneController],
      providers: [
        {
          provide: PhoneService,
          useValue: phoneServiceMock,
        },
      ],
    }).compile();

    controller = module.get<PhoneController>(PhoneController);
    service = module.get<PhoneService>(PhoneService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return an array of phones", async () => {
    const res = await controller.getAll();
    expect(res).toEqual([phone]);
  });

  it("should return a phone by id", async () => {
    const res = await controller.findById(phoneId);
    expect(res).toEqual(phone);
  });

  it("should throw an exception if phone not found", async () => {
    service.findById = jest.fn().mockRejectedValue(
      new NotFoundException("Телефон не найден")
    );

    await expect(controller.findById("12345")).rejects.toThrow(NotFoundException);
    
    await expect(controller.findById("12345")).rejects.toThrow("Телефон не найден");
  });

  it("should create a new phone", async () => {
    const res = await controller.create({
      brand: "new Brand",
      price: 300,
    });
    expect(res).toEqual(phone);
  });

  it("should delete phone", async () => {
    const res = await controller.delete(phoneId);
    expect(res).toEqual({ message: "phone удален" });
  });
});

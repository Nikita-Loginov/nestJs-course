import { PrismaService } from "../../prisma/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PhoneDto } from "./dto/phone.dto";

@Injectable()
export class PhoneService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.phone.findMany({
      select: {
        id: true,
        brand: true,
        price: true,
      },
    });
  }

  async findById(id: string) {
    const phone = await this.prisma.phone.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        brand: true,
        price: true,
      },
    });

    if (!phone) {
      throw new NotFoundException("Телефон не найден");
    }

    return phone;
  }

  async create(dto: PhoneDto) {
    const { brand, price } = dto;

    const phone = await this.prisma.phone.create({
      data: {
        brand,
        price,
      },
      select: {
        id: true,
        brand: true,
        price: true,
      },
    });

    return phone;
  }

  async delete(id: string) {
    const phone = await this.findById(id);

    await this.prisma.phone.delete({
      where: {
        id,
      },
    });

    return {
      message: "phone удален",
    };
  }
}

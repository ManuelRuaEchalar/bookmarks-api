import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId?: number) {
    return this.prisma.book.findMany({
      where: userId ? { userId } : {}, // Optionally filter by userId
    });
  }

  async getBookById(id: number, userId?: number) {
    return this.prisma.book.findUnique({
      where: {
        id,
        ...(userId && { userId }), // Optionally filter by userId
      },
    });
  }

  async create(userId: number, createBookDto: CreateBookDto) {
    return this.prisma.book.create({
      data: {
        userId,
        ...createBookDto,
      },
    });
  }

  async update(id: number, updateBookDto: CreateBookDto, userId?: number) {
    return this.prisma.book.update({
      where: {
        id,
        ...(userId && { userId }), // Optionally filter by userId
      },
      data: updateBookDto,
    });
  }

  async remove(id: number, userId?: number) {
    const book = await this.prisma.book.findUnique({
      where: {
        id,
        ...(userId && { userId }), // Optionally filter by userId
      },
    });

    if (!book) {
      throw new Error('Book not found or access denied');
    }

    await this.prisma.book.delete({
      where: { id },
    });

    return book;
  }
}
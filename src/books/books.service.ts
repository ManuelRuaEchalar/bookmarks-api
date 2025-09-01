import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
 constructor(private prisma: PrismaService) {}
 private books = [];

findAll() {
 return this.books;
 }

getBookById(id: number) {
    return this.prisma.book.findFirst({
      where: {
        id: id,
        //userId,
      },
    });
}

async create(userId: number, createBookDto: CreateBookDto) {
 const book =
      await this.prisma.book.create({
        data: {
          userId,
          ...createBookDto,
        },
      });
    return book;
}

update(id: number, updateBookDto: CreateBookDto) {
 const book = this.getBookById(id);
 if (book) {
 Object.assign(book, updateBookDto);
 return book;
 }
 return null;
 }

async remove(id: number) {
    const book =
      await this.prisma.book.findUnique({
        where: {
          id: id,
        },
      });

    // check if user owns the bookmark
    //if (!book || book. !== userId)
      //throw new ForbiddenException(
        //'Access to resources denied',
      //);

    await this.prisma.book.delete({
      where: {
        id: id,
      },
    });
  }

}
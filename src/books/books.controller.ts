import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('books')
export class BooksController {
 constructor(private readonly booksService: BooksService) {}

@Get()
findAll(@GetUser('id') userId: number) {
  return this.booksService.findAll(userId);
}

@Get(':id')
findOne(@Param('id') id: string, @GetUser('id') userId: number) {
  return this.booksService.getBookById(+id, userId);
}

@Post()
 create(
    @GetUser('id') userId: number,
    @Body() createBookDto: CreateBookDto) {
 return this.booksService.create(userId, createBookDto);
 }

 @Put(':id')
update(@Param('id') id: string, @Body() updateBookDto: CreateBookDto, @GetUser('id') userId: number) {
  return this.booksService.update(+id, updateBookDto, userId);
}

@Delete(':id')
remove(@Param('id') id: string, @GetUser('id') userId: number) {
  return this.booksService.remove(+id, userId);
}

}
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
 findAll() {
 return this.booksService.findAll();
 }

@Get(':id')
 findOne(@Param('id') id: string) {
 return this.booksService.getBookById(+id);
 }

@Post()
 create(
    @GetUser('id') userId: number,
    @Body() createBookDto: CreateBookDto) {
 return this.booksService.create(userId, createBookDto);
 }

@Put(':id')
 update(@Param('id') id: string, @Body() updateBookDto: CreateBookDto) {
 return this.booksService.update(+id, updateBookDto);
 }

@Delete(':id')
 remove(@Param('id') id: string) {
 return this.booksService.remove(+id);
 }

}
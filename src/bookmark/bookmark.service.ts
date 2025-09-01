import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateBookmarkDto,
  EditBookmarkDto,
} from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        book: {
          userId,
        },
      },
    });
  }

  async getBookmarkById(
    userId: number,
    bookmarkId: number,
  ) {
    return this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        book: {
          userId,
        },
      },
    });
  }

  async createBookmark(
    userId: number,
    dto: CreateBookmarkDto,
  ) {
    const { bookId, ...bookmarkData } = dto;

    // Check if the book exists and belongs to the user
    const book = await this.prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book || book.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }

    // Create the bookmark attached to the book
    const bookmark = await this.prisma.bookmark.create({
      data: {
        bookId,
        ...bookmarkData,
      },
    });

    return bookmark;
  }

  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {
    // Get the bookmark with its book relation
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: bookmarkId },
      include: { book: true },
    });

    // Check if bookmark exists and the book belongs to the user
    if (!bookmark || bookmark.book.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }

    // Update the bookmark
    return this.prisma.bookmark.update({
      where: { id: bookmarkId },
      data: { ...dto },
    });
  }

  async deleteBookmarkById(
    userId: number,
    bookmarkId: number,
  ) {
    // Get the bookmark with its book relation
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: bookmarkId },
      include: { book: true },
    });

    // Check if bookmark exists and the book belongs to the user
    if (!bookmark || bookmark.book.userId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }

    // Delete the bookmark
    await this.prisma.bookmark.delete({
      where: { id: bookmarkId },
    });
  }
}
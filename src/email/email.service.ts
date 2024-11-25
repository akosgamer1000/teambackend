import { Injectable } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EmailService {
  db: PrismaService;
  constructor(db: PrismaService) {
    this.db = db;
  }
  create(createEmailDto: CreateEmailDto) {
    return 'This action adds a new email';
  }

  findAll() {
    return `This action returns all email`;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

  update(id: number, updateEmailDto: UpdateEmailDto) {
    return `This action updates a #${id} email`;
  }

  async remove(id: number) {
    try {
      await this.db.email.delete({
        where: { id }
      })
      return true;
    } catch {
      return false;
    }

  }
}

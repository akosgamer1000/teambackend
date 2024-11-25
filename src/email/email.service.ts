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
    return this.db.email.create({
      data: createEmailDto
    })
  }

  async findAll() {
    return await this.db.email.findMany() ;
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

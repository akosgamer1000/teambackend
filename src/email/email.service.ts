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

  async findAll() {
    return await this.db.email.findMany() ;
  }

  findOne(id: number) {
    return `This action returns a #${id} email`;
  }

 async update(id: number, updateEmailDto: UpdateEmailDto) {
    return await this.db.email.update({
      where: {
        id,
      },
      data: {
        sender: updateEmailDto.sender,
        receiver: updateEmailDto.receiver,
        subject: updateEmailDto.subject,
        content: updateEmailDto.content
      }
    })
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

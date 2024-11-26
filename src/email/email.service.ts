import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateEmailDto } from './dto/create-email.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EmailService {
  errors: string[];

  constructor(private db: PrismaService) {
  }
  create(createEmailDto: CreateEmailDto) {
    
    const { sender, receiver, subject, content } = createEmailDto;
    
    //validate createEmailDto
    this.errors = [];

    if (!sender || !receiver || !subject || !content) {
      this.errors.push('Az adatok nem lehetnek üresek!');
    }

    if (sender === receiver) {
      this.errors.push('A küldő és a címzett nem lehet ugyanaz!');
    }

    if (subject.length < 3) {
      this.errors.push('A tárgynak minimum 3 karakternek kell lennie!');
    }

    if (content.length < 10) {
      this.errors.push('A tartalomnak minimum 10 karakternek kell lennie!');
    }

    if (!RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(sender) || !RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(receiver)) {
      this.errors.push('A küldő és a címzettnek email címnek kell lennie!');
    }

    if (this.errors.length > 0) {
      throw new HttpException(this.errors, HttpStatus.BAD_REQUEST);
    }

    return this.db.email.create({
      data: createEmailDto
    })
  }

  async findAll() {
    return await this.db.email.findMany() ;
  }

  findOne(id: number) {
    return this.db.email.findUnique({
      where: { id: id }
    })
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

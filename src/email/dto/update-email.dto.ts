import { PartialType } from '@nestjs/mapped-types';
import { CreateEmailDto } from './create-email.dto';

export class UpdateEmailDto {
    subject?: string;
    content?: string;
}

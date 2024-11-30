import { Column } from 'typeorm';
import { ModelTemplate } from './modelTemplate';

export class User extends ModelTemplate {
  @Column('text', { nullable: false })
  firstName: string;
  @Column('text', { nullable: true })
  lastName: string | null;
  @Column('text', { nullable: false })
  email: string;
  @Column('text', { nullable: true })
  phone: number | null;
}

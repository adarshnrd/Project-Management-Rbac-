import { Column, Entity } from 'typeorm';
import { ModelTemplate } from './modelTemplate';

@Entity({ name: 'users' })
export class UserModel extends ModelTemplate {
  @Column('text', { nullable: false })
  firstName: string;
  @Column('text', { nullable: true })
  lastName: string | null;
  @Column('varchar', { nullable: false, unique: true })
  email: string;
  @Column('text', { nullable: true })
  phone: number | null;
  @Column('text')
  companyName: string | null;
  @Column('boolean', { default: false })
  verifiedUser: boolean;
}

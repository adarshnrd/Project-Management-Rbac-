import { Column, Entity, ManyToOne, Index } from 'typeorm';
import { ModelTemplate } from './modelTemplate';
import { UserModel } from './userModel';

@Entity({ name: 'timeSheet' })
@Index(['date', 'userKey', 'projectName'], { unique: true })
export class TimeSheetModel extends ModelTemplate {
  @Column('date', { nullable: false })
  date: Date;
  @Column('varchar', { nullable: false })
  projectName: string;
  @Column('text', { nullable: false })
  description: string;
  @Column('varchar', { nullable: false })
  workingPosition: string;
  @Column('int', { nullable: false })
  hoursSpent: number;

  @Column('int', { nullable: false })
  userKey: number;

  @ManyToOne(() => UserModel, (user) => user.timelines, { onDelete: 'CASCADE' })
  user: UserModel;
}

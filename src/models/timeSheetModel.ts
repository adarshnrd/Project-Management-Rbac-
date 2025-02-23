import { Column, Entity, ManyToOne } from 'typeorm';
import { ModelTemplate } from './modelTemplate';
import { UserModel } from './userModel';

@Entity({ name: 'timeSheet' })
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

  @ManyToOne(() => UserModel, (user) => user.timelines, { onDelete: "CASCADE" })
  user: UserModel;
}

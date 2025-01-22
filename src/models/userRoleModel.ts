import { Column, Entity, OneToOne } from 'typeorm';
import { ModelTemplate } from './modelTemplate';
import { UserModel } from './userModel';
import { UserRoleEnumType } from '#src/enum/userRole';

@Entity({ name: 'userRole' })
export class UserRoleModel extends ModelTemplate {
  @Column('varchar', { nullable: false, default: UserRoleEnumType.ServiceUser })
  role: UserRoleEnumType;

  @OneToOne(() => UserModel, (userModel) => userModel.roleModel)
  public userModel: UserModel;
}

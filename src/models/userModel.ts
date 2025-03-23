import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { ModelTemplate } from './modelTemplate';
import { CryptoDataEncryption } from '#utils/crypto';
import { UserRoleModel } from './userRoleModel';
import { TimeSheetModel } from './timeSheetModel';

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
  @Column('varchar', { default: null })
  public password: string | null;

  @OneToOne(() => UserRoleModel, (role) => role.userModel)
  @JoinColumn()
  roleModel: UserRoleModel;

  @OneToMany(() => TimeSheetModel, (timeline) => timeline.user)
  timelines: TimeSheetModel[];

  @BeforeInsert()
  @BeforeUpdate()
  async encryptPass() {
    if (this.password) {
      this.password = CryptoDataEncryption.encryptEmail(this.password);
    }
  }

  @AfterLoad()
  async decryptPass() {
    if (this.password) {
      this.password = CryptoDataEncryption.decryptEmail(this.password);
    }
  }
}

import {
  Column,
  CreateDateColumn,
  Generated,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export abstract class ModelTemplate {
  @PrimaryGeneratedColumn('increment')
  public key: number;

  @Index({ unique: true })
  @Column('uuid')
  @Generated('uuid')
  public id: string;

  @CreateDateColumn()
  public createAt: Date;

  @UpdateDateColumn()
  public updateAt: Date;

  @VersionColumn()
  public version: number;

  @Column('bool', { default: false })
  public deleted: boolean;
}

export interface ModelTemplateClass<ModelTemplate> {
  new (...args: any[]): ModelTemplate;
}

import { UserRoleModel } from '#models/userRoleModel';
import { AppDataSource } from '#src/config';
import { Repository } from 'typeorm';

export class UserRoleRepository {
  private _userRoleRepository: Repository<UserRoleModel>;
  constructor() {
    this._userRoleRepository = AppDataSource.getRepository(UserRoleModel);
  }
  public async addUserRole(userRoleModel: UserRoleModel): Promise<UserRoleModel> {
    return await this._userRoleRepository.save(userRoleModel);
  }
}

import { UserModel } from '#models/userModel';
import { UserRoleModel } from '#models/userRoleModel';
import { UserRoleRepository } from '#src/repository/userRoleRepository';

export class UserRoleService {
  private _userRoleRepository: UserRoleRepository;
  constructor(userRoleRepository: UserRoleRepository) {
    this._userRoleRepository = userRoleRepository;
  }
  public async addUserRole(userRoleModel: UserRoleModel, userModel: UserModel): Promise<UserRoleModel> {
    userRoleModel.userModel = userModel;
    return await this._userRoleRepository.addUserRole(userRoleModel);
  }
}

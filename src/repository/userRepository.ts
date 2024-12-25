import { AppDataSource } from 'src/config';
import { UserModel } from 'src/models/userModel';
import { Repository } from 'typeorm';

export default class UserRepository {
  private _userRepository: Repository<UserModel>;
  constructor() {
    this._userRepository = AppDataSource.getRepository(UserModel);
  }

  public async addUserData(userModel: UserModel): Promise<void> {
    await this._userRepository.save(userModel);
  }
}

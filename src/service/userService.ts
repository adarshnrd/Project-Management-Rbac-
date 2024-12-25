import { UserModel } from 'src/models/userModel';
import UserRepository from 'src/repository/userRepository';

export class userService {
  private _userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }
  public async addUserData(userModel: UserModel): Promise<void> {
    await this._userRepository.addUserData(userModel);
  }
}

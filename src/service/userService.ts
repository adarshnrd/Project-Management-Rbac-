import { UserModel } from 'src/models/userModel';
import UserRepository from 'src/repository/userRepository';
import { UpdateResult } from 'typeorm';

export class userService {
  private _userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }
  public async addUserData(userModel: UserModel): Promise<void> {
    await this._userRepository.addUserData(userModel);
  }
  public async getUserData(email: string): Promise<UserModel | null> {
    return await this._userRepository.getUserData(email);
  }
  public async update(userModel: Partial<UserModel>, email: string): Promise<UpdateResult> {
    return await this._userRepository.update(userModel, email);
  }
}

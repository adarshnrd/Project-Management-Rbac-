import { AppDataSource } from 'src/config';
import { UserModel } from '#models/userModel';
import { Repository, UpdateResult } from 'typeorm';

export default class UserRepository {
  private _userRepository: Repository<UserModel>;
  constructor() {
    this._userRepository = AppDataSource.getRepository(UserModel);
  }

  public async addUserData(userModel: UserModel): Promise<void> {
    await this._userRepository.save(userModel);
  }
  public async getUserData(email: string): Promise<UserModel | null> {
    return await this._userRepository.findOne({
      where: {
        email,
      },
    });
  }
  public async update(userModel: Partial<UserModel>, email: string): Promise<UpdateResult> {
    return await this._userRepository.update({ email }, userModel);
  }
  public async delete(email: string): Promise<void> {
    await this._userRepository.delete({ email });
  }
}

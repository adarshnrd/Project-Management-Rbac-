import UserRepository from 'src/repository/userRepository';
import { userService } from 'src/service/userService';

export default class PmContext {
  public userRepository: UserRepository;
  public userService: userService;
  constructor() {
    this.userRepository = new UserRepository();
    this.userService = new userService(this.userRepository);
  }
}

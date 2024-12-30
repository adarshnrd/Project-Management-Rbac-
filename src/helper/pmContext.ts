import EmailService from '#service/emailServices';
import { BREVO_BASE_URL } from '#src/constant';
import BrevoRepository from '#src/repository/brevoRepository';
import UserRepository from 'src/repository/userRepository';
import { userService } from 'src/service/userService';
import { HelperClass } from './helperClass';

const BREVO_API_KEY = process.env.BREVO_API_KEY!;
export default class PmContext {
  public userRepository: UserRepository;
  public userService: userService;
  public emailService: EmailService;
  public brevoRepository: BrevoRepository;
  public helperClass: HelperClass;
  constructor() {
    this.userRepository = new UserRepository();
    this.userService = new userService(this.userRepository);
    this.brevoRepository = new BrevoRepository(BREVO_API_KEY, BREVO_BASE_URL);
    this.emailService = new EmailService(this.brevoRepository);
    this.helperClass = new HelperClass(this);
  }
}

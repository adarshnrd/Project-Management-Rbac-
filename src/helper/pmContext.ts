import logger from '@mindpath/logger';
import type { Logger } from 'winston';

import EmailService from '#service/emailServices';
import { BREVO_BASE_URL } from '#src/constant';
import BrevoRepository from '#src/repository/brevoRepository';
import UserRepository from 'src/repository/userRepository';
import { UserService } from 'src/service/userService';
import { HelperClass } from './helperClass';
import { UserRoleRepository } from '#src/repository/userRoleRepository';
import { UserRoleService } from '#service/userRoleService';

const BREVO_API_KEY = process.env.BREVO_API_KEY!;
export default class PmContext {
  public userRepository: UserRepository;
  public userService: UserService;
  public userRoleRepository: UserRoleRepository;
  public userRoleService: UserRoleService;
  public emailService: EmailService;
  public brevoRepository: BrevoRepository;
  public helperClass: HelperClass;
  public logger: Logger;
  constructor() {
    this.logger = logger;
    this.userRepository = new UserRepository();
    this.userService = new UserService(this.userRepository);
    this.userRoleRepository = new UserRoleRepository();
    this.userRoleService = new UserRoleService(this.userRoleRepository);
    this.brevoRepository = new BrevoRepository(BREVO_API_KEY, BREVO_BASE_URL);
    this.emailService = new EmailService(this.brevoRepository);
    this.helperClass = new HelperClass(this);
  }
}

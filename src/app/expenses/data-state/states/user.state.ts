import { AuthToken } from 'src/app/shared/models/auth-models/auth-token';
import { User } from 'src/app/shared/models/user';

export interface UserState {
  /**
   * User token.
   */
  userToken: AuthToken | null;

  /**
   * User information.
   */
  userInfo: User | null;

  /**
   * Is logging in.
   */
  isLoggingIn: boolean | null;
}

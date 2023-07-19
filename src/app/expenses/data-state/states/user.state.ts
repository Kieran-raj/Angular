import { AuthToken } from 'src/app/shared/models/auth-models/auth-token';
import { SignUpMessage } from 'src/app/shared/models/auth-models/sign-up-message';
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

  /**
   * Error.
   */
  error: {
    message: string | null;
    statusCode: number | null;
  } | null;

  /**
   * User Sign Up Details
   */
  details: SignUpMessage | null;

  /**
   * Is user updated
   */
  isUserUpdated: boolean | null;
}

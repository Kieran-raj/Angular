import { User } from 'src/app/shared/models/user';

export interface UserState {
  /**
   * User token.
   */
  userToken: string | null;

  /**
   * User information.
   */
  userInfo: User | null;

  /**
   * Error.
   */
  error: {
    message: string | null;
    statusCode: number | null;
  } | null;

  /**
   * Is user updated
   */
  isUserUpdated: boolean | null;

  /**
   * Had the user been deleted
   */
  isUserDeleted: boolean | null;
}

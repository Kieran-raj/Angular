export interface UserOptionState {
  [key: string]: {
    options: any[] | null;
    /**
     * Is processing a user option request
     * @type {boolean | null}
     */
    isProcessing: boolean | null;

    /**
     * Is process complete
     * @type {boolean | null}
     */
    isComplete: boolean | null;

    /**
     * Error.
     */
    error: {
      message: string | null;
      statusCode: number | null;
    } | null;
  };
}

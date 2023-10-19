export interface UserOption {
  /**
   * Id
   * @type {Number}
   */
  Id: Number;

  /**
   * UserId
   * @type {string}
   */
  UserId: string;

  /**
   * Option name
   * @type {string}
   */
  OptionName: string;

  /**
   * Option type
   */
  OptionType: { [key: string]: any };

  /**
   * Option value
   */
  OptionValue: { [key: string]: any };

  /**
   * MetaData
   */
  MetaData: { [key: string]: any };
}

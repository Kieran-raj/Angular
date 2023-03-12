import { DataSeries } from './line-data-series';

export interface LineData {
  /**
   * Name of the data set
   */
  name: string;

  /**
   * Series data
   */
  series?: DataSeries[];
}

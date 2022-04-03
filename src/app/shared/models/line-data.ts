import { LineDataSeries } from './line-data-series';

export interface LineData {
  /**
   * Name of the data set
   */
  name: string;

  /**
   * Series data
   */
  series?: LineDataSeries[];
}

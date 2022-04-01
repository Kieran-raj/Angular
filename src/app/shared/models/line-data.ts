import { LineDataSeries } from './line-data-series';

export class LineData {
  /**
   * Name of the data set
   */
  name: string;

  /**
   * Series data
   */
  series?: LineDataSeries[];
}

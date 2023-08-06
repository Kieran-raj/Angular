import { BusinessRuleResult } from './business-rule-result';

export interface BusinessRuleStrategy {
  strategyName: string;
  execute(params: { [key: string]: any }): BusinessRuleResult;
}

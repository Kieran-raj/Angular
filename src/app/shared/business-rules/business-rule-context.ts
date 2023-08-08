import { BusinessRuleResult } from './business-rule-result';
import { BusinessRuleStrategy } from './business-rule-strategy';

export class BuinessRuleContext {
  private businessRuleStrategies: { [key: string]: BusinessRuleStrategy } = {};

  constructor() {}

  executeRule(
    ruleStrategyName: string,
    params: { [key: string]: any }
  ): BusinessRuleResult {
    if (!this.businessRuleStrategies[ruleStrategyName]) {
      throw new Error(
        `${ruleStrategyName} does not exist. Make sure it is registered.`
      );
    } else {
      return this.businessRuleStrategies[ruleStrategyName].execute(params);
    }
  }

  registerRule(rule: BusinessRuleStrategy) {
    if (!this.businessRuleStrategies[rule.strategyName]) {
      this.businessRuleStrategies[rule.strategyName] = rule;
    } else {
      throw new Error(`Rule strategy ${rule.strategyName} already exists`);
    }
  }
}

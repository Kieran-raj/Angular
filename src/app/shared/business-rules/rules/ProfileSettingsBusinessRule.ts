import { BusinessRuleResult } from 'src/app/shared/business-rules/business-rule-result';
import { BusinessRuleStrategy } from 'src/app/shared/business-rules/business-rule-strategy';
import { User } from 'src/app/shared/models/user';

export class ProfileSettingsBusinessRule implements BusinessRuleStrategy {
  strategyName = 'ProfileSettingsBusinessRule';

  execute(params: { [key: string]: any }): BusinessRuleResult {
    if (this.areObjectsEqual(params['initialData'], params['currentData'])) {
      return {
        result: {
          disableSave: true,
          disableCancel: true
        }
      };
    }

    return {
      result: {
        disableSave: false,
        disableCancel: false
      }
    };
  }

  private areObjectsEqual(initialData: User | null, currentData: User | null) {
    return (
      currentData?.email === initialData?.email &&
      currentData?.firstName == initialData?.firstName &&
      currentData?.lastName == initialData?.lastName &&
      currentData?.displayName == initialData?.displayName &&
      currentData?.photo === initialData?.photo
    );
  }
}

import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";

import { AwsProvider } from "./.gen/providers/aws";
import { BudgetsBudget } from "./.gen/providers/aws/budgets-budget";
class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new AwsProvider(this, "aws", {
      region: "eu-central-1",
      profile: "cdk",
    });

    new BudgetsBudget(this, "Test", {
      budgetType: "COST",
      limitAmount: "10",
      limitUnit: "USD",
      timeUnit: "MONTHLY",
      timePeriodStart: "2020-07-01_00:00",
      notification: [
        {
          comparisonOperator: "GREATER_THAN",
          threshold: 80,
          thresholdType: "PERCENTAGE",
          notificationType: "ACTUAL",
          subscriberEmailAddresses: ["stefan@stefreitag.de"],
        },
      ],
    });
  }
}

const app = new App();
new MyStack(app, "budget_notifier");
app.synth();

export interface BudgetNotifierProps {
  /**
   * Budget notifications will be sent to this e-mail address.
   */
  readonly recipient: string;

  /**
   * If specified the application name will be added as tag filter.
   */
  readonly application?: string;
  /**
   * If specified the cost center will be added as tag filter.
   */
  readonly costCenter?: string;

  /**
   * If specified the service will be added as tag filter.
   */
  readonly service?: string;
  /**
   * The threshold value in percent (0-100).
   */
  readonly threshold: number;
  /**
   * The cost associated with the budget threshold.
   */
  readonly limit: number;
  /**
   * The unit of measurement that is used for the budget threshold, such as dollars or GB.
   */
  readonly unit: string;
}

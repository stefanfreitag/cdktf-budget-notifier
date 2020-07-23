import { Construct } from "constructs";
import { BudgetsBudget } from "../.gen/providers/aws";

export interface BudgetNotifierProps {
  /**
   * Budget notifications will be sent to each of the recipients (e-mail addresses).
   */
  readonly recipients: Array<string>;

  /**
   * If specified the availability zones will be added as tag filter.
   */
  readonly availabilityZones?: Array<string>;
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

export class BudgetNotifier extends Construct {
  constructor(scope: Construct, name: string, props: BudgetNotifierProps) {
    super(scope, name);

    if (props.threshold <= 0) {
      throw new Error("Thresholds less than or equal to 0 are not allowed.");
    }

    const costFilters = this.createCostFilters(props);

    new BudgetsBudget(this, "Test", {
      budgetType: "COST",
      limitAmount: props.limit.toString(),
      limitUnit: props.unit,
      timeUnit: "MONTHLY",
      timePeriodStart: "2020-07-01_00:00",
      costFilters: costFilters,
      notification: [
        {
          comparisonOperator: "GREATER_THAN",
          threshold: props.threshold,
          thresholdType: "PERCENTAGE",
          notificationType: "ACTUAL",
          subscriberEmailAddresses: props.recipients,
        },
      ],
    });
  }

  private createCostFilters(props: BudgetNotifierProps) {
    const tags: Array<string> = [];
    if (props.application) {
      tags.push("user:Application$" + props.application);
    }

    if (props.costCenter) {
      tags.push("user:Cost Center$" + props.costCenter);
    }

    if (props.service) {
      tags.push("user:Service$" + props.service);
    }

    //Dirty fix that needs rework
    //https://github.com/terraform-providers/terraform-provider-aws/issues/5890
    if (tags.length>1){
      throw new Error("Thresholds less than or equal to 0 are not allowed.");
    }
    
    const costFilters: any = {};
    if (tags) {
      costFilters["TagKeyValue"] = props.application;
    }

    const availabilityZones: Array<string> = [];
    if (props.availabilityZones) {
      for (const az of props.availabilityZones) {
        availabilityZones.push(az);
      }
      costFilters["AZ"] = availabilityZones;
    }
    return costFilters;
  }
}

# An AWS Budget notifier construct

The construct can be used to setup a billing alert in your AWS account.
Internally it uses the cdktf and the construct library.

## Prerequisites

- Terraform CLI

  ~~~sh
  ❯ terraform -v
  Terraform v0.13.5
  ~~~

- cdktf CLI

  ~~~sh
  ❯ cdktf --version
   0.0.17
  ~~~

## Compiling and Synthesizing

- Installing the required Terraform providers to `.gen\providers`.

  ~~~sh
  ❯ npm run build

  > @stefanfreitag/cdktf-budget_notifier@0.1.0 build /home/stefan/Private/programmieren/aws/cdktf/budget_notifier
  > yarn get && tsc

  yarn run v1.10.1
  $ cdktf get
  Generated typescript constructs in the output directory: .gen
  Done in 5.84s.
  ~~~

- Executing the tests.

  ~~~sh
  ❯ npm run test
  
  > @stefanfreitag/cdktf-budget_notifier@0.1.0 test /home/stefan/Private/programmieren/aws/cdktf/budget_notifier
  > jest

   PASS  test/budget_notifier.test.ts
  ✓ minimal configuration (8 ms)

  Test Suites: 1 passed, 1 total
  Tests:       1 passed, 1 total
  Snapshots:   1 passed, 1 total
  Time:        3.205 s, estimated 10 s
  Ran all test suites
  ~~~

- Synthesizing the Terraform plan.

  ~~~shell
  ❯ cdktf synth --profile
  Generated Terraform code in the output directory: cdktf.out
  ~~~

## Deploying example alarms

The construct can be used in a stack. A demo stack setting up two billing alarms is shown below:

~~~sh
const app = new App();

const stack = new TerraformStack(app, "BudgetAlarms_Stack");

new AwsProvider(stack, "aws", {
  region: "eu-central-1",
  profile: "cdk"
});

new BudgetNotifier(stack, "BudgetAlarm_IT_Team_1", {
  limit: 25,
  unit: "USD",
  recipients: ["john.doe@foo.bar"],
  threshold: 85,
  application: "helloWorld",
});

new BudgetNotifier(stack, "BudgetAlarm_IT_Team_2", {
  limit: 1000,
  unit: "USD",
  recipients: ["john@doe.com"],
  threshold: 70
});

app.synth();
~~~

The stack is deployed

~~~shell
❯ cdktf deploy --profile cdk
Stack: budget_notifications_stack
Resources
 + AWS_BUDGETS_BUDGET   BudgetAlarmITTeam1_ aws_budgets_budget.budgetnotificationsstack_BudgetAlarmITTeam1_Test_4F9EDF62
 + AWS_BUDGETS_BUDGET   BudgetAlarmITTeam2_ aws_budgets_budget.budgetnotificationsstack_BudgetAlarmITTeam2_Test_C492B60F

Diff: 2 to create, 0 to update, 0 to delete.

Do you want to perform these actions?
  CDK for Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value:  
~~~

## Links

- [Installing Terraform CLI](https://learn.hashicorp.com/tutorials/terraform/install-cli)
- [Installing cdktf CLI](https://learn.hashicorp.com/tutorials/terraform/cdktf-install)
- [CDK for Terraform](https://github.com/hashicorp/terraform-cdk)
- [Creating a Billing Alarm to Monitor Your Estimated AWS Charges](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html)
- [TagKeyValue Cost filter issue](https://github.com/terraform-providers/terraform-provider-aws/issues/5890)
  
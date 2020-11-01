import { App, TerraformStack } from "cdktf";
import { BudgetNotifier } from "./lib/budget_notifier";
import { AwsProvider } from "./.gen/providers/aws";

const app = new App();

const stack = new TerraformStack(app, "budget_notifications_stack");

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

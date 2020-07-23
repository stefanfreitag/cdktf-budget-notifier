import { App, TerraformStack } from "cdktf";
import { BudgetNotifier } from "./lib/budget_notifier";
import { AwsProvider } from "./.gen/providers/aws";

const app = new App();

const stack = new TerraformStack(app, "budget_notifications_stack");

new AwsProvider(stack, "aws", {
  region: "eu-central-1",
  profile: "cdk",
});

new BudgetNotifier(stack, "team_1", {
  limit: 10,
  unit: "USD",
  recipients: ["john.doe@foo.bar"],
  threshold: 75,
  application: 'helloWorld'
});

new BudgetNotifier(stack, "team_2", {
  limit: 10,
  unit: "USD",
  recipients: ["john@doe.com"],
  threshold: 70,
  application: 'helloWorld'
});

new BudgetNotifier(stack, "team_3", {
  limit: 10,
  unit: "USD",
  recipients: ["foo@bar.com"],
  threshold: 80,
  application: 'helloWorld'
});

app.synth();

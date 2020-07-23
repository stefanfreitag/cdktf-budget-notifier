
import { Testing, TerraformStack } from "cdktf";
import { BudgetNotifier } from "../lib/budget_notifier";



test("minimal configuration", () => {  
  const app = Testing.app();
  const stack = new TerraformStack(app, "test");
  new BudgetNotifier(stack, "team_1", {
    limit: 10,
    unit: "USD",
    recipients: ["stefan@stefreitag.de"],
    threshold: 10,
    application: 'helloWorld'
  });
  expect(Testing.synth(stack)).toMatchSnapshot();
});

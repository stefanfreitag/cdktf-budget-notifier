# AWS Budget notifier

Using cdktf.

### Synthesizing

```shell
$cdktf synth --profile cdk
```

### Deploying

Generated Terraform code in the output directory: cdktf.out

```shell
❯ cdktf deploy --profile cdk
Deploying Stack: budget_notifier
Resources
 ✔ AWS_BUDGETS_BUDGET   Test                aws_budgets_budget.budgetnotifier_Test_FD1C9E58
```
Summary: 1 created, 0 updated, 0 destroyed.


## Links

- https://github.com/hashicorp/terraform-cdk
- [TagKeyValue Cost filter issue](https://github.com/terraform-providers/terraform-provider-aws/issues/5890)
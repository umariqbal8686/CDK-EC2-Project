# Welcome to Umar CDK TypeScript project - EC2Project

## This Project contains one EC2 Stack based on following five Constructs

* `vpc`             create network configs
* `ec2instances`    build two windows server 2019 instances
* `cloudwatch`      configure cloudwatch dashboard for instances
* `sns`             create sns alerts for instance resource exceeding 80%
* `tags`            assign tags to all resources as defined

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
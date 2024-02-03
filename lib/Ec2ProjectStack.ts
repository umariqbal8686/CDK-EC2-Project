import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { MyVpcConstruct } from '../lib/vpc';
import { Ec2InstancesConstruct } from '../lib/ec2instances';
import { CloudWatchConstruct } from '../lib/cloudwatch';
import { TagsConstruct, defaultEc2Tags, defaultSnsTags, defaultVpcTags, defaultCloudWatchTags } from '../lib/tags';   // add defaultSnsTags while update stack
import { SnsAlertsConstruct} from '../lib/sns';   //will run in update code




export class Ec2ProjectStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);
  
      // Instantiate the VPC Construct
      const vpc = new MyVpcConstruct(this, 'MyVpcConstruct');
  
      // Instantiate the EC2 instances Construct, passing the VPC created in the VPC stack
      const ec2 = new Ec2InstancesConstruct(this, 'MyEc2InstancesConstruct', {
        vpc: vpc.vpc,
      });
  
      // Instantiate the CloudWatch Construct, passing the EC2 instances created in the EC2 instances stack
      const cloudWatch = new CloudWatchConstruct(this, 'MyCloudWatchConstruct', {
        instances: ec2.instances,
      });
  
      // Instantiate the SNS alerts Construct
      const sns = new SnsAlertsConstruct(this, 'MySnsAlertsConstruct');

      const tags = new TagsConstruct(this, 'TagsConstruct', {
        ec2Tags: defaultEc2Tags,
        vpcTags: defaultVpcTags,
        snsTags: defaultSnsTags,
        cloudWatchTags: defaultCloudWatchTags,
      });
    }
  }
  















// export class Ec2ProjectStack extends cdk.Stack {
//   constructor(scope: Construct, id: string, props?: cdk.StackProps) {
//     super(scope, id, props);

//     const vpcStack = new MyVpcStack(this, 'MyVpcStack');

//     const ec2InstancesStack = new Ec2InstancesStack(this, 'Ec2InstancesStack', {
//       vpc: vpcStack.vpc,
//     });

//     const cloudWatchStack = new CloudWatchStack(this, 'CloudWatchStack', {
//       instances: ec2InstancesStack.instances,
//     });

//     const snsAlertsStack = new SnsAlertsStack(this, 'SnsAlertsStack');

//     const tagsStack = new TagsStack(this, 'TagsStack', {
//       ec2Tags: defaultEc2Tags,
//       vpcTags: defaultVpcTags,
//       snsTags: defaultSnsTags,
//       cloudWatchTags: defaultCloudWatchTags,
//     });
//   }
// }

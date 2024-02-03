import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';


export class MyVpcConstruct extends Construct {
  public readonly vpc: ec2.IVpc;
  constructor(scope: Construct, id: string) {
    super(scope, id);

    //  // If don't want to use your desired subnets, use following.
    // // Create the VPC and assign it to the vpc property
    //         this.vpc = new ec2.Vpc(this, 'MyVpc', {
    //             maxAzs: 2,
    //         });
    //     }
    // }


    // Define specific CIDR blocks for each subnet
    const subnet1CIDR = '10.20.20.0/24'; // Specific CIDR block for subnet1
    const subnet2CIDR = '10.30.30.0/24'; // Specific CIDR block for subnet2

    const vpc = new ec2.Vpc(this, 'MyVpc', {
      maxAzs: 2,
      subnetConfiguration: [
        {
          subnetType: ec2.SubnetType.PUBLIC,
          name: 'PublicSubnet1',
          cidrMask: 24,
        },
        {
          subnetType: ec2.SubnetType.PUBLIC,
          name: 'PublicSubnet2',
          cidrMask: 24,
        },
      ],
    });

    // Retrieve the created VPC instance and assign it to the property
    this.vpc = vpc;
  }
}
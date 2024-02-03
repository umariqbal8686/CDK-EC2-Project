import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

interface Ec2InstancesProps {
  vpc: ec2.IVpc;
}

export class Ec2InstancesConstruct extends Construct {
    public readonly instances: ec2.Instance[];
  
    constructor(scope: Construct, id: string, props: Ec2InstancesProps) {
      super(scope, id);


    const instance1 =  new ec2.Instance(this, 'MyWindowsInstance1', {
      vpc: props.vpc,
      instanceName: 'EC2TEST01',
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: new ec2.WindowsImage(ec2.WindowsVersion.WINDOWS_SERVER_2019_ENGLISH_FULL_BASE),
    });

    const instance2 =  new ec2.Instance(this, 'MyWindowsInstance2', {
      vpc: props.vpc,
      instanceName: 'EC2TEST01',
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: new ec2.WindowsImage(ec2.WindowsVersion.WINDOWS_SERVER_2019_ENGLISH_FULL_BASE),
    });
        // Assign instances to the property
        this.instances = [instance1, instance2];
  }
}
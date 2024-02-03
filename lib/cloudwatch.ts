import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import { Construct } from 'constructs';


interface CloudWatchProps {
    instances: ec2.Instance[];
  }  

export class CloudWatchConstruct extends Construct {
    constructor(scope: Construct, id: string, props: CloudWatchProps) {
      super(scope, id);

    const dashboard = new cloudwatch.Dashboard(this, 'MyDashboard');

    props.instances.forEach((instance, index) => {
      // CPU Utilization Metric
      const cpuMetric = new cloudwatch.Metric({
        namespace: 'AWS/EC2',
        metricName: 'CPUUtilization',
        dimensionsMap: {
          InstanceId: instance.instanceId,
        },
        statistic: 'Average',
      });

      // Memory Utilization Metric (example using custom metric, actual metric might vary)
      const memoryMetric = new cloudwatch.Metric({
        namespace: 'CustomNamespace',
        metricName: 'MemoryUtilization',
        dimensionsMap: {
          InstanceId: instance.instanceId,
        },
        statistic: 'Average',
      });

      // Create widgets for the dashboard
      const cpuGraph = new cloudwatch.GraphWidget({
        title: `CPU Utilization - Instance ${index + 1}`,
        left: [cpuMetric],
      });

      const memoryGraph = new cloudwatch.GraphWidget({
        title: `Memory Utilization - Instance ${index + 1}`,
        left: [memoryMetric],
      });

      dashboard.addWidgets(cpuGraph, memoryGraph);
    });
  }
}




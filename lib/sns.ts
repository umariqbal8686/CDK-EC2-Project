import * as cdk from 'aws-cdk-lib';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import * as cloudwatch_actions from 'aws-cdk-lib/aws-cloudwatch-actions';

export class SnsAlertsConstruct extends Construct {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id);

        const topic = new sns.Topic(this, 'MyTopic');

        // Define an array of instance IDs
        const instanceIds: string[] = [
            'i-042491e06f7f82c9e',
            'i-012b27f3dc1a0f884',
        ];

        // Create CloudWatch alarms for each instance ID
        instanceIds.forEach((instanceId, index) => {
            const alarm = new cloudwatch.Alarm(this, `MyAlarm${index + 1}`, { // Adjust index to start from 1
                metric: new cloudwatch.Metric({
                    namespace: 'AWS/EC2',
                    metricName: 'CPUUtilization',
                    dimensionsMap: {
                        InstanceId: instanceId,
                    },
                    statistic: 'Average',
                }),
                threshold: 80,
                evaluationPeriods: 1,
            });

            alarm.addAlarmAction(new cloudwatch_actions.SnsAction(topic));
        });
    }
}

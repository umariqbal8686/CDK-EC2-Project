#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Ec2ProjectStack } from '../lib/Ec2ProjectStack';

const app = new cdk.App();
new Ec2ProjectStack(app, 'Ec2ProjectStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
    }
});
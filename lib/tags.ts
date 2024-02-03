import { Construct } from 'constructs';
import { Tags } from 'aws-cdk-lib';

export interface TagsProps {
  ec2Tags?: { [key: string]: string };
  vpcTags?: { [key: string]: string };
  snsTags?: { [key: string]: string };
  cloudWatchTags?: { [key: string]: string };
}

export class TagsConstruct extends Construct {
  constructor(scope: Construct, id: string, props: TagsProps) {
    super(scope, id);
    
    // Apply default tags if provided
    if (props.ec2Tags) {
      applyTags(this, props.ec2Tags);
    }

    if (props.vpcTags) {
      applyTags(this, props.vpcTags);
    }

    if (props.snsTags) {
      applyTags(this, props.snsTags);
    }

    if (props.cloudWatchTags) {
      applyTags(this, props.cloudWatchTags);
    }
  }
}

export function applyTags(resource: Construct, tags: { [key: string]: string }): void {
  // Iterate over the entries of the tags object and add each tag individually
  Object.entries(tags).forEach(([key, value]) => {
    Tags.of(resource).add(key, value);
  });
}

// Default tags
export const defaultEc2Tags: { [key: string]: string } = {
  Environment: 'Production',
  Application: 'MyApp',
};

export const defaultVpcTags: { [key: string]: string } = {
  Environment: 'Production',
  Department: 'Engineering',
};

export const defaultSnsTags: { [key: string]: string } = {
  Team: 'DevOps',
  Project: 'Alerts',
};

export const defaultCloudWatchTags: { [key: string]: string } = {
  Application: 'MyApp',
  Environment: 'Production',
};

import { CfnOutput, Construct, Stage, StageProps } from "@aws-cdk/core";
import { CdkPipelinesStack } from "../stacks/cdk-pipelines-stack";

export class CdkPipelinesStackStage extends Stage {
  public readonly tableArn: CfnOutput;

  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const stack = new CdkPipelinesStack(this, "CdkPipelinesStack");

    this.tableArn = stack.tableArn;
  }
}

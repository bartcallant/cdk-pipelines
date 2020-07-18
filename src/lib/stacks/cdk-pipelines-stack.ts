import { Table, AttributeType } from "@aws-cdk/aws-dynamodb";
import { Stack, Construct, StackProps, CfnOutput } from "@aws-cdk/core";

export class CdkPipelinesStack extends Stack {
  public readonly tableArn: CfnOutput;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const table = new Table(this, "SomeTable", {
      partitionKey: {
        name: "PK",
        type: AttributeType.STRING,
      },
    });

    this.tableArn = new CfnOutput(this, "TabelArn", { value: table.tableArn });
  }
}

import { Artifact } from "@aws-cdk/aws-codepipeline";
import {
  GitHubSourceAction,
  GitHubTrigger,
} from "@aws-cdk/aws-codepipeline-actions";
import { Construct, SecretValue, Stack, StackProps } from "@aws-cdk/core";
import { CdkPipeline, SimpleSynthAction } from "@aws-cdk/pipelines";
import { CdkPipelinesStackStage } from "../stages/cdk-pipelines-stack-stage";

export class CdkPipelinesPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const sourceArtifact = new Artifact();
    const cloudAssemblyArtifact = new Artifact();

    const pipeline = new CdkPipeline(this, "CdkPipelinesPipeline", {
      pipelineName: "CdkPipelinesPipeline",
      cloudAssemblyArtifact,
      sourceAction: new GitHubSourceAction({
        actionName: "GitHub",
        output: sourceArtifact,
        oauthToken: SecretValue.secretsManager("github-token"),
        owner: "bartcallant",
        repo: "cdk-pipelines",
        trigger: GitHubTrigger.POLL,
      }),
      synthAction: SimpleSynthAction.standardNpmSynth({
        sourceArtifact,
        cloudAssemblyArtifact,
        buildCommand: "npm run build",
      }),
    });
  }
}

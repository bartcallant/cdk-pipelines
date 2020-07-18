#!/usr/bin/env node
import "source-map-support/register";
import { App } from "@aws-cdk/core";
import { CdkPipelinesStack } from "../lib/stacks/cdk-pipelines-stack";
import { CdkPipelinesPipelineStack } from "../lib/pipelines/cdk-pipelines.pipeline-stack";

const app = new App();

new CdkPipelinesPipelineStack(app, "CdkPipelinesPipelineStack");

app.synth();

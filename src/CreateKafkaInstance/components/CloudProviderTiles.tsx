import { CloudProvider } from "./utils";
import { CloudProvidersTileProps } from "./utils";
import React from "react";
import AwsIcon from "@patternfly/react-icons/dist/esm/icons/aws-icon";
import { Skeleton, Tile } from "@patternfly/react-core";

export const CloudProvidersTiles: React.FunctionComponent<CloudProvidersTileProps> = ({
  cloudProviders,
  kafkaRequest,
  selectCloudProvider,
}) => {
  const getTileIcon = (provider?: string) => {
    switch (provider?.toLowerCase()) {
      case "aws":
        return (
          <AwsIcon
            size="lg"
            color="black"
            className="mk--create-instance__tile--icon"
          />
        );
      default:
        return;
    }
  };

  if (cloudProviders === undefined) {
    return (
      <Skeleton className="pf-m-text-4xl" screenreaderText="Loading contents" />
    );
  }

  return (
    <>
      {cloudProviders.map((provider: CloudProvider) => {
        return (
          <Tile
            key={`tile-${provider.name}`}
            title={provider.display_name || ""}
            icon={getTileIcon(provider.name)}
            isSelected={kafkaRequest.cloud_provider.value === provider.name}
            onClick={() => selectCloudProvider(provider)}
          />
        );
      })}
    </>
  );
};

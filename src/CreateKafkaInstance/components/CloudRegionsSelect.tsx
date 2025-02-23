import { NewKafkaRequestPayload } from "./utils";
import { CloudRegion } from "./utils";
import React from "react";
import { useTranslation } from "react-i18next";
import { FormSelect, FormSelectOption } from "@patternfly/react-core";

export type CloudRegionProps = {
  kafkaRequest: NewKafkaRequestPayload;
  selectCloudRegion: (region: string) => void;
  cloudRegions: CloudRegion[] | undefined;
};

export const CloudRegionSelect: React.FunctionComponent<CloudRegionProps> = ({
  kafkaRequest,
  selectCloudRegion,
  cloudRegions,
}) => {
  const { t } = useTranslation();

  return (
    <FormSelect
      validated={kafkaRequest.region.validated}
      value={kafkaRequest.region.value}
      onChange={selectCloudRegion}
      id="form-cloud-region-option"
      name="cloud-region"
      isDisabled={cloudRegions === undefined}
    >
      {[
        <FormSelectOption
          value=""
          key="placeholder"
          label={t("create-kafka-instance:select_region")}
        />,
        (cloudRegions || []).map(({ id, display_name }: CloudRegion, index) => {
          return (
            <FormSelectOption key={index} value={id} label={display_name} />
          );
        }),
      ]}
    </FormSelect>
  );
};

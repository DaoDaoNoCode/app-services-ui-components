import React from "react";
import { useTranslation } from "react-i18next";
import {
  TextContent,
  Text,
  TextVariants,
  TextList,
  TextListVariants,
  TextListItem,
  TextListItemVariants,
  Grid,
  GridItem,
  Button,
  ButtonVariant,
} from "@patternfly/react-core";

export type InstanceInfoProps = {
  isKasTrial?: boolean;
  onClickQuickStart: () => void;
};

const InstanceInfo: React.FC<InstanceInfoProps> = ({
  isKasTrial,
  onClickQuickStart,
}) => {
  const { t } = useTranslation();

  return (
    <TextContent>
      <Text component={TextVariants.h3}>
        {t("create-kafka-instance:instance_information")}
      </Text>
      <TextList component={TextListVariants.dl}>
        <Grid sm={6} lg={12} hasGutter>
          {isKasTrial && (
            <GridItem>
              <TextListItem component={TextListItemVariants.dt}>
                {t("kafka:duration")}
              </TextListItem>
              <TextListItem component={TextListItemVariants.dd}>
                {t("kafka:duration_value")}
              </TextListItem>
            </GridItem>
          )}
          <GridItem>
            <TextListItem component={TextListItemVariants.dt}>
              {t("kafka:ingress_egress")}
            </TextListItem>
            <TextListItem component={TextListItemVariants.dd}>
              {t("kafka:ingress_egress_value")}
            </TextListItem>
          </GridItem>
          <GridItem>
            <TextListItem component={TextListItemVariants.dt}>
              {t("kafka:storage")}
            </TextListItem>
            <TextListItem component={TextListItemVariants.dd}>
              {t("kafka:storage_value")}
            </TextListItem>
          </GridItem>
          <GridItem>
            <TextListItem component={TextListItemVariants.dt}>
              {t("kafka:partitions")}
            </TextListItem>
            <TextListItem component={TextListItemVariants.dd}>
              {t("kafka:partitions_value")}
            </TextListItem>
          </GridItem>
          <GridItem>
            <TextListItem component={TextListItemVariants.dt}>
              {t("kafka:client_connections")}
            </TextListItem>
            <TextListItem component={TextListItemVariants.dd}>
              {t("kafka:client_connections_value")}
            </TextListItem>
          </GridItem>
          <GridItem>
            <TextListItem component={TextListItemVariants.dt}>
              {t("kafka:connection_rate")}
            </TextListItem>
            <TextListItem component={TextListItemVariants.dd}>
              {t("kafka:connection_rate_value")}
            </TextListItem>
          </GridItem>
          <GridItem>
            <TextListItem component={TextListItemVariants.dt}>
              {t("kafka:message_size")}
            </TextListItem>
            <TextListItem component={TextListItemVariants.dd}>
              {t("kafka:message_size_value")}
            </TextListItem>
          </GridItem>
        </Grid>
        <Button
          isSmall
          isInline
          variant={ButtonVariant.link}
          style={{ marginTop: "20px" }}
          onClick={onClickQuickStart}
        >
          {t("create-kafka-instance:quick_start_guide_message")}
        </Button>
      </TextList>
    </TextContent>
  );
};

export { InstanceInfo };

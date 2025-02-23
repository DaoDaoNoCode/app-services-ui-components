import {
  EmptyState,
  EmptyStateVariant,
  EmptyStateIcon,
  Title,
  EmptyStateBody,
} from "@patternfly/react-core";
import TachometerAltIcon from "@patternfly/react-icons/dist/esm/icons/tachometer-alt-icon";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export const EmptyStateMetricsUnavailable: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <EmptyState variant={EmptyStateVariant.xs}>
      <EmptyStateIcon icon={TachometerAltIcon} />
      <Title headingLevel="h3" size="lg">
        {t("metrics:empty_state_no_data_title")}
      </Title>
      <EmptyStateBody>{t("metrics:empty_state_no_data_body")}</EmptyStateBody>
    </EmptyState>
  );
};

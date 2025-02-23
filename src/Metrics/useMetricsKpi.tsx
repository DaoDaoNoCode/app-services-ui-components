import { useSelector } from "@xstate/react";
import { useCallback, useContext } from "react";
import { MetricsKpiModel } from "./machines";
import { MetricsKpiContext } from "./MetricsKpiProvider";

export function useMetricsKpi() {
  const { service } = useContext(MetricsKpiContext);

  const selector = useCallback(
    (state: typeof service.state) => ({
      ...state.context,
      isInitialLoading: state.hasTag("initialLoading"),
      isRefreshing: state.hasTag("refreshing"),
      isLoading: state.hasTag("loading"),
      isFailed: state.hasTag("failed"),
      isJustCreated: state.hasTag("justCreated"),
    }),
    []
  );
  const {
    topics,
    topicPartitions,
    consumerGroups,
    isInitialLoading,
    isLoading,
    isRefreshing,
    isFailed,
    isJustCreated,
  } = useSelector(service, selector);

  const onRefresh = useCallback(
    () => service.send(MetricsKpiModel.events.refresh()),
    [service]
  );

  return {
    isInitialLoading,
    isLoading,
    isRefreshing,
    isFailed,
    isJustCreated,
    topics,
    topicPartitions,
    consumerGroups,
    onRefresh,
  };
}

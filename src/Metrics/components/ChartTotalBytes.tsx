import { TimeSeriesMetrics } from "../types";
import { timeIntervalsMapping } from "../consts";

import {
  Chart,
  ChartAxis,
  ChartGroup,
  ChartLegend,
  ChartLine,
  ChartThemeColor,
  ChartVoronoiContainer,
} from "@patternfly/react-charts";
import chart_color_blue_300 from "@patternfly/react-tokens/dist/esm/chart_color_blue_300";
import chart_color_orange_300 from "@patternfly/react-tokens/dist/esm/chart_color_orange_300";
import React, { FunctionComponent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { chartHeight, chartPadding } from "../consts";
import {
  dateToChartValue,
  shouldShowDate,
  formatBytes,
  timestampsToTicks,
} from "./utils";
import { ChartSkeletonLoader } from "./ChartSkeletonLoader";
import { useChartWidth } from "./useChartWidth";

type ChartData = {
  color: string;
  line: TopicChartData[];
};

type TopicChartData = {
  name: string;
  x: number;
  y: number;
};

type LegendData = {
  name: string;
  symbol: {
    fill: string;
    type?: string;
  };
};

type ChartTotalBytesProps = {
  incomingTopicsData: TimeSeriesMetrics;
  outgoingTopicsData: TimeSeriesMetrics;
  selectedTopic: string | undefined;
  duration: number;
  isLoading: boolean;
  emptyState: ReactElement;
};
export const ChartTotalBytes: FunctionComponent<ChartTotalBytesProps> = ({
  incomingTopicsData,
  outgoingTopicsData,
  selectedTopic,
  duration,
  isLoading,
  emptyState,
}) => {
  const { t } = useTranslation();
  const [containerRef, width] = useChartWidth();

  const itemsPerRow = width && width > 650 ? 6 : 3;

  const { chartData, legendData, tickValues } = getBytesChartData(
    incomingTopicsData,
    outgoingTopicsData,
    duration,
    selectedTopic
      ? t("metrics:incoming_bytes", {
          topic: selectedTopic,
        })
      : t("metrics:incoming_bytes_all_topics"),
    selectedTopic
      ? t("metrics:outgoing_bytes", {
          topic: selectedTopic,
        })
      : t("metrics:outgoing_bytes_all_topics")
  );

  const hasMetrics =
    Object.keys(incomingTopicsData).length > 0 ||
    Object.keys(outgoingTopicsData).length > 0;

  const showDate = shouldShowDate(duration);

  switch (true) {
    case isLoading:
      return <ChartSkeletonLoader />;
    case !hasMetrics:
      return emptyState;
    default:
      return (
        <div ref={containerRef}>
          <Chart
            ariaTitle={t("metrics:total_bytes")}
            containerComponent={
              <ChartVoronoiContainer
                labels={({ datum }) => `${datum.name}: ${formatBytes(datum.y)}`}
                constrainToVisibleArea
              />
            }
            legendAllowWrap={true}
            legendPosition="bottom-left"
            legendComponent={
              <ChartLegend data={legendData} itemsPerRow={itemsPerRow} />
            }
            height={chartHeight}
            padding={chartPadding}
            themeColor={ChartThemeColor.multiUnordered}
            width={width}
          >
            <ChartAxis
              label={
                "\n" +
                (showDate
                  ? t("metrics:axis-label-time-full")
                  : t("metrics:axis-label-time"))
              }
              tickValues={tickValues}
              tickCount={timeIntervalsMapping[duration].ticks}
              tickFormat={(d) =>
                dateToChartValue(d, {
                  showDate,
                })
              }
            />
            <ChartAxis
              label={"\n\n\n\n\n" + t("metrics:axis-label-bytes")}
              dependentAxis
              tickFormat={formatBytes}
            />
            <ChartGroup>
              {chartData.map((value, index) => (
                <ChartLine
                  key={`chart-line-${index}`}
                  data={value.line}
                  style={{
                    data: {
                      stroke: value.color,
                    },
                  }}
                />
              ))}
            </ChartGroup>
          </Chart>
        </div>
      );
  }
};

export function getBytesChartData(
  incomingTopic: TimeSeriesMetrics,
  outgoingTopic: TimeSeriesMetrics,
  duration: number,
  incomingTopicName: string,
  outgoingTopicName: string
): {
  legendData: Array<LegendData>;
  chartData: Array<ChartData>;
  tickValues: number[];
} {
  const legendData: Array<LegendData> = [];
  const chartData: Array<ChartData> = [];

  const incomingLine = metricsToLine(incomingTopic, incomingTopicName);
  if (incomingLine.length > 0) {
    const color = chart_color_blue_300.value;
    chartData.push({ color, line: incomingLine });
    legendData.push({
      name: incomingTopicName,
      symbol: {
        fill: color,
      },
    });
  }

  const outgoingLine = metricsToLine(outgoingTopic, outgoingTopicName);
  if (outgoingLine.length > 0) {
    const color = chart_color_orange_300.value;
    chartData.push({ color, line: outgoingLine });
    legendData.push({
      name: outgoingTopicName,
      symbol: {
        fill: color,
      },
    });
  }
  const allTimestamps = Array.from(
    new Set([...Object.keys(incomingTopic), ...Object.keys(outgoingTopic)])
  );
  const tickValues = timestampsToTicks(allTimestamps, duration);

  return {
    legendData,
    chartData,
    tickValues,
  };
}

export function metricsToLine(
  metrics: TimeSeriesMetrics,
  name: string
): Array<TopicChartData> {
  const line: Array<TopicChartData> = [];

  Object.entries(metrics).map(([timestamp, bytes]) => {
    line.push({ name, x: parseInt(timestamp, 10), y: bytes });
  });
  return line;
}

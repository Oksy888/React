import { Alert, Skeleton, Stack } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { memo, useMemo } from "react";

import { useAIAuthorAnalyticStore } from "../../store/accountAnalytic";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthorStatesAnalyticsData } from "../../hooks/useAuthorStatesAnalyticsData";
import { IStatesData, IVideoRised } from "../../store/accountStateAnalytics";
import { GraphAuthorTitle } from "./GraphAuthorTitle";
import { ApexChart } from "./ApexChart";

export const AuthorGraphicStates = memo(({ authorId }: { authorId: number | string }) => {
  const {
    query: {
      data: fetchData,
      isSuccess: fetchIsSuccess,
      isLoading: fetchIsLoading,
      isError: fetchIsError,
    },
  } = useAuthorStatesAnalyticsData(authorId);

  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const { pathname } = useLocation();

  const store = useAIAuthorAnalyticStore();

  useEffect(() => {
    if ((fetchData && !Object.entries(store.data).length) || pathname === "/my-account-analytics") {
      console.log(store);
      setData(fetchData);
      setIsSuccess(fetchIsSuccess);
      setIsError(fetchIsError);
      setIsLoading(fetchIsLoading);
    }
  }, [fetchData, pathname]);

  useEffect(() => {
    if (Object.entries(store.data).length && "authorStatesAnalytic" in store.data) {
      console.log(store);
      const data = store.data.authorStatesAnalytic;
      console.log(data);

      setData(data);
      setIsSuccess(true);
      setIsError(false);
      setIsLoading(false);
    }
  }, [store]);

  const states = useMemo<IStatesData[]>(() => {
    return (
      data?.states.map(
        (el: {
          id: string;
          authorId: string;
          subscribers: number;
          subscribedAt: number;
          clips: number;
          likes: number;
          diggCount: number;
          parseDate: string;
          subscribersDailyRise: number;
          subscribersDailyRiseForecastingError: number;
          subscribersDailyRiseForecasting: number;
          subscribersGraphWeight: number;
        }) => ({
          id: el.id,
          authorId: el.authorId,
          subscribers: el.subscribers,
          subscribedAt: el.subscribedAt,
          clips: el.clips,
          likes: el.likes,
          diggCount: el.diggCount,
          parseDate: el.parseDate,
          subscribersDailyRise: el.subscribersDailyRise,
          subscribersDailyRiseForecastingError: el.subscribersDailyRiseForecastingError,
          subscribersDailyRiseForecasting: el.subscribersDailyRiseForecasting,
          subscribersGraphWeight: el.subscribersGraphWeight,
        }),
      ) ?? []
    );
  }, [data?.states]);

  console.log("data", data);
  console.log("states", states);

  const videoRised = useMemo<IVideoRised[]>(() => {
    return (
      data?.videoRised.map(
        (el: { videoId: string; playCount: number; parseDate: string; coverUrl: string }) => ({
          videoId: el.videoId,
          playCount: el.playCount,
          parseDate: el.parseDate,
          coverUrl: el.coverUrl,
        }),
      ) ?? []
    );
  }, [data?.videoRised]);

  //console.log("videoRised", videoRised);
  return (
    <Stack gap={16}>
      <GraphAuthorTitle />
      {isLoading && (
        <Stack gap={8}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Skeleton key={i} h={60} />
          ))}
        </Stack>
      )}
      {isSuccess && states.length > 0 && (
        <Stack gap={8}>
          <ApexChart videoRised={videoRised} states={states} />
        </Stack>
      )}

      {isSuccess && videoRised.length === 0 && <Stack gap={8}> No videoRised</Stack>}
      {isError && (
        <Alert variant="light" color="orange" icon={<IconInfoCircle />}>
          Something went wrong. We are working on getting this fixed as soon as we can.
        </Alert>
      )}
    </Stack>
  );
});

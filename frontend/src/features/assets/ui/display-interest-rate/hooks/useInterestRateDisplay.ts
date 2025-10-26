import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { HttpClient } from "../../../../../shared/external-lib/axios";
import { GetAverageInterestRateService } from "../../../application/get-average-interest-rate.service";
import { AssetsListApiRepository } from "../../../infrastructure/repositories/assets-list-api.repository";

export const useInterestRateDisplay = () => {
  const getAverageInterestRateService = useMemo(
    () =>
      new GetAverageInterestRateService(
        new AssetsListApiRepository(new HttpClient()),
      ),
    [],
  );
  const {
    data: interestRate,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["interest-rate"],
    queryFn: () => getAverageInterestRateService.execute(),
  });

  return {
    interestRate: interestRate?.value,
    isFetching,
    error,
  };
};

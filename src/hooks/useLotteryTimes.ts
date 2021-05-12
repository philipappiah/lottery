import { useEffect, useState } from 'react';
import useGoFarm from './useGoFarm';
// import config from '../config';
import { LotteryTime } from '../go-farm/types';

const useLotteryTimes = () => {
  const [time, setTime] = useState<LotteryTime>({
    prevEpochTime: new Date(),
    nextEpochTime: new Date(),
    epoch : 0
  });
  const goFarm = useGoFarm();

  useEffect(() => {
    if (goFarm) {
      goFarm.getLotteryTimes().then(setTime);
    }
  }, [goFarm]);
  return time;
};

export default useLotteryTimes;

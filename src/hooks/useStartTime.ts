import { useEffect, useState } from 'react';
import useGoFarm from './useGoFarm';
import { StartTime } from '../go-farm/types';

const useStartTime = () => {
  const [time, setTime] = useState<StartTime>({
    startTime: new Date()
  });
  const goFarm = useGoFarm();

  useEffect(() => {
    if (goFarm) {
      goFarm.getStartTime().then(setTime);
    }
  }, [goFarm]);
  return time;
};

export default useStartTime;

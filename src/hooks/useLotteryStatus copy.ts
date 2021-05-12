import { useCallback, useEffect, useState } from 'react';
import useGoFarm from './useGoFarm';
const useLotteryStatus = (name: string) => {
  const [numbers, setNumbers] = useState([]);
  const goFarm = useGoFarm();

  const fetchNumbers = useCallback(async () => {
    const userNumbers = await goFarm.ticketNumbers(name);
    setNumbers(userNumbers);
  }, [ name,goFarm]);

  useEffect(() => {
    if (goFarm) {
      fetchNumbers().catch(err => console.error(err.stack));
    }
  }, [goFarm]);
  return numbers;
};

export default useLotteryStatus;

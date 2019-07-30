import { DependencyList, useEffect, useRef, useState } from 'react';

export type RafLoopReturns = [() => void, boolean | null, () => void];

export default function useRafLoop(callback: CallableFunction, deps?: DependencyList): RafLoopReturns {
  const raf = useRef<number | null>(null);
  const [isActive, setIsActive] = useState<boolean | null>(true);

  function loopStep() {
    callback();
    raf.current = requestAnimationFrame(loopStep);
  }

  function loopStop() {
    setIsActive(false);
  }

  function loopStart() {
    setIsActive(true);
  }

  function clearCurrentLoop() {
    raf.current && cancelAnimationFrame(raf.current);
  }

  useEffect(() => clearCurrentLoop, []);

  useEffect(
    () => {
      clearCurrentLoop();
      isActive && (raf.current = requestAnimationFrame(loopStep));

      return clearCurrentLoop;
    },
    deps ? [isActive, ...deps] : [isActive]
  );

  return [loopStop, isActive, loopStart];
}

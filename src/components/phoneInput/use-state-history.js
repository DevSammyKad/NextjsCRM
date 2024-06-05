import { useCallback, useMemo, useState } from 'react';

export class UseStateHistoryHandlers {
  constructor(set, back, forward) {
    this.set = set;
    this.back = back;
    this.forward = forward;
  }
}

export class StateHistory {
  constructor(history, current) {
    this.history = history;
    this.current = current;
  }
}

export function useStateHistory(initialValue) {
  const [state, setState] = useState({
    history: [initialValue],
    current: 0,
  });

  const set = useCallback(function (val) {
    setState(function (currentState) {
      const nextState = currentState.history
        .slice(0, currentState.current + 1)
        .concat([val]);
      return {
        history: nextState,
        current: nextState.length - 1,
      };
    });
  }, []);

  const back = useCallback(function (steps = 1) {
    setState(function (currentState) {
      return {
        history: currentState.history,
        current: Math.max(0, currentState.current - steps),
      };
    });
  }, []);

  const forward = useCallback(function (steps = 1) {
    setState(function (currentState) {
      return {
        history: currentState.history,
        current: Math.min(
          currentState.history.length - 1,
          currentState.current + steps
        ),
      };
    });
  }, []);

  const handlers = useMemo(
    function () {
      return { set, forward, back };
    },
    [set, forward, back]
  );

  return [state.history[state.current], handlers, state];
}

import {
  ReducerState,
  Dispatch,
  ReducerAction,
  createContext,
  PropsWithChildren,
  useReducer,
  useContext,
  useMemo,
} from "react";
import { State, reducer } from "./reducer";

export const APP_STATE_KEY = "APP_STATE_KEY" as const;

function getLocalStorageState() {
  const stateFromStorage = localStorage.getItem(APP_STATE_KEY);
  if (stateFromStorage) {
    return JSON.parse(stateFromStorage);
  }

  return defaultState;
}

const defaultState: State = { notes: {}};
const defaultProviderValue = [
  defaultState,
  () => {
    throw new Error("context not initializaed");
  },
] as [ReducerState<typeof reducer>, Dispatch<ReducerAction<typeof reducer>>];

const StoreContext = createContext(defaultProviderValue);
const Provider = StoreContext.Provider;

export function StoreProvider(props: PropsWithChildren<{}>) {
  const initialState = useMemo(getLocalStorageState, []);
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={[state, dispatch]}>{props.children}</Provider>;
}

export function useStore() {
  return useContext(StoreContext);
}

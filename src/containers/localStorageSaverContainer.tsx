import { useEffect } from "react";
import { APP_STATE_KEY, useStore } from "../store";

export default function LocalStorageSaverContainer() {
  const [state] = useStore();
  useEffect(() => {
    console.log("state saved");
    localStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
  }, [state]);

  return <></>;
}

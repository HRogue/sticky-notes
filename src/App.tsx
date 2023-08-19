import { StoreProvider } from "./store";
import NoteDeskPageContainer from "./containers/noteDeskPageContainer";
import LocalStorageSaverContainer from "./containers/localStorageSaverContainer";

function App() {
  return (
    <StoreProvider>
      <LocalStorageSaverContainer />
      <NoteDeskPageContainer />
    </StoreProvider>
  );
}

export default App;

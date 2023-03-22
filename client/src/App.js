import AuthProvider from "./context/AuthProvider";
import WatchlistProvider from "./context/WatchlistProvider";
import AppRouter from "./routing/AppRouter";
import AppTheme from "./theme/AppTheme";

function App() {
  return (
    <div className="App">
      <AppTheme>
        <AuthProvider>
          <WatchlistProvider>
            <AppRouter />
          </WatchlistProvider>
        </AuthProvider>
      </AppTheme>
    </div>
  );
}

export default App;

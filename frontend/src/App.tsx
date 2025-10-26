import { LayoutPage } from "./shared/design-system/LayoutPage";
import Router from "./router/Router";
import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
  ReactQueryDevtools,
} from "./shared/external-lib/react-query";
import { ToastContainer } from "./shared/external-lib/react-toastify";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LayoutPage>
        <Router />
      </LayoutPage>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

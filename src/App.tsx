import { Refine, WelcomePage } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/altogic";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { Notifications } from "@mantine/notifications";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            primaryShade: 7,
          }}
        >
          <Notifications position="top-right" zIndex={2077} />
          <DatesProvider settings={{ locale: "vi" }}>
            <Refine
              dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
              routerProvider={routerBindings}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route index element={<WelcomePage />} />
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </DatesProvider>
        </MantineProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;

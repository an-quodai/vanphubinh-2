import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { dataProvider } from "src/providers";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { Notifications } from "@mantine/notifications";
import { Layout } from "./components/layout";
import { ItemList } from "src/pages/item";
import { PartnerList } from "src/pages/partner";
import { SaleOrderList } from "src/pages/saleOrder";

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
              dataProvider={dataProvider("http://127.0.0.1:3333/api")}
              routerProvider={routerBindings}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <Layout>
                      <Outlet />
                    </Layout>
                  }
                >
                  <Route index element={<ItemList />} />
                  <Route path="items" element={<ItemList />} />
                  <Route>
                    <Route path="partners" element={<PartnerList />} />
                  </Route>
                  <Route>
                    <Route path="sale-orders" element={<SaleOrderList />} />
                  </Route>
                </Route>
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

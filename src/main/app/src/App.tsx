import { Refine } from "@refinedev/core";
import {
  Layout,
  ErrorComponent,
  LightTheme,
  RefineSnackbarProvider,
  notificationProvider,
} from "@refinedev/mui";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import routerBindings, {
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { dataProvider } from "components/crudeDataProvider";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { MuiInferencer } from "@refinedev/inferencer/mui";
import { EnvironmentLists } from "pages/environments/list";
import { EnvironmentCreate } from "pages/environments/create";
import { EnvironmentShow } from "pages/environments/show";
import { EnvironmentEdit } from "pages/environments/edit";
import { ConfigurationTemplateLists } from "pages/configuration_templates/list";
import { ConfigurationTemplateShow } from "pages/configuration_templates/show";
import { ConfigurationTemplateEdit } from "pages/configuration_templates/edit";
import { ConfigurationTemplateCreate } from "pages/configuration_templates/create";
import { ConfigurationsLists } from "pages/configuration/list";
import { ConfigurationsShow } from "pages/configuration/show";
import { ConfigurationsCreate } from "pages/configuration/create";
import { ConfigurationsEdit } from "pages/configuration/edit";
import { GoalLists } from "pages/goals/list";
import { GoalShow } from "pages/goals/show";
import { GoalEdit } from "pages/goals/edit";
import { GoalCreate } from "pages/goals/create";

export const API_URL =
  window.location.port == "3000" ? "http://localhost:8888/api" : "/api";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />
      <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
      <RefineSnackbarProvider>
        <BrowserRouter>
          <Refine
            routerProvider={routerBindings}
            dataProvider={dataProvider(API_URL)}
            notificationProvider={notificationProvider}
            resources={[
              {
                name: "environments",
                list: "/environments",
                show: "/environments/show/:id",
                create: "/environments/create",
                edit: "/environments/edit/:id",
              },
              {
                name: "goals",
                list: "/goals",
                show: "/goals/show/:id",
                create: "/goals/create",
                edit: "/goals/edit/:id",
              },
              {
                name: "configurationTemplates",
                list: "/configurationTemplates",
                show: "/configurationTemplates/show/:id",
                create: "/configurationTemplates/create",
                edit: "/configurationTemplates/edit/:id",
              },
              {
                name: "configurations",
                list: "/configurations",
                show: "/configurations/show/:id",
                create: "/configurations/create",
                edit: "/configurations/edit/:id",
              },
            ]}
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
                <Route path="environments">
                  <Route index element={<EnvironmentLists />} />
                  <Route path="show/:id" element={<EnvironmentShow />} />
                  <Route path="edit/:id" element={<EnvironmentEdit />} />
                  <Route path="create" element={<EnvironmentCreate />} />
                </Route>
                <Route path="goals">
                  <Route index element={<GoalLists />} />
                  <Route path="show/:id" element={<GoalShow />} />
                  <Route path="edit/:id" element={<GoalEdit />} />
                  <Route path="create" element={<GoalCreate />} />
                </Route>
                <Route path="configurationTemplates">
                  <Route index element={<ConfigurationTemplateLists />} />
                  <Route
                    path="show/:id"
                    element={<ConfigurationTemplateShow />}
                  />
                  <Route
                    path="edit/:id"
                    element={<ConfigurationTemplateEdit />}
                  />
                  <Route
                    path="create"
                    element={<ConfigurationTemplateCreate />}
                  />
                </Route>
                <Route path="configurations">
                  <Route index element={<ConfigurationsLists />} />
                  <Route path="show/:id" element={<ConfigurationsShow />} />
                  <Route path="edit/:id" element={<ConfigurationsEdit />} />
                  <Route path="create" element={<ConfigurationsCreate />} />
                </Route>
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
            <UnsavedChangesNotifier />
          </Refine>
        </BrowserRouter>
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
};

export default App;

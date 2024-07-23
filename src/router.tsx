import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/Layouts/AppLayout";
import DashboardView from "@/Views/DashboardView";
import CreateProjectView from "./Views/projects/CreateProjectView";
import EditProjectView from "./Views/projects/EditProjectView";
import ProjectDetailsView from "./Views/projects/ProjectDetailsView";
import AuthLayout from "./Layouts/AuthLayout";
import LoginView from "./Views/auth/LoginView";
import RegisterView from "./Views/auth/RegisterView";
import ConfirmAccountView from "./Views/auth/ConfirmAccountView";
import RequestNewCodeView from "./Views/auth/RequestNewCodeView";
import ForgotPasswordView from "./Views/auth/ForgotPasswordView";
import NewPasswordView from "./Views/auth/NewPasswordView";
import ProjectTeamView from "./Views/projects/ProjectTeamView";
import ProfileView from "./Views/profile/ProfileView";
import ChangePasswordView from "./Views/profile/ChangePasswordView";
import ProfileLayout from "./Layouts/ProfileLayout";
import NotFound from "./Views/404/NotFound";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardView />} index />
          <Route path="/projects/create" element={<CreateProjectView />} />
          <Route path="/projects/:projectId" element={<ProjectDetailsView />} />
          <Route
            path="/projects/:projectId/edit"
            element={<EditProjectView />}
          />
          <Route
            path="/projects/:projectId/team"
            element={<ProjectTeamView />}
          />
          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/profile/password" element={<ChangePasswordView />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route
            path="/auth/confirm-account"
            element={<ConfirmAccountView />}
          />
          <Route path="/auth/request-code" element={<RequestNewCodeView />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordView />}
          />
          <Route path="/auth/new-password" element={<NewPasswordView />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

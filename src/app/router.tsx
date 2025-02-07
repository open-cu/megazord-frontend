import { createBrowserRouter } from "react-router-dom";
import { Home } from "@/pages/home";
import { NotFound } from "@/pages/not-found";
import { HackathonsOrg } from "@/pages/hackathons/org";
import { HackathonsUser } from "@/pages/hackathons/user";
import { HackathonInfo } from "@/pages/hackathon-info";
import {SignUpUser} from "@/pages/sign-up/user";
import {SignUpOrg} from "@/pages/sign-up/org";
import {Login} from "@/pages/login";
import {JoinHackathon} from "@/pages/join-hackathon";
import {CreateResume} from "@/pages/create-resume";
import { TeamUserPage } from "@/pages/teams/user";
import {ImportGithub} from "@/pages/imports/import-github";
import {ImportHh} from "@/pages/imports/import-hh";
import {ImportPdf} from "@/pages/imports/import-pdf";
import { ResumeView } from "@/pages/resume-view";
import {Profile} from "@/pages/profile";
import {CreateHackathon} from "@/pages/create-hackathon";
import {ChangeHackathon} from "@/pages/change-hackathon";
import { MyResume } from "@/pages/my-resume";
import {ChangeTeam} from "@/pages/change-team";
import { SuitableCandidates } from "@/pages/suitable-candidates";
import { TeamsOrg } from "@/pages/teams/org";
import { TeamDetailPage } from "@/pages/team-detail";
import { CreateTeam } from "@/pages/create-team";
import { JoinTeam } from "@/pages/join-team";
import AdminPanel from "@/pages/admin-panel";
import {UsersWithoutTeam} from "@/pages/users-without-team";
import {NotAcceptedInvite} from "@/pages/not-accepted-invite";
import {InvitedUsers} from "@/pages/invited-users";
import {Verification} from "@/pages/verification";
import {ServiceNotAvailable} from "@/pages/service-not-available";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ServiceNotAvailable/>,
  }
  // {
  //   path: "/",
  //   element: <Home />,
  //   errorElement: <NotFound />
  // },
  // {
  //   path: "/hackathons/org",
  //   element: <HackathonsOrg />
  // },
  // {
  //   path: "/hackathons/user",
  //   element: <HackathonsUser />
  // },
  // {
  //   path: "/sign-up/user",
  //   element: <SignUpUser />
  // },
  // {
  //   path: "/admin/secret/reg",
  //   element: <SignUpOrg />
  // },
  // {
  //   path: "/verification/:email",
  //   element: <Verification />
  // },
  // {
  //   path: "/hackathon/:hackathon_id",
  //   element: <HackathonInfo />
  // },
  // {
  //   path: "/login",
  //   element: <Login />,
  // },
  // {
  //   path: "/join-hackathon",
  //   element: <JoinHackathon />,
  // },
  // {
  //   path: "/hackathon/:hackathon_id/create-resume",
  //   element: <CreateResume />,
  // },
  // {
  //   path: "/hackathon/:hackathon_id/create-resume/github",
  //   element: <ImportGithub />,
  // },
  // {
  //   path: "/hackathon/:hackathon_id/create-resume/hh",
  //   element: <ImportHh />,
  // },
  // {
  //   path: "/hackathon/:hackathon_id/create-resume/pdf",
  //   element: <ImportPdf />,
  // },
  // {
  //   path: "/hackathon/:hackathon_id/teams",
  //   element: <TeamUserPage/>,
  // },
  // {
  //   path: "/hackathon/:hackathon_id/resume/:user_id",
  //   element: <ResumeView />
  // },
  // {
  //   path: "/profile",
  //   element: <Profile />
  // },
  // {
  //   path: "/create-hackathon",
  //   element: <CreateHackathon />
  // },
  // {
  //   path: "/change-hackathon/:hackathon_id/",
  //   element: <ChangeHackathon />
  // },
  // {
  //   path: "/hackathon/:hackathon_id/my-resume",
  //   element: <MyResume />
  // },
  // {
  //   path: "hackathon/:hackathon_id/teams/:team_id/change",
  //   element: <ChangeTeam />
  // },
  // {
  //   path:  "hackathon/:hackathon_id/teams/:team_id/vacancy/:vacancy_id/candidates",
  //   element: <SuitableCandidates />
  // },
  // {
  //   path: "hackathon/:hackathon_id/org/teams",
  //   element: <TeamsOrg />
  // },
  // {
  //   path: "hackathon/:hackathon_id/teams/:team_id",
  //   element: <TeamDetailPage/>
  // },
  // {
  //   path: 'hackathon/:hackathon_id/teams/create',
  //   element: <CreateTeam/>,
  // },
  // {
  //   path: '/join-team',
  //   element: <JoinTeam />
  // },
  // {
  //   path: 'admin-panel/:hackathon_id',
  //   element: <AdminPanel />
  // },
  // {
  //   path: 'admin-panel/:hackathon_id/without-team',
  //   element: <UsersWithoutTeam />
  // },
  // {
  //   path: 'admin-panel/:hackathon_id/not-accept-invite',
  //   element: <NotAcceptedInvite />
  // },
  // {
  //   path: 'admin-panel/:hackathon_id/invited-users',
  //   element: <InvitedUsers />
  // },
]);
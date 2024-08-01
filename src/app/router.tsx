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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />
  },
  {
    path: "/hackathons/org",
    element: <HackathonsOrg />
  },
  {
    path: "/hackathons/user",
    element: <HackathonsUser />
  },
  {
    path: "/sign-up/user",
    element: <SignUpUser />
  },
  {
    path: "/sign-up/org",
    element: <SignUpOrg />
  },
  {
    path: "/hackathon/:hackathon_id",
    element: <HackathonInfo />
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/join-hackaton",
    element: <JoinHackathon />,
  },
  {
    path: "/hackathon/:hackathon_id/create-resume",
    element: <CreateResume />,
  },
  {
    path: "/hackathon/:hackathon_id/create-resume/github",
    element: <ImportGithub />,
  },
  {
    path: "/hackathon/:hackathon_id/create-resume/hh",
    element: <ImportHh />,
  },
  {
    path: "/hackathon/:hackathon_id/create-resume/pdf",
    element: <ImportPdf />,
  },
  {
    path: "/hackathon/:hackathon_id/teams",
    element: <TeamUserPage/>,
  },
  {
    path: "/hackathon/:hackathon_id/resume/:user_id",
    element: <ResumeView />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/create-hackathon",
    element: <CreateHackathon />
  },
  {
    path: "/change-hackathon/:hackathon_id/",
    element: <ChangeHackathon />
  },
  {
    path: "/hackathon/:hackathon_id/my-resume",
    element: <MyResume />
  },
  {
    path: "hackathon/:hackathon_id/teams/:team_id/change",
    element: <ChangeTeam />
  },
  {
    path:  "hackathon/:hackathon_id/teams/:team_id/vacancy/:vacancy_id/candidates",
    element: <SuitableCandidates />
  },
  {
    path: "hackathon/:hackathon_id/org/teams",
    element: <TeamsOrg />
  },
  {
    path: "hackathon/:hackathon_id/teams/:team_id",
    element: <TeamDetailPage/>
  },
  {
    path: 'hackathon/:hackathon_id/teams/create',
    element: <CreateTeam/>,
  },
  {
    path: '/join-team',
    element: <JoinTeam />
  },
]);
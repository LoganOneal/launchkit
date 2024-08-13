import { LetterAvatar } from '@/components/shared';
import { defaultHeaders } from '@/lib/common';
import { Team } from '@prisma/client';
import useTeams from 'hooks/useTeams';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import type { ApiResponse } from 'types';
import { useRouter } from 'next/router';
import ConfirmationDialog from '../shared/ConfirmationDialog';
import { WithLoadingAndError } from '@/components/shared';
import { CreateTeam } from '@/components/team';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import Image from "next/image"
import Link from "next/link"
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const Teams = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [team, setTeam] = useState<Team | null>(null);
  const { isLoading, isError, teams, mutateTeams } = useTeams();
  const [askConfirmation, setAskConfirmation] = useState(false);
  const [createTeamVisible, setCreateTeamVisible] = useState(false);

  const { newTeam } = router.query as { newTeam: string };

  useEffect(() => {
    if (newTeam) {
      setCreateTeamVisible(true);
    }
  }, [newTeam]);

  const leaveTeam = async (team: Team) => {
    const response = await fetch(`/api/teams/${team.slug}/members`, {
      method: 'PUT',
      headers: defaultHeaders,
    });

    const json = (await response.json()) as ApiResponse;

    if (!response.ok) {
      toast.error(json.error.message);
      return;
    }

    toast.success(t('leave-team-success'));
    mutateTeams();
  };

  return (
    <WithLoadingAndError isLoading={isLoading} error={isError}>
      <div>
        <div className="flex items-center mb-4">
          <CardTitle>Teams</CardTitle>
          <div className="ml-auto flex items-center gap-2">
            <Button
              onClick={() => setCreateTeamVisible(!createTeamVisible)}
              size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {t('create-team')}
              </span>
            </Button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teams?.map((team) => (
            <Link href={`/teams/${team.slug}/members`}>
              <Card key={team.id} x-chunk="dashboard-01-chunk-5" className="hover:bg-accent">
                <CardHeader className="flex flex-row gap-4 items-start">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${team.value}.png`}
                      alt={team.name}
                      className="grayscale"
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <CardTitle>{team.name}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-8">
                  <div className="flex items-center gap-4">
                    <div className="grid gap-1">
                      <p className="text-sm text-muted-foreground font-medium leading-none">
                        Created {new Date(team.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <ConfirmationDialog
        visible={askConfirmation}
        title={`${t('leave-team')} ${team?.name}`}
        onCancel={() => setAskConfirmation(false)}
        onConfirm={() => {
          if (team) {
            leaveTeam(team);
          }
        }}
        confirmText={t('leave-team')}
      >
        {t('leave-team-confirmation')}
      </ConfirmationDialog>
      <CreateTeam
        visible={createTeamVisible}
        setVisible={setCreateTeamVisible}
      />
    </WithLoadingAndError>
  )

  return (
    <WithLoadingAndError isLoading={isLoading} error={isError}>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="space-y-3">
            <h2 className="text-xl font-medium leading-none tracking-tight">
              {t('all-teams')}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('team-listed')}
            </p>
          </div>
          <Button
            color="primary"
            size="md"
            onClick={() => setCreateTeamVisible(!createTeamVisible)}
          >
            {t('create-team')}
          </Button>
        </div>

        <Table
          cols={[t('name'), t('members'), t('created-at'), t('actions')]}
          body={
            teams
              ? teams.map((team) => {
                return {
                  id: team.id,
                  cells: [
                    {
                      wrap: true,
                      element: (
                        <Link href={`/teams/${team.slug}/members`}>
                          <div className="flex items-center justify-start space-x-2">
                            <LetterAvatar name={team.name} />
                            <span className="underline">{team.name}</span>
                          </div>
                        </Link>
                      ),
                    },
                    { wrap: true, text: '' + team._count.members },
                    {
                      wrap: true,
                      text: new Date(team.createdAt).toDateString(),
                    },
                    {
                      buttons: [
                        {
                          color: 'error',
                          text: t('leave-team'),
                          onClick: () => {
                            setTeam(team);
                            setAskConfirmation(true);
                          },
                        },
                      ],
                    },
                  ],
                };
              })
              : []
          }
        ></Table>

        <ConfirmationDialog
          visible={askConfirmation}
          title={`${t('leave-team')} ${team?.name}`}
          onCancel={() => setAskConfirmation(false)}
          onConfirm={() => {
            if (team) {
              leaveTeam(team);
            }
          }}
          confirmText={t('leave-team')}
        >
          {t('leave-team-confirmation')}
        </ConfirmationDialog>
        <CreateTeam
          visible={createTeamVisible}
          setVisible={setCreateTeamVisible}
        />
      </div>
    </WithLoadingAndError>
  );
};

export default Teams;

'use client';
import React, { useEffect, useState } from 'react';
import New from './New';
import { DataTable } from '../Datatable';
import { columns } from './Members/Columns';
import useHelpers from '@/hooks/useHelpers';
import axios from 'axios';
import LoadingTeam from '../Loading/TeamLoading';

const Team = () => {
  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const { loading, setLoading } = useHelpers();
  const teamId = '1ec4d379-2063-4102-8a2b-6bef5b9c83a4';

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/team?id=${teamId}`);
      const teamData = response.data;
      setTeam(teamData);
      setMembers(teamData.team_members); // Set the team members from the response
      console.log(teamData);
    } catch (error) {
      console.error('Error fetching team:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingTeam />
      ) : (
        <>
          <div className="grid gap-6 border rounded-lg shadow-sm px-5 py-4 w-full max-w-[800px] ">
            <header className="flex items-start justify-between">
              <div className="grid gap-1">
                <h1 className="text-xl ">{team ? team.name : 'Team'}</h1>
                <p className="text-sm">Invite new member in your team</p>
              </div>
              <New team_id={teamId} />
            </header>
            <main>
              <DataTable columns={columns} data={members} loading={loading} />
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default Team;

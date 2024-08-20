'use client';
import React, { useEffect, useState } from 'react';
import { DataTable } from '../_components/dataTableComponents/data-table';
import { columns } from '../_components/dataTableComponents/column';
import data from '../_components/dataTableComponents/data';
import { prisma } from '@/lib/db';
import axios from 'axios';

const Leads = () => {
  const [loading, setLoading] = useState(false);
  const [leadData, setLeadData] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const response = await axios.get('/api/lead');
        setLeadData(response.data);
      } catch (error) {
        setError('Failed to load leads');
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex justify-center items-center">
      <DataTable data={leadData} columns={columns} />
    </div>
  );
};

export default Leads;

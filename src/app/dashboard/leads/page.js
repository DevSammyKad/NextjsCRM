import React from "react";
import { DataTable } from "../_components/dataTableComponents/data-table";
import { columns } from "../_components/dataTableComponents/column";
import { getLeads } from "@/actions"; // Assuming the action is in the same directory

const Leads = async () => {
  const { data: leadData, error } = await getLeads();

  if (error) return <div>{error}</div>;

  return (
    <div className="flex items-center justify-center">
      <DataTable data={leadData} columns={columns} />
    </div>
  );
};

export default Leads;

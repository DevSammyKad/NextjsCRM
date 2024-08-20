'use client';

import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { incomeType, categories } from './data';
import { sourceOptions, statusOptions } from './data';
import { useState } from 'react';
import { DataTableViewOptions } from './data-table-view-options';
import { RotateCcw, TrashIcon } from 'lucide-react';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import AddLead from './AddLead';

export function DataTableToolbar({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const handleDateSelect = ({ from, to }) => {
    setDateRange({ from, to });
    // Filter table data based on selected date range
    table.getColumn('date')?.setFilterValue([from, to]);
  };

  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Filter labels..."
          value={table.getColumn('name')?.getFilterValue() ?? ''}
          onChange={(event) => {
            table.getColumn('name')?.setFilterValue(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('source') && (
          <DataTableFacetedFilter
            column={table.getColumn('source')}
            title="source"
            options={sourceOptions}
          />
        )}
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title="status"
            options={statusOptions}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <RotateCcw className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <Button variant="outline" size="sm">
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete ({table.getFilteredSelectedRowModel().rows.length})
          </Button>
        ) : (
          <AddLead />
        )}

        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}

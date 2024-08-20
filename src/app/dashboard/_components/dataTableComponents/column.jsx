'use client';

import { ColumnDef } from '@tanstack/react-table';
// import { Expense } from './schema';
import { cn } from '@/lib/utils';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

export const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lead Name" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] capitalize">{row.getValue('name')}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'source',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Source" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {row.getValue('source')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'age',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Age" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span className="capitalize"> {row.getValue('age')}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span className="capitalize"> {row.getValue('phone')}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status');
      return (
        <div className="flex w-[100px] items-center">
          <span
            className={`${status === 'NEW' ? 'px-4 py-2 rounded-lg text-green-500 bg-green-50 dark:text-green-200  dark:bg-green-100/25' : ''}
            ${status === 'CONTACTED' ? 'px-4 py-2 rounded-lg text-blue-500  bg-blue-50 dark:text-blue-200  dark:bg-blue-100/25' : ''}
            ${status === 'FOLLOW_UP' ? 'px-4 py-2 rounded-lg text-yellow-500 bg-yellow-50 dark:text-yellow-200  dark:bg-yellow-100/25' : ''}
            ${status === 'CONVERTED' ? 'px-4 py-2 rounded-lg text-green-500 bg-green-50 dark:text-green-200  dark:bg-green-100/25' : ''}
            ${status === 'CLOSED' ? 'px-4 py-2 rounded-lg text-indigo-500 bg-indigo-50 dark:text-indigo-200  dark:bg-indigo-100/25' : ''}
            ${status === 'MISSED' ? 'px-4 py-2 rounded-lg text-red-500 bg-red-50 dark:text-red-200  dark:bg-red-100/25' : ''}
      `}
          >
            {status}
          </span>
          {/* <span className="capitalize">{status.toLowerCase()}</span> */}
          {/* <span className="capitalize"> {row.getValue('status')}</span> */}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'note',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Note" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span className="truncate tr">{row.getValue('note')}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      // const date = new Date(row.getValue('date'));
      // const formattedDate = date.toLocaleDateString('en-US', {
      //   day: '2-digit',
      //   month: 'short',
      //   year: 'numeric',
      // });
      return (
        <div className="flex w-[100px] items-center">
          <span className="capitalize">{row.getValue('date')}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id));
      const [startDate, endDate] = value;
      return rowDate >= startDate && rowDate <= endDate;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];

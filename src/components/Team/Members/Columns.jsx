import useHelpers from "@/hooks/useHelpers";
import { ColumnDef } from "@tanstack/react-table";
import Roles from "./Options/Roles";
import { Badge } from "@/components/ui/badge";
import Options from "./Options";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export const columns = [
  {
    id: "name",
    accessorKey: "name",
    header: () => <span>Name</span>,
    cell: ({ row }) => {
      const name = row.getValue("name");
      const email = row.original.email;

      return (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black font-bold capitalize text-white">
            {name[0]}
          </div>
          <div className="grid">
            <span className="font-medium">{name}</span>
            <span className="text-xs text-neutral-500">{email}</span>
          </div>
          <Toaster />
        </div>
      );
    },
  },
  {
    id: "role",
    accessorKey: "role",
    header: () => <span>Role</span>,
    cell: ({ row }) => {
      const { loading, setLoading, open, setOpen } = useHelpers();
      const role = row.getValue("role");
      const id = row.original.id;
      const member = {
        id,
        name: row.original.name,
        email: row.original.email,
        role,
      };

      const onRoleChanged = async (v) => {
        try {
          setLoading(true);
          const response = await fetch("/api/team", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
              type: "role",
              value: v,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Something went wrong");
          }

          toast.success("Role updated successfully");
        } catch (error) {
          console.error("Error updating role:", error);
          toast.error("Failed to update role");
        } finally {
          setOpen(false);
          setLoading(false);
        }
      };
      return (
        <div onClick={() => setOpen(!open)} className="w-[120px]">
          {!open && (
            <span className="text-sm capitalize text-neutral-500">{role}</span>
          )}
          {open && (
            <Roles
              {...{ selected: role }}
              setSelected={(value) => onRoleChanged(value)}
            />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      switch (status) {
        case "pending":
          return (
            <Badge className="bg-orange-50 capitalize text-orange-900 hover:bg-transparent">
              Pending
            </Badge>
          );
        case "active":
          return (
            <Badge className="bg-green-50 capitalize text-green-900 hover:bg-transparent">
              Active
            </Badge>
          );
        case "removed":
          return (
            <Badge className="bg-red-50 capitalize text-red-900 hover:bg-transparent">
              Removed
            </Badge>
          );
        default:
          return (
            <Badge className="bg-neutral-100 capitalize text-neutral-600">
              Unknown
            </Badge>
          );
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex justify-end">
          <Options {...{ user }} />
        </div>
      );
    },
  },
];

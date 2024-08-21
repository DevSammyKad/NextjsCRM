import { EllipsisVertical, UserX } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useHelpers from "@/hooks/useHelpers";
import Remove from "./Remove";

export default function Options({ user }) {
  const { open, setOpen, selected, setSelected } = useHelpers(); // Removed default value assignment

  const menu = [
    {
      title: "Remove member",
      key: "remove",
      icon: <UserX className="w-[20px]" />,
    },
  ];

  const handleClose = () => {
    setOpen(false);
    setSelected("");
  };

  return (
    <div>
      <Remove
        {...{
          user,
          open: selected === "remove" && open, // Ensure the dialog opens only if selected is 'remove' and open is true
          onClose: handleClose, // Improved onClose handler
        }}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical className="w-4 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            {menu.map((item, i) => (
              <DropdownMenuItem
                key={item.key}
                className="flex cursor-pointer gap-2"
                onClick={() => {
                  setSelected(item.key);
                  setOpen(true);
                }}
              >
                {item.icon}
                <span>{item.title}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

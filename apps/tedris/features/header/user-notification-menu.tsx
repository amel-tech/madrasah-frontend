import { BellIcon } from "@madrasah/icons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@madrasah/ui/components/hover-card";

export const UserNotifications = () => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <BellIcon size={24} className="text-primary" />
      </HoverCardTrigger>
      <HoverCardContent>
        <p>No new notifications</p>
      </HoverCardContent>
    </HoverCard>
  );
};

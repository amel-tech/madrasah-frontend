import { getServerSession } from "next-auth";
import KeycloakLogin from "~/features/keycloak/login";
import authOptions from "~/lib/auth_options";
import { MadrasahLogoIcon } from "@madrasah/icons";
import { Input } from "@madrasah/ui/components/input";
import { UserHeaderMenu } from "./user-header-menu";
import { UserNotifications } from "./user-notification-menu";

export const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="flex justify-between items-center container mx-auto my-8">
      <div className="flex gap-4 items-center">
        <MadrasahLogoIcon size={36} />
        <p className="text-xl font-medium text-brand-primary">
          Online Madrasah
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <Input placeholder="Search..." className="max-w-64 p-4" />
        {session ? (
          <>
            <UserNotifications />
            <UserHeaderMenu />
          </>
        ) : (
          <KeycloakLogin />
        )}
      </div>
    </header>
  );
};

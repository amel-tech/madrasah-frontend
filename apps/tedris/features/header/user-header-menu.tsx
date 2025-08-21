'use client'

import { signOut, useSession } from 'next-auth/react'
import { BookIcon, CaretDownIcon, CircleNotchIcon, GearIcon, GlobeIcon, QuestionIcon, SignOutIcon, UserIcon } from '@madrasah/icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@madrasah/ui/components/dropdown-menu'
import { UserAvatar } from '../user-avatar'

export const UserHeaderMenu = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <CircleNotchIcon className="h-6 w-6 animate-spin" />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-2 cursor-pointer select-none hover:bg-gray-100 rounded-md">
          <UserAvatar user={session?.user} />
          <div className="flex flex-col text-left">
            <p className="text-sm whitespace-nowrap">{session.user.name}</p>
            <p className="text-xs whitespace-nowrap text-neutral-tertiary">Talebe</p>
          </div>
          <CaretDownIcon size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2">
        <DropdownMenuLabel>Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <BookIcon className="text-neutral-primary" />
          <p className="text-neutral-primary text-sm">
            My Learning
          </p>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <UserIcon className="text-neutral-primary" />
          <p className="text-neutral-primary text-sm">
            Profile
          </p>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <GearIcon className="text-neutral-primary" />
          <p className="text-neutral-primary text-sm">
            Account Settings
          </p>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <GlobeIcon className="text-neutral-primary" />
          <p className="text-neutral-primary text-sm">
            Language
          </p>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <QuestionIcon className="text-neutral-primary" />
          <p className="text-neutral-primary text-sm">
            Help and Support
          </p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
          <SignOutIcon className="text-neutral-primary" />
          <p className="text-neutral-primary text-sm">Sign out</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

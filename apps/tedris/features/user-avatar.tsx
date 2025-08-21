import { BaseUser } from 'next-auth'
import Image from 'next/image'

type UserAvatar = {
  user?: BaseUser
}
export const UserAvatar = ({ user }: UserAvatar) => {
  const initials = `${user.name}`.split(' ').map(name => name.charAt(0)).join('')

  return (
    <div className="border border-gray-300 rounded-sm h-9 w-9 overflow-hidden">
      {user.image
        ? <Image src={user.image} alt={user.name || ''} width={36} height={36} className="w-full h-full rounded-sm" />
        : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200">
              <span className="text-sm font-medium text-gray-700">
                {initials}
              </span>
            </div>
          )}
    </div>
  )
}

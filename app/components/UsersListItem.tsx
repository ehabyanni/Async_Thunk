import React from 'react'

export default function UsersListItem( { user }: any) {
  return (
    // <div className='mb-2 border rounded' key={user.id}>
    <div className='mb-2 border rounded'>
        <div className='flex p-2 justify-between items-center cursor-pointer'>
          {user.name}
        </div>
      </div>
  )
}
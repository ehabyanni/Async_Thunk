import React from 'react';
import { GoTrashcan } from 'react-icons/go';
import useThunk from '../hooks/use-thunk';
import { removeUser } from '../store';
import { Button } from 'antd';
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';

export default function UsersListItem({ user }: any) {

  const [doRemoveUser, isLoading, error] = useThunk(removeUser);

  const handleClick = () => {
    doRemoveUser(user);
  }

  const header = <>
    <Button className='mr-3' loading={isLoading} onClick={handleClick}>
      <GoTrashcan />
    </Button>
    {error && <div>Error deleting user.</div>}
    {user.name}
  </>;


  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  )

}
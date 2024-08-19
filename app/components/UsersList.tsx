'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, addUser } from '../store';
import Skeleton from './Skeleton';
import { Button } from 'antd';
import useThunk from '../hooks/use-thunk';
import UsersListItem from './UsersListItem';


export default function UsersList() {

  const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);
  // const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  // const [loadingUsersError, setLoadingUsersError] = useState(null);
  // const [isCreatingUser, setIsCreatingUser] = useState(false);
  // const [creatingUsersError, setCreatingUsersError] = useState(null);
  const dispatch = useDispatch();
  const { data } = useSelector((state: any) => {
    return state.users;
  })

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);


  let content;
  if (isLoadingUsers) {
    content = <Skeleton times={6} className={"w-[95%] h-10 m-auto"} />
  } else if (loadingUsersError) {
    content = <div>Error fetching data...</div>
  } else {
    content = data?.map((user: any) => {
      return <UsersListItem key={user?.id} user={user} />
    })
  }

  if (loadingUsersError) {
    return <div>Error fetching data...</div>
  }

  // const renderedUsers = data?.map((user: any) => {
  //   return <div className='mb-2 border rounded' key={user.id}>
  //     <div className='flex p-2 justify-between items-center cursor-pointer'>
  //       {user.name}
  //     </div>
  //   </div>
  // })

  const handleUserAdd = () => {
    // setIsCreatingUser(true);
    // dispatch(addUser() as any).unwrap()
    //   .catch((err: any) => setCreatingUsersError(err))
    //   .finally(() => setIsCreatingUser(false))
    doCreateUser();
  }


  return (
    <div>
      <div className='flex flex-row justify-between items-center m-3'>
        <h1 className='m-2 text-xl'>Users</h1>
        <Button onClick={handleUserAdd}
          loading={isCreatingUser === null || typeof isCreatingUser === 'function' ? false : isCreatingUser}
          disabled={isCreatingUser === null || typeof isCreatingUser === 'function' ? false : isCreatingUser}
        >
          + Add User
        </Button>
      </div>
      {content}
    </div>
  )
}
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Placeholder, Message } from 'rsuite'
import { HTTP_STATUS } from '../../app/constants'
import { fetchUsersData } from './usersSlice'
import { selectLoadingStatus, selectErrorStatus } from './selectors'
import UsersCards from './UsersCards'
import { unwrapResult } from '@reduxjs/toolkit' 
const Users = () => {
  const dispatch = useDispatch()
  const loading = useSelector(selectLoadingStatus)
  const error = useSelector(selectErrorStatus)

  useEffect(() => {
    // dispatch(fetchUsersData()).then(unwrapResult).then((obj) => {
    //   console.log({res: obj})
    // }).catch((obj) => {
    //   console.log({obj})
    // })

    const promise = dispatch(fetchUsersData())
    return () => {
      promise.abort()
    }
  }, [])

  return (
    <div>
      {loading === HTTP_STATUS.PENDING && (
        <Placeholder.Paragraph style={{ marginTop: 30 }} rows={5} active />
      )}
      {loading === HTTP_STATUS.REJECTED && (
        <Message
          showIcon
          closable
          type="error"
          title="Error"
          description={error}
        />
      )}
      {loading === HTTP_STATUS.FULFILLED && (
        <>
          <Message
            showIcon
            closable
            type="success"
            title="Success"
            description="Fetched data correctly"
          />
          <UsersCards />
        </>
      )}
    </div>
  )
}

export default Users

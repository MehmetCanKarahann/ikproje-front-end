import React, { useEffect } from 'react'
import Header from '../../components/molecules/CompanyAdmin/Header'
import SideBar from '../../components/molecules/CompanyAdmin/SideBar'
import CommentList from '../../components/organisms/CommentList'
import { useDispatch } from 'react-redux';
import { fetchGetComments, fetchGetCommentsByCompanyId } from '../../store/feature/commentSlice';
import { IKDispatch } from '../../store';

function CommentManagementPage() {

  const dispatch = useDispatch<IKDispatch>();

  useEffect(() => {
      dispatch(fetchGetCommentsByCompanyId())
  }, [])

  return (
    <>
      <div className='loader'>
        <div className='spinner-grow text-primary' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
      </div>

      <div className="connect-container align-content-stretch d-flex flex-wrap">
        <div className="page-sidebar">
          <SideBar />
        </div>
        <div className="page-container">
          <div className="page-header" >
            <Header />
          </div>
          <div className="page-content">
            <div className="row">
              <CommentList />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CommentManagementPage
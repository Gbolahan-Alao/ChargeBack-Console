import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CSidebar, CSidebarFooter, CSidebarNav, CSidebarToggler } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    // style={{ backgroundColor: '#521c78'}}
    <CSidebar
      style={{ color: '#fff !important' }}
      className="border-end"
      colorScheme="light"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <div style={{ margin: '20px', height: '100px', display: 'flex', marginBottom: '0px' }}>
        <div
          style={{
            height: '50px',
            width: '50px',
            borderRadius: '50%',
            marginRight: '10px',
            backgroundImage: "url('../polaris.jpg')",
            alignSelf: 'center',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        ></div>
        <div style={{ alignSelf: 'center', marginTop: '12px' }}>
          <h5 style={{ color: '#521c78' }}>Polaris Bank</h5>
        </div>
      </div>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)

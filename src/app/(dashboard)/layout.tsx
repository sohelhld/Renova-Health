import React from 'react'
import Sidebar from '../components/Sidebar'
import { FaBarsStaggered } from 'react-icons/fa6'
import Topbar from '../components/Topbar'


import { ReactNode } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <ProtectedRoute>
    <div>
      {/* Add the Top Bar here, above everything else */}
      <Topbar />

      {/* Existing layout below */}
      <div className='drawer lg:drawer-open pt-14'>  {/* Add padding to account for the fixed TopBar */}
        <input type="checkbox" id="my-drawer-2" className="drawer-toggle" />
        
        <div className="drawer-content">
          <label htmlFor='my-drawer-2' className='drawer-button lg:hidden fixed top-16 right-6'>
            <FaBarsStaggered className='w-8 h-8 text-primary' />
          </label>
          <div className='bg-base-200 px-8 py-12 min-h-screen'>{children}</div>
        </div>

        {/* Drawer-Side adjustments */}
        <div className="drawer-side lg:top-0 top-14"> {/* Ensure in small viewports, sidebar respects top bar */}
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className='drawer-overlay'></label>
          <Sidebar />
        </div>
      </div>
    </div>
    </ProtectedRoute>
  )
}

export default layout

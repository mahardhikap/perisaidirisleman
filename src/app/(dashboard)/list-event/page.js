import React from 'react';
import { FormListEvent, MenuDashboard } from '@/components';
import { PrivateRoute } from '@/Auth/auth';

function ListEvent() {
  return (
    <PrivateRoute>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 p-5">
          <div className="col-span-1 bg-white rounded-lg h-fit sticky top-0">
            <MenuDashboard />
          </div>
          <div className="col-span-3 pt-5 lg:p-5">
            <FormListEvent />
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}

export default ListEvent;

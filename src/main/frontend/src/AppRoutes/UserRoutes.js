import React from "react";
import { Route } from "react-router-dom";
import ReadingManage from '../components/user/ReadingManage';

function UserRoutes(){
    return(
        <>
            <Route path="/user/ReadingManage" element={<ReadingManage />} />
        </>
    )
}

export default UserRoutes;
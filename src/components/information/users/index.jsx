import React, { Suspense } from 'react';
import { useTranslation } from "react-i18next";
import {
    useNavigate, useLocation,
    useOutletContext
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'


// import UserProfile        from './UserProfile';
// import UserSetupSuccess   from './UserSetupSuccess';
// import InviteParticipants from './users/UserInviteParticipantsContractor';



const Users = (props) => {

    console.log('Hellow', props)
    return (
        <div>Hellow</div>
    )
}

export default Users
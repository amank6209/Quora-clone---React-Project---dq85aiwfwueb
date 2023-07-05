import React from "react";
import "./css/Box.css";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function Box() {

    const user = useSelector(selectUser);

    return (
        <div className='second-content'>
            <div className="quoraBox-info">
                <Avatar src={user.photo} />
                <h5>{user.displayName}</h5>
            </div>
            <div className="quoraBox-quora">
                <p>What is your qustion and link ?</p>
            </div>
        </div>

    );
}

export default Box;
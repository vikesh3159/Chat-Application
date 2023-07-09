import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";

import { createChat } from "../../actions/ChatAction";

const User = ({ person }) => {
  const publicFolder = 'https://kingdomaa.onrender.com/images/';
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch()
  
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)

  );


  const handleFollow = () => {

    if( !following && user.followers.includes(person._id) )
    {
      const newChat = {
      members : [ user._id , person._id ]
      };
      dispatch(createChat(newChat));
    }
    

    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user)) ;
    setFollowing((prev) => !prev) ;   

    
    

  };

  return (
    <div className="follower">
      <div>
      <img
            src={ person?.profilePicture? 'https://kingdomaa.onrender.com/images/' + person.profilePicture : 'https://kingdomaa.onrender.com/images/' + "defaultProfile.png"}
            alt="Profile"
            className="followerImage"
          />
        

        <div className="name">
          <span>{person.firstname}</span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;

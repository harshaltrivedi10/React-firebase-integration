import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { signOutFromGoogle } from '../firebase';

const CurrentUser = ({ displayName, photoURL, email, createdAt, children }) => {
  return (
    <section className="CurrentUser">
      <div className="CurrentUser--profile">
        {photoURL && <img src={photoURL} alt={displayName} />}
        <div className="CurrentUser--information">
          <Link to="/profile">
            <h2>{displayName}</h2>
          </Link>
          <p className="email">{email}</p>
          <p className="created-at">{moment(createdAt).calendar()}</p>
        </div>
      </div>
      <div>
        <div>{children}</div>
        <button onClick={signOutFromGoogle}>Sign Out</button>
      </div>
    </section>
  );
};

CurrentUser.defaultProps = {
  displayName: 'Harshal Trivedi',
  email: 'harshaltrivedi@blahblah.com',
  photoURL:
    'https://www.biography.com/.image/c_fit%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_620/MTQ4MDU5NDU0MzgwNzEzNDk0/lionel_messi_photo_josep_lago_afp_getty_images_664928892_resizedjpg.jpg',
  createdAt: new Date()
};

export default CurrentUser;

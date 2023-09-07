import { useSelector } from 'react-redux';
import '../assets/css/profile.css';

function Profile() {
  const missions = useSelector((state) => state.missions.missions);
  const joinedMissions = missions.filter((mission) => mission.reserved);

  const rockets = useSelector((state) => state.rockets.rockets);
  const reservedRockets = rockets.filter((rocket) => rocket.reserved);

  return (
    <div className="profile">

      <div className="missions-profile">
        <h2>My Missions</h2>
        <ul>
          {joinedMissions.map((mission) => (
            <li key={mission.mission_id} className="missions-list">
              <span className="mission-name">
                {mission.mission_name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rockets-profile">
        <h2>My Rockets</h2>
        <ul>
          {reservedRockets.map((rocket) => (
            <li key={rocket.id} className="rockets-list">
              <span className="rocket-name">
                {rocket.rocket_name}
              </span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default Profile;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { fetchMissions, joinMission, leaveMission } from '../redux/missions/missionsSlice';
import '../assets/css/missions.css';

function Missions() {
  const dispatch = useDispatch();
  const missions = useSelector((state) => state.missions.missions);
  const status = useSelector((state) => state.missions.status);
  const handleJoinMission = (id) => {
    dispatch(joinMission(id));
  };

  const handleLeaveMission = (id) => {
    dispatch(leaveMission(id));
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMissions());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  } if (status === 'succeeded') {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="mission-name">Mission</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission) => (
            <tr key={mission.mission_id}>
              <td className="mission-name">{mission.mission_name}</td>
              <td>{mission.description}</td>
              <td>
                <button
                  className="not-a-member"
                  type="button"
                  style={{
                    color: 'white',
                    backgroundColor: mission.reserved ? '#47a5a5' : '#777',
                    border: 'none',
                    cursor: 'default',
                  }}
                  disabled
                >
                  {mission.reserved ? 'Active Member' : 'Not a Member'}
                </button>
              </td>
              <td>
                {mission.reserved
                  ? (
                    <button
                      type="button"
                      onClick={() => handleLeaveMission(mission.mission_id)}
                      style={{
                        border: '1px solid red',
                        backgroundColor: 'transparent',
                        color: 'red',
                      }}
                    >
                      Leave Mission
                    </button>
                  )
                  : (
                    <button
                      type="button"
                      onClick={() => handleJoinMission(mission.mission_id)}
                      style={{
                        border: '1px solid black',
                        backgroundColor: 'transparent',
                        color: 'black',
                      }}
                    >
                      Join Mission
                    </button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  } if (status === 'failed') {
    return <div>Error loading missions.</div>;
  }

  return null;
}

export default Missions;

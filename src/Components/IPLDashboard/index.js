import { useEffect, useState } from "react";
import "./style.css";
import TeamCards from "../TeamCards";
import { TailSpin } from "react-loader-spinner";

const IPLDashboard = () => {
  const initialState = {
    fetchingStatus: "initaila",
    apiData: [],
  };
  const [state, setState] = useState(initialState);
  useEffect(() => {
    const fetchDate = async () => {
      setState({ ...state, fetchingStatus: "loading" });

      const url = "https://apis.ccbp.in/ipl";
      const options = {
        method: "GET",
      };
      const reqData = await fetch(url, options);
      if (reqData.ok) {
        const resData = await reqData.json();
        const modifyData = resData.teams.map((eachTeam) => {
          return {
            id: eachTeam.id,
            name: eachTeam.name,
            image: eachTeam.team_image_url,
          };
        });
        setState({ ...state, apiData: modifyData, fetchingStatus: "success" });
      }
    };
    fetchDate();
  }, []);

  const loading = () => (
    <div className="d-flex justify-content-center align-items-center">
      <TailSpin color="white" height={200} />
    </div>
  );
  const displayCards = () => {
    return (
      <div className="row">
        <ul className="d-flex flex-wrap justify-content-center">
          {state.apiData.map((eachTeam) => {
            return <TeamCards eachTeam={eachTeam} key={eachTeam.id} />;
          })}
        </ul>
      </div>
    );
  };
  const displayStateData = () => {
    switch (state.fetchingStatus) {
      case "loading":
        return loading();
      case "success":
        return displayCards();
      default:
        break;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="home-card">
          <div className="row p-3">
            <div className="d-flex align-items-center justify-content-center">
              <img
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                alt="logo"
                className="img-fluid"
              />
              <h1 className="text-light text-center">IPl Dashboard</h1>
            </div>
          </div>
          {displayStateData()}
        </div>
      </div>
    </div>
  );
};
export default IPLDashboard;

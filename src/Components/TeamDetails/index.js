import { useEffect, useState } from "react";
import "./style.css";
import { TailSpin } from "react-loader-spinner";

const TeamDetails = (prop) => {
  const { match } = prop;
  const { params } = match;
  const { id } = params;
  const initialState = {
    fetchingStatus: "initial",
    apiData: [],
  };
  const [state, setState] = useState(initialState);
  useEffect(() => {
    const fetchApiCall = async () => {
      setState({ ...state, fetchingStatus: "loading" });
      const url = `https://apis.ccbp.in/ipl/${id}`;
      const options = {
        method: "GET",
      };
      const reqData = await fetch(url, options);
      if (reqData.ok) {
        const resData = await reqData.json();
        setState({ ...state, apiData: resData, fetchingStatus: "success" });
      }
    };
    fetchApiCall();
  }, []);

  const displayLoading = () => (
    <div className="d-flex align-items-center justify-content-center">
      <TailSpin color="blue" height={600} width={100} />
    </div>
  );

  const displaySuccessView = () => {
    const { latest_match_details, recent_matches, team_banner_url } =
      state.apiData;
    console.log(recent_matches);
    return (
      <div className="d-flex flex-column  justify-content-center">
        <div className="row pt-2">
          <div className="col-12">
            <img
              src={team_banner_url}
              alt={team_banner_url}
              className="img-fluid team-bannger"
            />
          </div>
        </div>
        <h1 className="mt-3 ">Latest Matches</h1>
        <div className="row d-flex align-items-center justify-content-center bg-dark rounded text-light p-2 mt-1 mb-3">
          <div className="col-6 col-md-4">
            <h2 className="mb-3">{latest_match_details.competing_team}</h2>
            <p className="mb-3">{latest_match_details.date}</p>
            <p className="mb-3">{latest_match_details.venue}</p>
            <p className="mb-3">{latest_match_details.result}</p>
          </div>
          <div className="col-6 col-md-4 d-sm-flex align-items-end justify-content-end">
            <img
              src={latest_match_details.competing_team_logo}
              alt="logo"
              className="logo"
            />
          </div>
          <hr className="d-md-none mt-3 mb-3" />
          <div className="col-12 col-md-4 d-md-flex flex-column   align-items-end justify-content-end">
            <h4 className="mb-2 mt-2">First Innings</h4>
            <p>{latest_match_details.first_innings}</p>
            <h4 className="mb-2 mt-2">Second Innings</h4>
            <p>{latest_match_details.second_innings}</p>
            <h4 className="mb-2 mt-2">Man Of The Match</h4>
            <p>{latest_match_details.man_of_the_match}</p>
            <h4 className="mb-2 mt-2">Umpire</h4>
            <p>{latest_match_details.umpires}</p>
          </div>
        </div>
        <h1>Recent Matches</h1>
        <div className="row">
          <ul className="d-flex align-items-center justify-content-center flex-wrap">
            {recent_matches.map((each) => {
              return (
                <li className="col-12 col-md-5 col-lg-3  bg-secondary m-2 rounded p-2 d-flex flex-column align-items-center justify-content-center text-light text-center recent-card">
                  <img
                    src={each.competing_team_logo}
                    alt="logo"
                    className="recent-match-logo mb-3"
                  />
                  <h3>{each.competing_team}</h3>
                  <p>{each.result}</p>
                  <p className={each.match_status === "Won" ? "green" : "red"}>
                    {each.match_status}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  const displayData = () => {
    switch (state.fetchingStatus) {
      case "loading":
        return displayLoading();
      case "success":
        return displaySuccessView();
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="row">{displayData()}</div>
    </div>
  );
};
export default TeamDetails;
/*{
  competing_team
: 
"Sunrisers Hyderabad"
competing_team_logo
: 
"https://assets.ccbp.in/frontend/react-js/srh-logo-img.png"
date
: 
"2020-11-06"
first_innings
: 
"Royal Challengers Bangalore"
id
: 
"1237178"
man_of_the_match
: 
"KS Williamson"
match_status
: 
"Lost"
result
: 
"Sunrisers Hyderabad Won by 6 wickets"
second_innings
: 
"Sunrisers Hyderabad"
umpires
: 
"PR Reiffel, S Ravi"
venue
:
}*/

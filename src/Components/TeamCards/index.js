import "./style.css";
import { Link } from "react-router-dom";

const TeamCards = (prop) => {
  const { eachTeam } = prop;
  const { id, name, image } = eachTeam;
  return (
    <Link
      to={`/teams/${id}`}
      className="col-12 col-md-5 text-decoration-none  m-1"
    >
      <li className="d-flex align-items-center justify-content-between bg-light border-1 border-seecondary rounded p-1">
        <img src={image} alt={id} className="img-fluid" />
        <h4 className="team-name">{name}</h4>
      </li>
    </Link>
  );
};
export default TeamCards;

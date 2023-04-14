import "./link.style.css";

import { Link } from "react-router-dom";

const AnimatedLink = ({ to, text }) => {
  return (
    <Link to={to} className="animated-link fs-500 text-color-black">
      {text}
    </Link>
  );
};

export default AnimatedLink;

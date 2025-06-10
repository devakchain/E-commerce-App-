import React from "react";
import "../style/LinkWithIcon.css";
import { NavLink } from "react-router-dom";

function LinkWithIcon({ title, link, emoji, sidebar }) {
  return (
    <NavLink
      to={link}
      className={sidebar ? "align_center sidebar_link" : "align_center"}
    >
      {title} <img src={emoji} />
    </NavLink>
  );
}

export default LinkWithIcon;

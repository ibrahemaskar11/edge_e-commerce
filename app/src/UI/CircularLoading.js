import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import clsases from "./CircularLoading.module.css";
const CircularLoading = (props) => {
  return (
    <div className={clsases.circle}>
      <CircularProgress color="inherit" size='64px' className="mb-8"/>
      <p>{props.panner}...</p>
    </div>
  );
};
export default CircularLoading;

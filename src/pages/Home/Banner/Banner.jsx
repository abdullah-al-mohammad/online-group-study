import React from "react";
import { Link } from "react-router";
import './banner.css'

const Banner = () => {
  return (
    <div className="bgBanner min-h-screen">
      <div className="text-center text-white pt-7">
        <h1 className="text-7xl tracking-wide text-blue-600">T H I N K I N G </h1>
        <h5 className="text-2xl py-2 text-gray-700">Shapes the world around you</h5>
        <Link className="btn btn-primary">Create Assignment</Link>
      </div>
    </div>
  );
};

export default Banner;

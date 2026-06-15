"use client";
import axios from "axios";

const CurrentWeekAppointments = () => {
  const appointments = () => axios.get("http://localhost:3000/api/appointment");
  console.log(appointments);

  return (
    <>
      <div>Current Week appointments</div>
    </>
  );
};

export default CurrentWeekAppointments;

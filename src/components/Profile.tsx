"use client";
import { useEffect, useState } from "react";
import { Hanko, register } from "@teamhanko/hanko-elements";
import { hankoApi } from "./Login";
import { User2 } from "lucide-react";


export const Profile = () => {
  const [openState, setOpenState] = useState(false);

  useEffect(() => {
    register(hankoApi).catch((error) => {
      console.log(error);
    });
  }, []);

 
  const openProfile = () => {
    setOpenState(true);
  };

  const closeProfile = () => {
    setOpenState(false);
  };


  return (
    <>
    <button type="button" onClick={openProfile}>
      <User2 className="w-10 h-8 bg-slate-300 rounded-md shadow-md" />
    </button>
    {openState && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50"
        //   onClick={closeProfile} // Close the modal when clicking outside
        >
          <div
            className="w-[450px] h-auto rounded-2xl bg-white p-5"
          >
            <hanko-profile/>
            <button type="button" onClick={closeProfile}>
              Close
            </button>
          </div>
        </div>
      )}
  </>
  );
};
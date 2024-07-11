"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchPatientData, Patient } from "../utils/api";

const Patients: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPatientData();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex shadow-md">
      <nav
        className={`${
          open ? "w-60" : "w-20"
        } bg-white h-full p-5 rounded-3xl pt-8 relative duration-300`}
      >
        <button
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="patient-list"
        >
          <img src="/assets/control.png" alt="Toggle menu" />
        </button>

        <div className="flex gap-20 items-center pb-8">
          <h1
            className={`origin-left text-primary-200 font-medium text-2xl font-extrabold duration-200 ${
              !open && "text-xs"
            }`}
          >
            Patients
          </h1>
          <Image
            src="/assets/search_FILL0_wght300_GRAD0_opsz24.svg"
            className={`cursor-pointer duration-500 ${!open && "scale-0"}`}
            alt="Search icon"
            width={20}
            height={20}
          />
        </div>
        <ul id="patient-list">
          {patients.map((patient, index) => (
            <li key={index} className="py-2 text-sm">
              <div className="flex items-center gap-2">
                <Image
                  src={patient.profile_picture}
                  alt={`Profile picture of ${patient.name}`}
                  width={50}
                  height={50}
                />
                <div
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  <div className="font-bold text-primary-200 text-sm">
                    {patient.name}
                  </div>
                  <div className="text-secondary-500 text-sm">
                    {patient.gender}, {patient.age}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Patients;

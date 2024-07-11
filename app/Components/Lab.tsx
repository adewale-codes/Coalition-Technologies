"use client";
import React, { useEffect, useState } from "react";
import { fetchPatientData, Patient } from "../utils/api";
import Image from "next/image";

const Lab: React.FC = () => {
  const [labResults, setLabResults] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchPatientData();
        const patient: Patient | undefined = result.find(
          (p: Patient) => p.name === "Jessica Taylor"
        );

        if (patient) {
          setLabResults(patient.lab_results);
        } else {
          console.error("Patient not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (labResults.length === 0) return <div>Loading...</div>;

  return (
    <main className="bg-white w-full rounded-lg shadow-md mt-8 p-5">
      <header className="font-extrabold text-2xl text-primary-200 mb-4">
        Lab Results
      </header>
      {labResults.map((result, index) => (
        <div key={index} className="flex justify-between items-center mb-5">
          <p>{result}</p>
          <button aria-label="Download lab result">
            <Image
              src="/assets/download_FILL0_wght300_GRAD0_opsz24 (1).svg"
              alt="Download lab result icon"
              width={20}
              height={20}
            />
          </button>
        </div>
      ))}
    </main>
  );
};

export default Lab;

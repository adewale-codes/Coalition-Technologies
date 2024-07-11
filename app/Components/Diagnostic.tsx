"use client";
import React, { useEffect, useState } from "react";
import {
  fetchPatientData,
  Patient,
  Diagnostic as DiagnosticType,
} from "../utils/api";

const Diagnostic: React.FC = () => {
  const [diagnosticList, setDiagnosticList] = useState<DiagnosticType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchPatientData();
        const patient: Patient | undefined = result.find(
          (p: Patient) => p.name === "Jessica Taylor"
        );

        if (patient) {
          setDiagnosticList(patient.diagnostic_list);
        } else {
          console.error("Patient not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (diagnosticList.length === 0) {
    return <div aria-live="polite">Loading...</div>;
  }

  return (
    <div className="mt-8 w-full shadow-md text-primary-200 rounded-lg bg-white p-4">
      <h1 className="font-extrabold text-2xl mb-4">Diagnostic List</h1>
      <table className="w-full text-sm">
        <thead className="bg-secondary-600 rounded-xl">
          <tr className="text-left">
            <th className="p-4" scope="col">
              Problem/Diagnosis
            </th>
            <th className="pl-4" scope="col">
              Description
            </th>
            <th className="pl-4" scope="col">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {diagnosticList.map((diagnostic, index) => (
            <tr key={index} className=" rounded-3xl">
              <td className="p-4">{diagnostic.name}</td>
              <td className="p-4">{diagnostic.description}</td>
              <td className="p-4">{diagnostic.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Diagnostic;

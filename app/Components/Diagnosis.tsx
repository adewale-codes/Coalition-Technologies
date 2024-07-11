"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Image from "next/image";
import { fetchPatientData, Patient } from "../utils/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Diagnosis: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [timeRange, setTimeRange] = useState(6);
  const [currentPressure, setCurrentPressure] = useState<{
    systolic: {
      value: number;
      levels: string;
    };
    diastolic: {
      value: number;
      levels: string;
    };
  } | null>(null);
  const [respiratoryRate, setRespiratoryRate] = useState<{
    value: number;
    levels: string;
  } | null>(null);
  const [temperature, setTemperature] = useState<{
    value: number;
    levels: string;
  } | null>(null);
  const [heartRate, setHeartRate] = useState<{
    value: number;
    levels: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchPatientData();
        const patient: Patient | undefined = result.find(
          (p: Patient) => p.name === "Jessica Taylor"
        );

        if (patient) {
          const history = patient.diagnosis_history.slice(-timeRange);
          setData({
            labels: history.map((h) => `${h.month} ${h.year}`),
            datasets: [
              {
                label: "Systolic",
                data: history.map((h) => h.blood_pressure.systolic.value),
                borderColor: "rgba(194, 110, 180, 1)",
                backgroundColor: "rgba(230, 111, 210, 1)",
                tension: 0.4,
              },
              {
                label: "Diastolic",
                data: history.map((h) => h.blood_pressure.diastolic.value),
                borderColor: "rgba(126, 108, 171, 1)",
                backgroundColor: "rgba(140, 111, 230, 1)",
                tension: 0.4,
              },
            ],
          });

          const latestHistory = history[history.length - 1];
          setCurrentPressure(latestHistory.blood_pressure);
          setRespiratoryRate(latestHistory.respiratory_rate);
          setTemperature(latestHistory.temperature);
          setHeartRate(latestHistory.heart_rate);
        } else {
          console.error("Patient not found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [timeRange]);

  if (
    !data ||
    !currentPressure ||
    !respiratoryRate ||
    !temperature ||
    !heartRate
  )
    return <div>Loading...</div>;

  const getStatusText = (levels: string) => {
    if (levels === "Higher than Average") {
      return (
        <div className="flex items-center gap-2">
          <Image
            src="/assets/ArrowUp.svg"
            alt="Arrow pointing up"
            width={10}
            height={10}
          />
          <p className="text-xs">Higher than average</p>
        </div>
      );
    } else if (levels === "Lower than Average") {
      return (
        <div className="flex items-center gap-2">
          <Image
            src="/assets/ArrowDown.svg"
            alt="Arrow pointing down"
            width={10}
            height={10}
          />
          <p className="text-xs">Lower than average</p>
        </div>
      );
    } else {
      return <p className="text-xs">Normal</p>;
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md w-full">
      <h2 className="font-extrabold text-primary-200 text-2xl font-semibold mb-4">
        Diagnosis History
      </h2>
      <div className="flex rounded-lg bg-secondary-400 flex-col p-4 md:flex-row gap-5">
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold text-primary-200">
              Blood Pressure
            </span>
            <select
              aria-label="Select time range for blood pressure history"
              className="px-2 py-1 bg-secondary-400 text-primary-200"
              value={timeRange}
              onChange={(e) => setTimeRange(parseInt(e.target.value, 10))}
            >
              <option value={3}>Last 3 months</option>
              <option value={6}>Last 6 months</option>
              <option value={12}>Last 12 months</option>
            </select>
          </div>
          <div className="w-full h-64 md:h-96">
            <Line
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <div className="flex pb-2 flex-col gap-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div>
                <Image
                  src="/assets/dott.svg"
                  alt="Small colored dot icon"
                  width={12}
                  height={12}
                />
              </div>
              <div>
                <p>Systolic</p>
              </div>
            </div>
            <div>
              <p className="font-bold text-xl">
                {currentPressure.systolic.value}
              </p>
            </div>
            <div>{getStatusText(currentPressure.systolic.levels)}</div>
          </div>
          <div className="flex py-2 flex-col gap-2">
            <div className="flex items-center gap-2">
              <div>
                <Image
                  src="/assets/dot.svg"
                  alt="Small colored dot icon"
                  width={12}
                  height={12}
                />
              </div>
              <div>
                <p>Diastolic</p>
              </div>
            </div>
            <div>
              <p className="font-bold text-xl">
                {currentPressure.diastolic.value}
              </p>
            </div>
            <div>{getStatusText(currentPressure.diastolic.levels)}</div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col md:flex-row justify-center pt-5 gap-5">
          <div className="h-1/2 text-primary-200 bg-secondary-200 rounded-xl w-full pl-4 py-4">
            <div>
              <div>
                <Image
                  src="/assets/respiratory rate.svg"
                  alt="Respiratory icon"
                  width={50}
                  height={50}
                />
              </div>
              <div>
                <p className="font-medium">Respiratory Rate</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold">
                  {respiratoryRate.value} bpm
                </p>
              </div>
              <div className="text-sm">
                {getStatusText(respiratoryRate.levels)}
              </div>
            </div>
          </div>
          <div className="h-1/2 bg-secondary-300 text-primary-200 rounded-xl w-full pl-4 py-4">
            <div>
              <div>
                <Image
                  src="/assets/temperature.svg"
                  alt="Temperature icon"
                  width={50}
                  height={50}
                />
              </div>
              <div>
                <p className="font-medium">Temperature</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold">
                  {temperature.value}° F
                </p>
              </div>
              <div className="text-sm">{getStatusText(temperature.levels)}</div>
            </div>
          </div>
          <div className="h-1/2 bg-secondary-100 text-primary-200 rounded-xl w-full pl-4 py-4">
            <div>
              <div>
                <Image
                  src="/assets/HeartBPM.svg"
                  alt="Heart rate icon"
                  width={50}
                  height={50}
                />
              </div>
              <div>
                <p className="font-medium">Heart Rate</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold">{heartRate.value} bpm</p>
              </div>
              <div className="text-sm">{getStatusText(heartRate.levels)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;

export interface BloodPressure {
  systolic: {
    value: number;
    levels: string;
  };
  diastolic: {
    value: number;
    levels: string;
  };
}

export interface DiagnosisHistory {
  month: string;
  year: number;
  blood_pressure: BloodPressure;
  respiratory_rate: {
    value: number;
    levels: string;
  };
  temperature: {
    value: number;
    levels: string;
  };
  heart_rate: {
    value: number;
    levels: string;
  };
}

export interface Diagnostic {
  name: string;
  description: string;
  status: string;
}

export interface Patient {
  name: string;
  gender: string;
  age: number;
  profile_picture: string;
  date_of_birth: string;
  phone_number: string;
  emergency_contact: string;
  insurance_type: string;
  diagnosis_history: DiagnosisHistory[];
  diagnostic_list: Diagnostic[];
  lab_results: string[];
}

const API_URL = "https://fedskillstest.coalitiontechnologies.workers.dev";

const username = "coalition";
const password = "skills-test";

const headers = new Headers();
headers.set("Authorization", "Basic " + btoa(username + ":" + password));

export const fetchPatientData = async (): Promise<Patient[]> => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  if (!Array.isArray(result)) {
    throw new Error("Expected an array");
  }

  return result;
};

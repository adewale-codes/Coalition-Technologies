import { render, screen, waitFor } from "@testing-library/react";
import Diagnosis from "../Components/Diagnosis";
import { fetchPatientData } from "../utils/api";

jest.mock("../utils/api");

const mockPatientData = [
  {
    name: "Jessica Taylor",
    diagnosis_history: [
      {
        month: "January",
        year: 2023,
        blood_pressure: {
          systolic: { value: 120, levels: "Normal" },
          diastolic: { value: 80, levels: "Normal" },
        },
        respiratory_rate: { value: 16, levels: "Normal" },
        temperature: { value: 98.6, levels: "Normal" },
        heart_rate: { value: 70, levels: "Normal" },
      },
    ],
  },
];

describe("Diagnosis Component", () => {
  it("fetches and displays diagnosis data", async () => {
    (fetchPatientData as jest.Mock).mockResolvedValue(mockPatientData);

    render(<Diagnosis />);

    await waitFor(() => {
      expect(screen.getByText("Diagnosis History")).toBeInTheDocument();
      expect(screen.getByText("120")).toBeInTheDocument();
      expect(screen.getByText("80")).toBeInTheDocument();
      expect(screen.getByText("16")).toBeInTheDocument();
      expect(screen.getByText("98.6° F")).toBeInTheDocument();
      expect(screen.getByText("70 bpm")).toBeInTheDocument();
    });
  });
});

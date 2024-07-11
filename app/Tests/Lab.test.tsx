import { render, screen, waitFor } from "@testing-library/react";
import Lab from "../Components/Lab";
import { fetchPatientData } from "../utils/api";

jest.mock("../utils/api");

const mockPatientData = [
  {
    name: "Jessica Taylor",
    lab_results: ["Hemoglobin: 14 g/dL", "Cholesterol: 190 mg/dL"],
  },
];

describe("Lab Component", () => {
  it("fetches and displays lab data", async () => {
    (fetchPatientData as jest.Mock).mockResolvedValue(mockPatientData);

    render(<Lab />);

    await waitFor(() => {
      expect(screen.getByText("Hemoglobin: 14 g/dL")).toBeInTheDocument();
      expect(screen.getByText("Cholesterol: 190 mg/dL")).toBeInTheDocument();
    });
  });

  it("renders loading state initially", () => {
    render(<Lab />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("handles empty lab results", async () => {
    (fetchPatientData as jest.Mock).mockResolvedValue([{ name: "Jessica Taylor", lab_results: [] }]);

    render(<Lab />);

    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import Diagnostic from "../Components/Diagnostic";
import { fetchPatientData } from "../utils/api";

jest.mock("../utils/api");

const mockPatientData = [
  {
    name: "Jessica Taylor",
    diagnostic_list: [
      { name: "Hypertension", description: "High blood pressure", status: "Chronic" },
      { name: "Diabetes", description: "High blood sugar", status: "Controlled" },
    ],
  },
];

describe("Diagnostic Component", () => {
  it("fetches and displays diagnostic data", async () => {
    (fetchPatientData as jest.Mock).mockResolvedValue(mockPatientData);

    render(<Diagnostic />);

    await waitFor(() => {
      expect(screen.getByText("Hypertension")).toBeInTheDocument();
      expect(screen.getByText("High blood pressure")).toBeInTheDocument();
      expect(screen.getByText("Chronic")).toBeInTheDocument();
      expect(screen.getByText("Diabetes")).toBeInTheDocument();
      expect(screen.getByText("High blood sugar")).toBeInTheDocument();
      expect(screen.getByText("Controlled")).toBeInTheDocument();
    });
  });

  it("renders loading state initially", () => {
    render(<Diagnostic />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("handles empty diagnostic list", async () => {
    (fetchPatientData as jest.Mock).mockResolvedValue([{ name: "Jessica Taylor", diagnostic_list: [] }]);

    render(<Diagnostic />);

    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });
});

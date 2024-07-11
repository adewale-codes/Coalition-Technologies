import { render, screen, waitFor } from "@testing-library/react";
import Profile from "../Components/Profile";
import { fetchPatientData } from "../utils/api";

jest.mock("../utils/api");

const mockPatientData = [
  {
    name: "Jessica Taylor",
    gender: "Female",
    age: 30,
    profile_picture: "/path/to/profile_picture.jpg",
    date_of_birth: "1993-05-21",
    phone_number: "+1234567890",
    emergency_contact: "+0987654321",
    insurance_type: "Health Insurance Co.",
    diagnosis_history: [],
    diagnostic_list: [],
    lab_results: [],
  },
];

describe("Profile Component", () => {
  it("fetches and displays profile data", async () => {
    (fetchPatientData as jest.Mock).mockResolvedValue(mockPatientData);

    render(<Profile />);

    await waitFor(() => {
      expect(screen.getByText("Jessica Taylor")).toBeInTheDocument();
      expect(screen.getByText("1993-05-21")).toBeInTheDocument();
      expect(screen.getByText("Female")).toBeInTheDocument();
      expect(screen.getByText("+1234567890")).toBeInTheDocument();
      expect(screen.getByText("+0987654321")).toBeInTheDocument();
      expect(screen.getByText("Health Insurance Co.")).toBeInTheDocument();
    });
  });

  it("renders loading state initially", () => {
    render(<Profile />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("handles empty profile data", async () => {
    (fetchPatientData as jest.Mock).mockResolvedValue([]);

    render(<Profile />);

    await waitFor(() => {
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
  });
});

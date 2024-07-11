import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Patients from "../Components/Patients";
import { fetchPatientData } from "../utils/api";

jest.mock("../utils/api");

const mockPatients = [
  {
    name: "John Doe",
    gender: "Male",
    age: 30,
    profile_picture: "/assets/profile_pic.svg",
  },
];

describe("Patients Component", () => {
  it("fetches and displays patient data", async () => {
    (fetchPatientData as jest.Mock).mockResolvedValue(mockPatients);

    render(<Patients />);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  it("toggles the sidebar", () => {
    render(<Patients />);
    
    const toggleButton = screen.getByAltText("Toggle menu");
    fireEvent.click(toggleButton);

    expect(screen.getByRole("navigation")).toHaveClass("w-20");
    
    fireEvent.click(toggleButton);

    expect(screen.getByRole("navigation")).toHaveClass("w-60");
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import Nav from "../Components/Nav";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Nav Component", () => {
  it("renders the logo and navigation links", () => {
    (usePathname as jest.Mock).mockReturnValue("/");

    render(<Nav />);

    expect(screen.getByAltText("Test Company Logo")).toBeInTheDocument();
    expect(screen.getByLabelText("Navigate to Overview")).toBeInTheDocument();
    expect(screen.getByLabelText("Navigate to Patients")).toBeInTheDocument();
    expect(screen.getByLabelText("Navigate to Schedule")).toBeInTheDocument();
    expect(screen.getByLabelText("Navigate to Message")).toBeInTheDocument();
    expect(screen.getByLabelText("Navigate to Transactions")).toBeInTheDocument();
  });

  it("toggles the menu on mobile view", () => {
    render(<Nav />);
    
    const openMenuButton = screen.getByLabelText("Open menu");
    fireEvent.click(openMenuButton);

    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();

    const closeMenuButton = screen.getByLabelText("Close menu");
    fireEvent.click(closeMenuButton);

    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });
});

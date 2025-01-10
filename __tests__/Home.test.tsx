import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import ResumeGenerator from "@/app/page";
import { ResumeData } from "@/data";
import { ResumeFormProps } from "@/components/ResumeForm";

import { generateWordDocument } from "../utils/docx";

jest.mock("../utils/docx", () => ({
  generateWordDocument: jest.fn(),
}));

jest.mock("../components/ResumeForm", () => ({
  ResumeForm: ({ resumeData, setResumeData }: ResumeFormProps) => (
    <div data-testid="resume-form">
      <button onClick={() => setResumeData({ ...resumeData, name: "Test Name" })}>
        Update Resume
      </button>
    </div>
  ),
}));

describe("ResumeGenerator", () => {
  it("renders the component correctly", () => {
    render(<ResumeGenerator />);
    expect(screen.getByText("Professional Resume Generator")).toBeInTheDocument();
    expect(screen.getByText("Download Professional Resume")).toBeInTheDocument();
    expect(screen.getByTestId("resume-form")).toBeInTheDocument();
  });

  it("calls generateWordDocument with resume data when download button is clicked", () => {
    render(<ResumeGenerator />);
    const downloadButton = screen.getByText("Download Professional Resume");

    fireEvent.click(downloadButton);
    expect(generateWordDocument).toHaveBeenCalledWith(ResumeData);
  });

  it("updates resume data when ResumeForm updates it", () => {
    render(<ResumeGenerator />);
    const updateButton = screen.getByText("Update Resume");

    fireEvent.click(updateButton);
    const downloadButton = screen.getByText("Download Professional Resume");

    fireEvent.click(downloadButton);
    expect(generateWordDocument).toHaveBeenCalledWith({ ...ResumeData, name: "Test Name" });
  });
});

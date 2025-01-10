"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResumeForm } from "@/components/ResumeForm";
import { ResumeDataTypes } from "@/types/resume";
import { ResumeData } from "@/data";
import { generateWordDocument } from "@/utils/docx";

const ResumeGenerator: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeDataTypes>(ResumeData);

  const handleDownloadClick = () => {
    generateWordDocument(resumeData);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Professional Resume Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
        <Button className="mt-4" onClick={handleDownloadClick}>
          Download Professional Resume
        </Button>
      </CardContent>
    </Card>
  );
};

export default ResumeGenerator;

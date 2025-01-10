import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ResumeDataTypes, SkillCategory } from "@/types/resume";

export interface ResumeFormProps {
  resumeData: ResumeDataTypes;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeDataTypes>>;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ resumeData, setResumeData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setResumeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayInputChange = (
    index: number,
    field: keyof ResumeDataTypes,
    subfield: string,
    value: string,
  ) => {
    setResumeData((prev) => {
      const newArray = Array.isArray(prev[field]) ? [...prev[field]] : [];

      newArray[index] = { ...newArray[index], [subfield]: value };

      return { ...prev, [field]: newArray };
    });
  };

  const handleSkillCategoryChange = (
    index: number,
    field: "category" | "skills",
    value: string,
  ) => {
    setResumeData((prev) => {
      const newSkills = [...prev.skills];

      if (field === "category") {
        newSkills[index] = { ...newSkills[index], category: value };
      } else {
        newSkills[index] = {
          ...newSkills[index],
          skills: value.split(",").map((skill) => skill.trim()),
        };
      }

      return { ...prev, skills: newSkills };
    });
  };

  const addArrayItem = (field: keyof ResumeDataTypes) => {
    setResumeData((prev) => ({
      ...prev,
      [field]: [
        ...prev[field],
        field === "experience"
          ? { title: "", company: "", location: "", duration: "", responsibilities: [""] }
          : field === "education"
            ? { degree: "", institution: "", location: "", year: "" }
            : field === "projects"
              ? { name: "", description: "", technologies: [] }
              : field === "certifications"
                ? { name: "", issuer: "", year: "" }
                : field === "skills"
                  ? { category: "", skills: [] }
                  : "",
      ],
    }));
  };

  const removeArrayItem = (field: keyof ResumeDataTypes, index: number) => {
    setResumeData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  return (
    <form className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={resumeData.name} onChange={handleInputChange} />
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={resumeData.title} onChange={handleInputChange} />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={resumeData.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" value={resumeData.phone} onChange={handleInputChange} />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          value={resumeData.location}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          name="summary"
          value={resumeData.summary}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <Label>Experience</Label>
        {resumeData.experience.map((exp, index) => (
          <div key={index} className="space-y-2 mt-2">
            <Input
              placeholder="Title"
              value={exp.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleArrayInputChange(index, "experience", "title", e.target.value)
              }
            />
            <Input
              placeholder="Company"
              value={exp.company}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleArrayInputChange(index, "experience", "company", e.target.value)
              }
            />
            <Input
              placeholder="Location"
              value={exp.location}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleArrayInputChange(index, "experience", "location", e.target.value)
              }
            />
            <Input
              placeholder="Duration"
              value={exp.duration}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleArrayInputChange(index, "experience", "duration", e.target.value)
              }
            />
            <Textarea
              placeholder="Responsibilities (one per line)"
              value={exp.responsibilities.join("\n")}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleArrayInputChange(
                  index,
                  "experience",
                  "responsibilities",
                  e.target.value.split("\n"),
                )
              }
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => removeArrayItem("experience", index)}
            >
              Remove Experience
            </Button>
          </div>
        ))}
        <Button className="mt-2" type="button" onClick={() => addArrayItem("experience")}>
          Add Experience
        </Button>
      </div>

      <div>
        <Label>Education</Label>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="space-y-2 mt-2">
            <Input
              placeholder="Degree"
              value={edu.degree}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleArrayInputChange(index, "education", "degree", e.target.value)
              }
            />
            <Input
              placeholder="Institution"
              value={edu.institution}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleArrayInputChange(index, "education", "institution", e.target.value)
              }
            />
            <Input
              placeholder="Location"
              value={edu.location}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleArrayInputChange(index, "education", "location", e.target.value)
              }
            />
            <Input
              placeholder="Year"
              value={edu.year}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleArrayInputChange(index, "education", "year", e.target.value)
              }
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => removeArrayItem("education", index)}
            >
              Remove Education
            </Button>
          </div>
        ))}
        <Button className="mt-2" type="button" onClick={() => addArrayItem("education")}>
          Add Education
        </Button>
      </div>

      <div>
        <Label>Skills</Label>
        {resumeData.skills.map((category: SkillCategory, index: number) => (
          <div key={index} className="space-y-2 mt-2">
            <Input
              placeholder="Skill Category"
              value={category.category}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSkillCategoryChange(index, "category", e.target.value)
              }
            />
            <Input
              placeholder="Skills (comma-separated)"
              value={category.skills.join(", ")}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSkillCategoryChange(index, "skills", e.target.value)
              }
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => removeArrayItem("skills", index)}
            >
              Remove Skill Category
            </Button>
          </div>
        ))}
        <Button className="mt-2" type="button" onClick={() => addArrayItem("skills")}>
          Add Skill Category
        </Button>
      </div>

      <div>
        <Label>Projects</Label>
        {resumeData.projects.map((project, index) => (
          <div key={index} className="space-y-2 mt-2">
            <Input
              placeholder="Project Name"
              value={project.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleArrayInputChange(index, "projects", "name", e.target.value)
              }
            />
            <Textarea
              placeholder="Project Description"
              value={project.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleArrayInputChange(index, "projects", "description", e.target.value)
              }
            />
            <Input
              placeholder="Technologies (comma-separated)"
              value={project.technologies.join(", ")}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleArrayInputChange(
                  index,
                  "projects",
                  "technologies",
                  e.target.value.split(",").map((tech) => tech.trim()),
                )
              }
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => removeArrayItem("projects", index)}
            >
              Remove Project
            </Button>
          </div>
        ))}
        <Button className="mt-2" type="button" onClick={() => addArrayItem("projects")}>
          Add Project
        </Button>
      </div>

      <div>
        <Label>Certifications</Label>
        {resumeData.certifications.map((cert, index) => (
          <div key={index} className="space-y-2 mt-2">
            <Input
              placeholder="Certification Name"
              value={cert.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleArrayInputChange(index, "certifications", "name", e.target.value)
              }
            />
            <Input
              placeholder="Issuer"
              value={cert.issuer}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleArrayInputChange(index, "certifications", "issuer", e.target.value)
              }
            />
            <Input
              placeholder="Year"
              value={cert.year}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleArrayInputChange(index, "certifications", "year", e.target.value)
              }
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => removeArrayItem("certifications", index)}
            >
              Remove Certification
            </Button>
          </div>
        ))}
        <Button className="mt-2" type="button" onClick={() => addArrayItem("certifications")}>
          Add Certification
        </Button>
      </div>

      <div>
        <Label htmlFor="languages">Languages (comma-separated)</Label>
        <Input
          id="languages"
          name="languages"
          value={resumeData.languages.join(", ")}
          onChange={(e) =>
            setResumeData((prev) => ({
              ...prev,
              languages: e.target.value.split(",").map((lang) => lang.trim()),
            }))
          }
        />
      </div>
    </form>
  );
};

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  ImageRun,
  ExternalHyperlink,
} from "docx";
import FileSaver from "file-saver";

import { ResumeDataTypes } from "../types/resume";

export const generateWordDocument = async (resumeData: ResumeDataTypes) => {
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 840,
              right: 1240,
              bottom: 1240,
              left: 1240,
            },
          },
        },
        children: [
          new Paragraph({
            text: resumeData.name,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.START,
            spacing: {
              after: 100,
            },
          }),
          new Paragraph({
            text: resumeData.title,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.START,
            spacing: {
              before: 100,
              after: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Socials:", size: 22, color: "949494" }),
              new TextRun({ text: "    ", size: 22 }),
              ...resumeData.social
                .map((social) => [
                  new ExternalHyperlink({
                    children: [
                      new TextRun({
                        text: social.platform + " | ",
                        size: 22,
                      }),
                    ],
                    link: social.url,
                  }),
                ])
                .flat(),
            ],
            alignment: AlignmentType.START,
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Contact:", size: 22, color: "949494" }),
              new TextRun({ text: "    ", size: 22 }),
              new TextRun({ text: `${resumeData.email} | ${resumeData.phone}`, size: 22 }),
            ],
            spacing: {
              before: 100,
              after: 100,
            },
            alignment: AlignmentType.START,
          }),
          new Paragraph({
            children: [
              new ImageRun({
                data: await fetch("/assets/images/location.png").then((res) => res.arrayBuffer()),
                transformation: {
                  width: 13,
                  height: 13,
                },
                type: "png",
              }),
              new TextRun({ text: `${" "}${resumeData.location}`, size: 22 }),
            ],
            alignment: AlignmentType.START,
          }),
          new Paragraph({
            spacing: {
              after: 800,
            },
          }),
          new Paragraph({
            children: [
              new ImageRun({
                data: await fetch("/assets/images/header.jpeg").then((res) => res.arrayBuffer()),
                transformation: {
                  width: 900,
                  height: 250,
                },
                type: "jpg",
                floating: {
                  horizontalPosition: {
                    offset: 11400,
                  },
                  verticalPosition: {
                    offset: 14400,
                  },
                  behindDocument: true,
                },
              }),
            ],
            spacing: { after: 0, before: 0, line: 0, lineRule: "auto" },
          }),
          new Paragraph({
            text: "Summary",
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph(resumeData.summary),
          new Paragraph({}),
          new Paragraph({
            text: "Experience",
            heading: HeadingLevel.HEADING_2,
          }),
          ...resumeData.experience.flatMap((job) => [
            new Paragraph({
              children: [
                new TextRun({ text: job.title, bold: true }),
                new TextRun(` at ${job.company}`),
              ],
            }),
            new Paragraph(`${job.location} | ${job.duration}`),
            ...job.responsibilities.map(
              (resp) => new Paragraph({ text: `• ${resp}`, indent: { left: 720 } }),
            ),
            new Paragraph({}),
          ]),
          new Paragraph({
            text: "Education",
            heading: HeadingLevel.HEADING_2,
          }),
          ...resumeData.education
            .map((edu) => [
              new Paragraph({
                children: [
                  new TextRun({ text: edu.degree, bold: true }),
                  new TextRun(` - ${edu.institution}`),
                ],
              }),
              new Paragraph(`${edu.location} | ${edu.year}`),
              new Paragraph({}),
            ])
            .flat(),
          new Paragraph({
            text: "Skills",
            heading: HeadingLevel.HEADING_2,
          }),
          ...resumeData.skills
            .map((category) => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${category.category}: `,
                    bold: true,
                  }),
                  new TextRun({ text: category.skills.join(", ") }),
                ],
              }),
            ])
            .flat(),
          new Paragraph({}),
          new Paragraph({
            text: "Projects",
            heading: HeadingLevel.HEADING_2,
          }),
          ...resumeData.projects.flatMap((proj) => [
            new Paragraph({ text: proj.name, heading: HeadingLevel.HEADING_3 }),
            new Paragraph(proj.description),
            new Paragraph({
              text: `Technologies: ${proj.technologies.join(", ")}`,
              indent: { left: 720 },
            }),
            new Paragraph({}),
          ]),
          new Paragraph({
            text: "Certifications",
            heading: HeadingLevel.HEADING_2,
          }),
          ...resumeData.certifications.map(
            (cert) => new Paragraph(`${cert.name} - ${cert.issuer} (${cert.year})`),
          ),
          new Paragraph({}),
          new Paragraph({
            text: "Languages",
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph(resumeData.languages.join(", ")),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    FileSaver.saveAs(blob, `${resumeData.name}_Resume.docx`);
  });
};

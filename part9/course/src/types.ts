export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartDesc {
  description: string;
}

export interface CoursePartOne extends CoursePartBase, CoursePartDesc {
  name: "Fundamentals";
}

export interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

export interface CoursePartThree extends CoursePartBase, CoursePartDesc {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

export interface CoursePartProgramming extends CoursePartBase, CoursePartDesc {
  name: "Programming";
  language: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartProgramming;

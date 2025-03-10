import type { Route } from "./+types/course-management";
import { CourseManagement } from "../CourseManagement/CourseManagement";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Management() {
  return <CourseManagement />;
}

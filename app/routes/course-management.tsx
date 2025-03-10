import type { Route } from "./+types/course-management";
import { CourseManagement } from "../CourseManagement/CourseManagement";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Страница Менеджмента Курсов" },
    { name: "description", content: "Создавай и управляй образовательными курсами" },
  ];
}

export default function Management() {
  return <CourseManagement />;
}

import type { Route } from "./+types/course-creation-form";
import CourseCreationForm from "../CourseCreationForm/CourseCreationForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function form() {
  return <CourseCreationForm />;
} 

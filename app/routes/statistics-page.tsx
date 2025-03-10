import type { Route } from "./+types/statistics-page";
import StatisticsPage from "../StatisticsPage/StatisticsPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function form() {
  return <StatisticsPage />;
} 

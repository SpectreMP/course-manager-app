import type { Route } from "./+types/statistics-page";
import StatisticsPage from "../StatisticsPage/StatisticsPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Статистика курсов" },
    { name: "description", content: "Просматривай статистику курсов" },
  ];
}

export default function form() {
  return <StatisticsPage />;
} 

import { 
    type RouteConfig,
    index,
    route,
    layout,
    prefix,
} from "@react-router/dev/routes";

export default [
    layout("./routes/layout.tsx", [
      index("routes/course-management.tsx"),
      route("statistics", "./routes/statistics-page.tsx"),
    ]),
] satisfies RouteConfig;

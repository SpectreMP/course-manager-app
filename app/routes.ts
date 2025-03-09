import { 
    type RouteConfig,
    index,
    route,
    layout,
    prefix,
} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("form", "./routes/course-creation-form.tsx"),
    route("list", "./routes/course-list.tsx"),
] satisfies RouteConfig;

import { type RouteConfig, index, route } from "@react-router/dev/routes";
import path from "path";

export default [
    index("routes/home.tsx"),
    route('/auth','routes/auth.tsx'),
    route('/upload','routes/Upload.tsx'),
    route('/resume/:id','routes/resume.tsx'),
    route('/wipe','routes/Wipe.tsx'),
    route('/user','routes/user.tsx'),
] satisfies RouteConfig;

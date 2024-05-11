import Exception401 from "@/pages/exception/401";
import Exception404 from "@/pages/exception/404";
import Exception500 from "@/pages/exception/500";
import Exception503 from "@/pages/exception/503";

export default [
  // Error routes
  {path: '401', Component: Exception401},
  {path: '404', Component: Exception404},
  {path: '500', Component: Exception500},
  {path: '503', Component: Exception503},

  // Fallback 404 route
  {path: '*', Component: Exception404},
];

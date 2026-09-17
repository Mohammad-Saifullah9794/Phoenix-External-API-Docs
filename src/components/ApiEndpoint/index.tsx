import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const METHOD_CLASS: Record<Method, string> = {
  GET: styles.get,
  POST: styles.post,
  PUT: styles.put,
  PATCH: styles.patch,
  DELETE: styles.delete,
};

/** Colored HTTP method pill, e.g. <ApiMethod method="GET" /> */
export function ApiMethod({ method }: { method: Method }): ReactNode {
  return (
    <span className={clsx(styles.methodBadge, METHOD_CLASS[method])}>
      {method}
    </span>
  );
}

/**
 * Endpoint title bar used at the top of an API reference page:
 * <ApiEndpoint method="POST" path="/auth/session" auth={false} />
 */
export function ApiEndpoint({
  method,
  path,
  auth = true,
}: {
  method: Method;
  path: string;
  auth?: boolean;
}): ReactNode {
  return (
    <div className={styles.endpointBar}>
      <ApiMethod method={method} />
      <code className={styles.path}>{path}</code>
      <span className={clsx(styles.authTag, auth ? styles.authRequired : styles.authNone)}>
        {auth ? "Auth required" : "No auth"}
      </span>
    </div>
  );
}

/** Small colored pill for a response status code, e.g. <StatusBadge code={200} /> */
export function StatusBadge({ code }: { code: number }): ReactNode {
  const cls = code < 300 ? styles.status2xx : code < 500 ? styles.status4xx : styles.status5xx;
  return <span className={clsx(styles.statusBadge, cls)}>{code}</span>;
}

export default ApiEndpoint;

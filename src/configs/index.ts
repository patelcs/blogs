export const PORT = Number(process.env.PORT ?? 3000);

export type TNodeEnv = "development" | "production";
export const NODE_ENV = (process.env.NODE_ENV ?? "development") as TNodeEnv;

export const CWD = process.cwd();
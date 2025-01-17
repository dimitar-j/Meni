import clsx, { type ClassValue } from "clsx";
import { twMerge as twMergeOriginal } from "tailwind-merge";

import { type APIProps, type CDNQueryProps } from "~/lib/types";

export const MeniGlobals = () => {
  const env = process.env.NODE_ENV;
  const globals = {
    apiRoot: "/",
    cdnRoot: "https://utfs.io/f/",
    webBase:
      env === "production" ? "https://meniapp.ca/" : "http://localhost:3000",
  };
  return globals;
};

export const APILoader = ({ apiName }: APIProps) => {
  return MeniGlobals().apiRoot + apiName;
};

export const CDNLoader = ({ src, width, quality }: CDNQueryProps) => {
  // return `https://cdn.meniapp.ca/${src}?w=${width}&q=${quality}` --- this width and quality need to be implmeneted eventually
  return MeniGlobals().cdnRoot + src;
};

export const ScrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset - 20;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

export function cn(...args: ClassValue[]) {
  return twMergeOriginal(clsx(args));
}

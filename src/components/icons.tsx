import type { SVGProps } from "react";

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 12C2 7.6 7.6 2 12 2" />
      <path d="M12 22c4.4 0 10-5.6 10-10" />
      <path d="M12 2a10 10 0 0 0-9.2 6" />
      <path d="M14 12a2 2 0 1 0-4 0c0 1.1.9 2.2 2 2.8.9.5 2 1 2 1.7" />
      <path d="M12 18.5A2.5 2.5 0 0 1 9.5 16" />
    </svg>
  ),
};

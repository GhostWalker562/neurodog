import React from "react";

interface Shape4Props {
  className?: string;
}

function Shape4({ className = "w-8 h-8" }: Shape4Props): JSX.Element {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {" "}
      <g clipPath="url(#clip0_119_333)">
        {" "}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M82.0191 130.784C28.1506 223.072 171.923 223.072 117.981 130.784C200.122 223.072 223.074 200.161 130.779 117.986C223.074 171.856 223.074 28.0777 130.779 82.0224C223.074 -0.153397 200.153 -23.0746 117.981 69.2237C171.849 -23.0746 28.0766 -23.0746 82.0191 69.2237C-0.153358 -23.0746 -23.0737 -0.153397 69.221 82.0224C-23.0737 28.1517 -23.0737 171.93 69.221 117.986C-23.0737 200.161 -0.153358 223.072 82.0191 130.784ZM100 125C113.807 125 125 113.807 125 100C125 86.1929 113.807 75 100 75C86.1929 75 75 86.1929 75 100C75 113.807 86.1929 125 100 125Z"
          fill="url(#paint0_linear_119_333)"
        />{" "}
      </g>{" "}
      <defs>
        {" "}
        <linearGradient
          id="paint0_linear_119_333"
          x1="100"
          y1="0"
          x2="100"
          y2="200"
          gradientUnits="userSpaceOnUse"
        >
          {" "}
          <stop stopColor="#A7B5FF" /> <stop offset="1" stopColor="#F3ACFF" />{" "}
        </linearGradient>{" "}
        <clipPath id="clip0_119_333">
          {" "}
          <rect width="200" height="200" fill="white" />{" "}
        </clipPath>{" "}
      </defs>{" "}
    </svg>
  );
}

export default Shape4;

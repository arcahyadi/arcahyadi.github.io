import React from "react";

export function OpenCodeLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center ${className}`}>
      {/* Light Logo */}
      <svg
        className="block dark:hidden"
        width="189"
        height="34"
        viewBox="0 0 234 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="OpenCode"
      >
        <path d="M18 30H6V18H18V30Z" fill="#CFCECD" />
        <path d="M18 12H6V30H18V12ZM24 36H0V6H24V36Z" fill="#656363" />
        <path d="M48 30H36V18H48V30Z" fill="#CFCECD" />
        <path d="M36 30H48V12H36V30ZM54 36H36V42H30V6H54V36Z" fill="#656363" />
        <path d="M84 24V30H66V24H84Z" fill="#CFCECD" />
        <path d="M84 24H66V30H84V36H60V6H84V24ZM66 18H78V12H66V18Z" fill="#656363" />
        <path d="M108 36H96V18H108V36Z" fill="#CFCECD" />
        <path d="M108 12H96V36H90V6H108V12ZM114 36H108V12H114V36Z" fill="#656363" />
        <path d="M144 30H126V18H144V30Z" fill="#CFCECD" />
        <path d="M144 12H126V30H144V36H120V6H144V12Z" fill="#211E1E" />
        <path d="M168 30H156V18H168V30Z" fill="#CFCECD" />
        <path d="M168 12H156V30H168V12ZM174 36H150V6H174V36Z" fill="#211E1E" />
        <path d="M198 30H186V18H198V30Z" fill="#CFCECD" />
        <path d="M198 12H186V30H198V12ZM204 36H180V6H198V0H204V36Z" fill="#211E1E" />
        <path d="M234 24V30H216V24H234Z" fill="#CFCECD" />
        <path d="M216 12V18H228V12H216ZM234 24H216V30H234V36H210V6H234V24Z" fill="#211E1E" />
      </svg>
      {/* Dark Logo */}
      <svg
        className="hidden dark:block"
        width="189"
        height="34"
        viewBox="0 0 234 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="OpenCode"
      >
        <path d="M18 30H6V18H18V30Z" fill="#4B4646" />
        <path d="M18 12H6V30H18V12ZM24 36H0V6H24V36Z" fill="#B7B1B1" />
        <path d="M48 30H36V18H48V30Z" fill="#4B4646" />
        <path d="M36 30H48V12H36V30ZM54 36H36V42H30V6H54V36Z" fill="#B7B1B1" />
        <path d="M84 24V30H66V24H84Z" fill="#4B4646" />
        <path d="M84 24H66V30H84V36H60V6H84V24ZM66 18H78V12H66V18Z" fill="#B7B1B1" />
        <path d="M108 36H96V18H108V36Z" fill="#4B4646" />
        <path d="M108 12H96V36H90V6H108V12ZM114 36H108V12H114V36Z" fill="#B7B1B1" />
        <path d="M144 30H126V18H144V30Z" fill="#4B4646" />
        <path d="M144 12H126V30H144V36H120V6H144V12Z" fill="#F1ECEC" />
        <path d="M168 30H156V18H168V30Z" fill="#4B4646" />
        <path d="M168 12H156V30H168V12ZM174 36H150V6H174V36Z" fill="#F1ECEC" />
        <path d="M198 30H186V18H198V30Z" fill="#4B4646" />
        <path d="M198 12H186V30H198V12ZM204 36H180V6H198V0H204V36Z" fill="#F1ECEC" />
        <path d="M234 24V30H216V24H234Z" fill="#4B4646" />
        <path d="M216 12V18H228V12H216ZM234 24H216V30H234V36H210V6H234V24Z" fill="#F1ECEC" />
      </svg>
    </div>
  );
}

export function DownloadIcon({ className = "w-[18px] h-[18px]" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M12.1875 9.75L9.00001 12.9375L5.8125 9.75M9.00001 2.0625L9 12.375M14.4375 15.9375H3.5625"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function CopyIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.75 8.75V2.75H21.25V15.25H15.25M15.25 8.75H2.75V21.25H15.25V8.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function CheckIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.75 15.0938L9 20.25L21.25 3.75"
        stroke="#03B000"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function ArrowRightIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.5 12L17 12M13 16.5L17.5 12L13 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function PlusIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.5 11.5H19V12.5H12.5V19H11.5V12.5H5V11.5H11.5V5H12.5V11.5Z" fill="currentColor" />
    </svg>
  );
}

export function MinusIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 11.5H19V12.5H5Z" fill="currentColor" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "w-2 h-1.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="8"
      height="6"
      viewBox="0 0 8 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M4.00024 5.04041L7.37401 1.66663L6.66691 0.959525L4.00024 3.62619L1.33357 0.959525L0.626465 1.66663L4.00024 5.04041Z"
      />
    </svg>
  );
}

export function HamburgerIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 17H5V16H19V17Z" fill="currentColor" />
      <path d="M19 8H5V7H19V8Z" fill="currentColor" />
    </svg>
  );
}

export function CloseIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.7071 11.9993L18.0104 17.3026L17.3033 18.0097L12 12.7064L6.6967 18.0097L5.98959 17.3026L11.2929 11.9993L5.98959 6.69595L6.6967 5.98885L12 11.2922L17.3033 5.98885L18.0104 6.69595L12.7071 11.9993Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function FigStarsIllustration() {
  return (
    <svg width="205" height="264" viewBox="0 0 205 264" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.5" clipPath="url(#clip0_236_15902)">
        <mask id="mask0_236_15902" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="205" height="264">
          <path d="M27.2119 253.122L0 264H205V0L192.109 17.8482L175.297 43.8089L152.877 59.95L137.902 77.6701L126.989 87.3251L118.603 106.449L103.114 123.643L93.359 141.714L84.2883 160.311L78.7262 177.329L67.773 193.997L62.8098 212.068L57.3332 231.191L42.5292 243.824L27.2119 253.122Z" fill="url(#paint0_linear_236_15902)" />
        </mask>
        <g mask="url(#mask0_236_15902)">
          {Array.from({ length: 80 }).map((_, i) => {
            const y1 = -135.014 + i * 3.18;
            const x2 = -251.766 + i * 3.18;
            return (
              <path
                key={i}
                d={`M${(150.932 + i * 3.18).toFixed(3)} ${y1.toFixed(3)}L${x2.toFixed(3)} ${(267.684 + i * 3.18).toFixed(3)}`}
                stroke="#8E8B8B"
              />
            );
          })}
        </g>
        <path d="M0 264L27.2119 253.122L42.5292 243.824L57.3332 231.191L62.8098 212.068L67.773 193.997L78.7262 177.329L84.2883 160.311L93.359 141.714L103.114 123.643L118.603 106.449L126.989 87.3251L137.902 77.6701L152.877 59.95L175.297 43.8089L192.109 17.8482L205 0" stroke="#BCBBBB" />
      </g>
      <defs>
        <linearGradient id="paint0_linear_236_15902" x1="102.5" y1="-34.8571" x2="102.5" y2="264" gradientUnits="userSpaceOnUse">
          <stop stopColor="#565656" />
          <stop offset="1" stopColor="#F1F0F0" stopOpacity="0" />
        </linearGradient>
        <clipPath id="clip0_236_15902">
          <rect width="205" height="264" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function FigContributorsIllustration() {
  return (
    <svg width="205" height="264" viewBox="0 0 205 264" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.5" clipPath="url(#clip0_236_15557)">
        <g clipPath="url(#clip1_236_15557)">
          {/* Matrix of small contributor squares */}
          {Array.from({ length: 19 }).map((_, row) =>
            Array.from({ length: 15 }).map((_, col) => {
              const opacities = [0.81, 0.46, 0.86, 0.08, 0.23, 0.9, 0.59, 0.8, 0.21, 0.22, 0.62, 0.41, 0.22, 0.25, 0.34];
              const fills = ["#CFCECD", "#8E8B8B", "#BCBBBB", "#DAD9D9"];
              const opacity = opacities[(row * 7 + col * 3) % opacities.length];
              const fill = fills[(row * 5 + col * 2) % fills.length];
              return (
                <rect
                  key={`${row}-${col}`}
                  opacity={opacity}
                  x={col * 14}
                  y={row * 14}
                  width="6"
                  height="6"
                  fill={fill}
                />
              );
            })
          )}
        </g>
      </g>
      <defs>
        <clipPath id="clip0_236_15557">
          <rect width="205" height="264" fill="white" />
        </clipPath>
        <clipPath id="clip1_236_15557">
          <rect width="236" height="264" fill="white" transform="translate(-0.164062)" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function FigDevsIllustration() {
  const barPositions = [
    { x: 203.985, h: 264, y: 0 },
    { x: 196.881, h: 230, y: 34 },
    { x: 188.762, h: 238, y: 26 },
    { x: 182.673, h: 212, y: 52 },
    { x: 175.569, h: 264, y: 0 },
    { x: 168.465, h: 235, y: 29 },
    { x: 161.361, h: 220, y: 44 },
    { x: 154.257, h: 199, y: 65 },
    { x: 148.168, h: 235, y: 29 },
    { x: 141.064, h: 228, y: 36 },
    { x: 133.96, h: 216, y: 48 },
    { x: 126.856, h: 257, y: 7 },
    { x: 119.752, h: 264, y: 0 },
    { x: 112.649, h: 250, y: 14 },
    { x: 105.545, h: 237, y: 27 },
    { x: 98.4406, h: 194, y: 70 },
    { x: 91.3366, h: 232, y: 32 },
    { x: 84.2327, h: 229, y: 35 },
    { x: 77.1287, h: 228, y: 36 },
    { x: 70.0248, h: 254, y: 10 },
    { x: 62.9208, h: 222, y: 42 },
    { x: 55.8168, h: 221, y: 43 },
    { x: 48.7129, h: 226, y: 38 },
    { x: 41.6089, h: 208, y: 56 },
    { x: 35.5198, h: 228, y: 36 },
    { x: 28.4158, h: 256, y: 8 },
    { x: 21.3119, h: 244, y: 20 },
    { x: 14.2079, h: 263, y: 1 },
    { x: 7.10396, h: 255, y: 9 },
    { x: 0, h: 233, y: 31 },
  ];

  return (
    <svg width="205" height="264" viewBox="0 0 205 264" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.5">
        {barPositions.map((bar, i) => (
          <path
            key={i}
            d={`M${(bar.x + 1.015).toFixed(3)} ${bar.y}H${bar.x.toFixed(3)}V264H${(bar.x + 1.015).toFixed(3)}V${bar.y}Z`}
            fill="#8E8B8B"
          />
        ))}
      </g>
    </svg>
  );
}

export function OpenAILogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.43799 9.06943V7.09387C9.43799 6.92749 9.50347 6.80267 9.65601 6.71959L13.8206 4.43211C14.3875 4.1202 15.0635 3.9747 15.7611 3.9747C18.3775 3.9747 20.0347 5.9087 20.0347 7.96734C20.0347 8.11288 20.0347 8.27926 20.0128 8.44564L15.6956 6.03335C15.434 5.88785 15.1723 5.88785 14.9107 6.03335L9.43799 9.06943ZM19.1624 16.7637V12.0431C19.1624 11.7519 19.0315 11.544 18.7699 11.3984L13.2972 8.36234L15.0851 7.3849C15.2377 7.30182 15.3686 7.30182 15.5212 7.3849L19.6858 9.67238C20.8851 10.3379 21.6917 11.7519 21.6917 13.1243C21.6917 14.7047 20.7106 16.1604 19.1624 16.7636V16.7637ZM8.15158 12.6047L6.36369 11.6066C6.21114 11.5235 6.14566 11.3986 6.14566 11.2323V6.65735C6.14566 4.43233 7.93355 2.7478 10.3538 2.7478C11.2697 2.7478 12.1199 3.039 12.8396 3.55886L8.54424 5.92959C8.2826 6.07509 8.15158 6.28303 8.15158 6.55338V12.6047Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function AnthropicLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.7891 3.93164L20.2223 20.0677H23.7502L17.317 3.93164H13.7891Z" fill="currentColor" />
      <path d="M6.32538 13.6824L8.52662 8.01177L10.7279 13.6824H6.32538ZM6.68225 3.93164L0.25 20.0677H3.84652L5.16202 16.6791H11.8914L13.2067 20.0677H16.8033L10.371 3.93164H6.68225Z" fill="currentColor" />
    </svg>
  );
}

export function GoogleGeminiLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M49.04,24.001l-1.082-0.043h-0.001C36.134,23.492,26.508,13.866,26.042,2.043L25.999,0.96C25.978,0.424,25.537,0,25,0s-0.978,0.424-0.999,0.96l-0.043,1.083C23.492,13.866,13.866,23.492,2.042,23.958L0.96,24.001C0.424,24.022,0,24.463,0,25c0,0.537,0.424,0.978,0.961,0.999l1.082,0.042c11.823,0.467,21.449,10.093,21.915,21.916l0.043,1.083C24.022,49.576,24.463,50,25,50s0.978-0.424,0.999-0.96l0.043-1.083c0.466-11.823,10.092-21.449,21.915-21.916l1.082-0.042C49.576,25.978,50,25.537,50,25C50,24.463,49.576,24.022,49.04,24.001z" />
    </svg>
  );
}

export function DeepSeekLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.16861 16.0529L17.2018 9.85156C17.5957 9.54755 18.1586 9.66612 18.3463 10.1384C19.3339 12.6288 18.8926 15.6217 16.9276 17.6766C14.9626 19.7314 12.2285 20.1821 9.72948 19.1557L6.9995 20.4775C10.9151 23.2763 15.6699 22.5841 18.6411 19.4749C20.9979 17.0103 21.7278 13.6508 21.0453 10.6214L21.0515 10.6278C20.0617 6.17736 21.2948 4.39847 23.8207 0.760904C23.8804 0.674655 23.9402 0.588405 24 0.5L20.6762 3.97585V3.96506L9.16658 16.0551"
        fill="currentColor"
      />
      <path
        d="M7.37742 16.7017C4.67579 14.0395 5.14158 9.91963 7.44676 7.54383C9.15135 5.78544 11.9442 5.06779 14.3821 6.12281L17.0005 4.87559C16.5288 4.52392 15.9242 4.14566 15.2305 3.87986C12.0948 2.54882 8.34069 3.21127 5.79171 5.8386C3.33985 8.36779 2.56881 12.2567 3.89286 15.5751C4.88192 18.0552 3.26056 19.8094 1.62731 21.5801C1.04853 22.2078 0.467774 22.8355 0 23.5L7.3754 16.7037"
        fill="currentColor"
      />
    </svg>
  );
}

export function MetaLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.6241 11.346L20.3848 3.44816C20.5309 3.29931 20.4487 3 20.2601 3H16.0842C16.0388 3 15.9949 3.01897 15.9594 3.05541L7.59764 11.5629C7.46721 11.6944 7.27446 11.5771 7.27446 11.3666V3.25183C7.27446 3.11242 7.18515 3 7.07594 3H4.19843C4.08932 3 4 3.11242 4 3.25183V20.7482C4 20.8876 4.08932 21 4.19843 21H7.07594C7.18515 21 7.27446 20.8876 7.27446 20.7482V17.1834C7.27446 17.1073 7.30136 17.0344 7.34815 16.987L9.94075 14.3486C10.0031 14.2853 10.0895 14.2757 10.159 14.3232L17.0934 19.5573C18.2289 20.3412 19.4975 20.8226 20.786 20.9652C20.9008 20.9778 21 20.8606 21 20.7133V17.3559C21 17.2276 20.9249 17.1232 20.8243 17.1073C20.0659 16.9853 19.326 16.6845 18.6569 16.222L12.6538 11.764C12.5291 11.6785 12.5135 11.4584 12.6241 11.346Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function XAILogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.0962 3L10.0998 5.6577H1.59858L3.59417 3H12.0972H12.0962ZM22.3162 18.3432L20.3215 21H11.8497L13.8425 18.3432H22.3162ZM23 3L9.492 21H1L14.508 3H23Z" fill="currentColor" />
    </svg>
  );
}

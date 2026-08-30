// Small, consistent stroke-icon set used across the site instead of emoji.
// Keeping every icon the same visual style (1.8px stroke, rounded caps) is
// what makes a site read as "designed" rather than "prototype".

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const IconSearch = (props) => (
  <svg {...base} {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

export const IconCart = (props) => (
  <svg {...base} {...props}>
    <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.994-4.693 2.602-7.152.078-.312-.16-.598-.482-.598H5.106M7.5 14.25L5.106 5.272M6.75 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm11.25 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

export const IconHome = (props) => (
  <svg {...base} {...props}>
    <path d="M3 11.5L12 4l9 7.5" />
    <path d="M5.5 9.5V20h13V9.5" />
  </svg>
);

export const IconPackage = (props) => (
  <svg {...base} {...props}>
    <path d="M21 8l-9-5-9 5 9 5 9-5z" />
    <path d="M3 8v8l9 5 9-5V8" />
    <path d="M12 13v8" />
  </svg>
);

export const IconTag = (props) => (
  <svg {...base} {...props}>
    <path d="M20.25 7.5l-9-4.5-8.25 4.5v9l8.25 4.5 9-4.5v-9z" />
    <circle cx="9" cy="9" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

export const IconUser = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M4.5 20c1.5-4 5-5.5 7.5-5.5s6 1.5 7.5 5.5" />
  </svg>
);

export const IconLogout = (props) => (
  <svg {...base} {...props}>
    <path d="M9 4.5H6.75A2.25 2.25 0 004.5 6.75v10.5A2.25 2.25 0 006.75 19.5H9" />
    <path d="M15 15.75L19.5 12 15 8.25" />
    <path d="M19.5 12h-11" />
  </svg>
);

export const IconClose = (props) => (
  <svg {...base} {...props}>
    <path d="M6 6l12 12M6 18L18 6" />
  </svg>
);

export const IconMail = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 6.5L12 13l8.5-6.5" />
  </svg>
);

export const IconPin = (props) => (
  <svg {...base} {...props}>
    <path d="M12 21s7-6.5 7-11.5A7 7 0 105 9.5C5 14.5 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.2" />
  </svg>
);

export const IconHeadset = (props) => (
  <svg {...base} {...props}>
    <path d="M4 13v-1a8 8 0 0116 0v1" />
    <rect x="2.5" y="13" width="4" height="6" rx="1.5" />
    <rect x="17.5" y="13" width="4" height="6" rx="1.5" />
    <path d="M19.5 19v.5a3 3 0 01-3 3H12" />
  </svg>
);

export const IconSchool = (props) => (
  <svg {...base} {...props}>
    <path d="M2 8l10-5 10 5-10 5-10-5z" />
    <path d="M6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5" />
    <path d="M22 8v6" />
  </svg>
);

export const IconRuler = (props) => (
  <svg {...base} {...props}>
    <path d="M3 16.5L16.5 3l4.5 4.5L7.5 21 3 16.5z" />
    <path d="M14 5.5l1.5 1.5M11 8.5L12.5 10M8 11.5L9.5 13" />
  </svg>
);

export const IconBolt = (props) => (
  <svg {...base} {...props}>
    <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
  </svg>
);

export const IconEmpty = (props) => (
  <svg {...base} {...props}>
    <circle cx="10" cy="10" r="6.5" />
    <path d="M20 20l-5.5-5.5" />
  </svg>
);

// Category icons - one per product category
export const IconShirt = (props) => (
  <svg {...base} {...props}>
    <path d="M8 4L4 7l2 3 2-1.5V20h8V8.5L18 10l2-3-4-3-2 2h-4L8 4z" />
  </svg>
);

export const IconTrousers = (props) => (
  <svg {...base} {...props}>
    <path d="M6 3h12l1 6-2 12h-3l-2-9-2 9H7L5 9l1-6z" />
  </svg>
);

export const IconDress = (props) => (
  <svg {...base} {...props}>
    <path d="M9 3h6l1 4-2 1 3 13H7l3-13-2-1 1-4z" />
  </svg>
);

export const IconTie = (props) => (
  <svg {...base} {...props}>
    <path d="M9 3h6l-1 4 2 2-3 11-3-11 2-2-1-4z" />
  </svg>
);

export const IconJacket = (props) => (
  <svg {...base} {...props}>
    <path d="M9 3L5 6l1.5 3L8 8v11h8V8l1.5 1L19 6l-4-3-2.5 2h-1L9 3z" />
  </svg>
);

export const IconShoe = (props) => (
  <svg {...base} {...props}>
    <path d="M3 16.5c0-1.5 1.5-2.5 3-3l4-1.5 3-3 2.5 1L20 12c1 .5 1 2 1 3.5v1H3v-1z" />
  </svg>
);

export const IconRun = (props) => (
  <svg {...base} {...props}>
    <circle cx="15" cy="4.5" r="1.6" />
    <path d="M6 21l3-5 3 1 2-4-3-2 1-3 3 2 2 5-2 1 2 5" />
  </svg>
);

export const IconBag = (props) => (
  <svg {...base} {...props}>
    <path d="M6 8h12l1 12H5L6 8z" />
    <path d="M9 8V6a3 3 0 016 0v2" />
  </svg>
);
const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const app = express();

const searchData = [
  { title: "Location", subtitle: "California" },
  { title: "Properties", subtitle: "Delux" },
  { title: "Price", subtitle: "$10,000-$12,0000" },
  { title: "Search", type: "button" },
];
const aboutCards = [
  {
    title: "Free Consulatation",
    text: "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.",
    icon: "/ab1.svg",
  },
  {
    title: "Best Team Members",
    text: "Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.",
    icon: "/ab2.svg",
  },
];
const typeCards = [
  {
    title: "Family House",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor pulvinar at augue vestibulum euismod risus ",
    icon: "t1.svg",
  },
  {
    title: "Apartment",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor pulvinar at augue vestibulum euismod risus ",
    icon: "t2.svg",
  },
  {
    title: "Studio & Offices",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor pulvinar at augue vestibulum euismod risus ",
    icon: "t3.svg",
  },
  {
    title: "Villa & Condo",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor pulvinar at augue vestibulum euismod risus ",
    icon: "t4.svg",
  },
];

const cities = [
  {
    name: "Bangladesh",
    info: "50 Properties",
    img: "/c1.png",
  },
  {
    name: "Japan",
    info: "50 Properties",
    img: "/c2.png",
  },
  {
    name: "Malaysia",
    info: "50 Properties",
    img: "/c3.png",
  },
  {
    name: "London",
    info: "50 Properties",
    img: "/c4.png",
  },
  {
    name: "India",
    info: "50 Properties",
    img: "/c5.png",
  },
];
const testimonals = [
  {
    name: "Williamsons",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui posuere nulla id feugiat morbi dictum. Nec enim mauris velit integer. Vitae varius interdum enim eget elementum. Eu velit tortor proin risus amet habitant.",
    img: "/p1.png",
    star: "/s1.svg",
  },
  {
    name: "Farhad Reja",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui posuere nulla id feugiat morbi dictum. Nec enim mauris velit integer. Vitae varius interdum enim eget elementum. Eu velit tortor proin risus amet habitant.",
    img: "/p2.png",
    star: "/s2.svg",
  },
  {
    name: "Peter sams",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui posuere nulla id feugiat morbi dictum. Nec enim mauris velit integer. Vitae varius interdum enim eget elementum. Eu velit tortor proin risus amet habitant.",
    img: "/p3.png",
    star: "/s3.svg",
  },
];

const footer = [
  {
    title: "Home",
    links: [
      "Process",
      "Listing",
      "Popular Property",
      "Out Agents",
      "Testimonial",
    ],
  },
  {
    title: "Servies",
    links: [
      "Site map",
      "Property type",
      "Terms and conditions",
      "Privacy policy",
    ],
  },
  {
    title: "About",
    links: ["About us", "Who choose us?", "Events", "Blog"],
  },
  {
    title: "Contact",
    links: [
      ["/ph.svg", "+888 561 258"],
      ["/gl.png", "webmaile@gmail.com"],
      ["/pm.svg", "Google play"],
    ],
    iconsHl: true,
  },
];
const socialIcons = ["/sf.svg", "/st.svg", "/si.svg", "/sin.svg"];
app.use(express.static(path.join(__dirname, "public", "styles")));
app.use(express.static(path.join(__dirname, "assets")));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index", {
    layout: false,
    searchData,
    aboutCards,
    typeCards,
    cities,
    testimonals,
    footer,
    socialIcons,
  });
});

app.listen(3000, () => {
  console.log("Serving on http://localhost:3000");
});

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/rooms", (req, res) => {
  const rooms = [
    {
      image: {
        src:
          "https://a0.muscache.com/im/pictures/10833886/1edf8559_original.jpg?aki_policy=large",
        alt: "Entire apartment - HVAR image"
      },
      info: "Entire apartment - HVAR",
      title: "The best position in Hvar!",
      price: 88,
      rating: "4.77",
      bookCount: 366
    },
    {
      image: {
        src:
          "https://a0.muscache.com/im/pictures/19327619/cbb26fd1_original.jpg?aki_policy=large",
        alt: "Entire apartment - Minsk image"
      },
      info: "Entire apartment - Minsk",
      title: "Minsk Belarus Studio in historical center",
      price: 60,
      rating: "4.79",
      bookCount: 344
    },
    {
      image: {
        src:
          "https://a0.muscache.com/im/pictures/10026520/717f5adc_original.jpg?aki_policy=large",
        alt: "Private room - Ermelo image"
      },
      info: "Private room - Ermelo",
      title: "Charming gardenroom with woodstove",
      price: 78,
      rating: "4.80",
      bookCount: 62
    },
    {
      image: {
        src:
          "https://a0.muscache.com/4ea/air/v2/pictures/746ce656-ed8d-4966-8fcb-e8c1ce4f39d7.jpg?t=r:w1200-h720-sfit,e:fjpg-c90",
        alt: "Verified - Menaggio image"
      },
      info: "Verified - Menaggio",
      title: "Romantic, Lakeside Home with Views of Lake Como",
      price: 211,
      rating: "4.85",
      bookCount: 233
    },
    {
      image: {
        src:
          "https://a0.muscache.com/im/pictures/cd17b75f-9aee-4f68-b80d-dde84996fb4b.jpg?aki_policy=large",
        alt: "Entire house - Isla Mujeres image"
      },
      info: "Entire house - Isla Mujeres",
      title: "The World Famous Seashell House ~ Casa Caracol",
      price: 395,
      rating: "4.76",
      bookCount: 247
    },
    {
      image: {
        src:
          "https://a0.muscache.com/im/pictures/15273358/d7329e9a_original.jpg?aki_policy=large",
        alt: "Entire house - Ostuni image"
      },
      info: "Entire house - Ostuni",
      title: "I SETTE CONI - TRULLO EDERA ",
      price: 102,
      rating: "4.93",
      bookCount: 193
    }
  ];

  res.render("rooms", { rooms });
});

module.exports = router;

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import beach from './assets/beach.jpg'
import windmill from './assets/windmill.jpg'
import iconiccity from './assets/iconiccity.jpg'
import country from './assets/country.jpg'
import lakes from './assets/lakes.jpg'
import island from './assets/island.jpg'
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import {
  FaSkiing,
  FaPumpSoap,
  FaShower,
  FaFireExtinguisher,
  FaUmbrellaBeach,
  FaKey,
} from "react-icons/fa";
import { FaHouseUser, FaPeopleRoof, FaKitchenSet } from "react-icons/fa6";
import {
  BiSolidWasher,
  BiSolidDryer,
  BiSolidFirstAid,
  BiWifi,
  BiSolidFridge,
  BiWorld,
} from "react-icons/bi";
import { BsSnow, BsFillDoorOpenFill, BsPersonWorkspace } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla, MdMicrowave, MdBalcony, MdYard, MdPets } from "react-icons/md";
import {
  PiBathtubFill,
  PiCoatHangerFill,
  PiTelevisionFill,
} from "react-icons/pi";
import { TbIroning3 } from "react-icons/tb";
import {
  GiHeatHaze,
  GiCctvCamera,
  GiBarbecue,
  GiToaster,
  GiCampfire,
} from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";
import React from "react";

export const categories = [
  {
    label: "All",
    icon: <BiWorld/>
  },
  {
    img: beach,
    label: "Navrangpura",
    icon: <TbBeach />,
    description: "This property is close to the beach!",
  },
  {
    img: windmill,
    label: "Naranpura",
    icon: <GiWindmill />,
    description: "This property is has windmills!",
  },
  {
    img: iconiccity,
    label: "Paldi",
    icon: <MdOutlineVilla />,
    description: "This property is modern!",
  },
  {
    img: country,
    label: "Bodakdev",
    icon: <TbMountain />,
    description: "This property is in the countryside!",
  },
  {
    img: lakes,
    label: "Thaltej",
    icon: <TbPool />,
    description: "This is property has a beautiful pool!",
  },
  {
    img: island,
    label: "Maninagar",
    icon: <GiIsland />,
    description: "This property is on an island!",
  },
  {
    img: lakes,
    label: "Narol",
    icon: <GiBoatFishing />,
    description: "This property is near a lake!",
  },
  {
    img: "assets/skiing_cat.jpg",
    label: "Ranip",
    icon: <FaSkiing />,
    description: "This property has skiing activies!",
  },
  {
    img: "assets/castle_cat.webp",
    label: "Gota",
    icon: <GiCastle />,
    description: "This property is an ancient castle!",
  },
  {
    img: "assets/cave_cat.jpg",
    label: "S.G.Highway",
    icon: <GiCaveEntrance />,
    description: "This property is in a spooky cave!",
  },
  {
    img: "assets/camping_cat.jpg",
    label: "Naroda",
    icon: <GiForestCamp />,
    description: "This property offers camping activities!",
  },
  {
    img: "assets/arctic_cat.webp",
    label: "Ratanpur",
    icon: <BsSnow />,
    description: "This property is in arctic environment!",
  },
  {
    img: "assets/desert_cat.webp",
    label: "Vastrapur",
    icon: <GiCactus />,
    description: "This property is in the desert!",
  },
  {
    img: "assets/barn_cat.jpg",
    label: "Prahladnagar",
    icon: <GiBarn />,
    description: "This property is in a barn!",
  },
  {
    img: "assets/lux_cat.jpg",
    label: "Jodhpur Gam",
    icon: <IoDiamond />,
    description: "This property is brand new and luxurious!",
  },
];

export const types = [
  {
    name: "Personal Rooms",
    description:
    "Guests have their own room in a house, plus access to shared places",
    icon: <BsFillDoorOpenFill />,
  },
  {
    name: "2 Sharing Room",
    description: "A comfortable two-person room with seprate beds and storage area",
    icon: <FaHouseUser />,
  },
  {
    name: "3 Sharing Room",
    description:
    "Affordable three person room with seprate beds and storage area",
    icon: <FaPeopleRoof />,
  },
];

export const facilities = [
  {
    name: "Washing Machine",
    icon: <BiSolidWasher />,
  },

  {
    name: "Iron",
    icon: <TbIroning3 />,
  },
  {
    name: "TV",
    icon: <PiTelevisionFill />,
  },

  {
    name: "Air Conditioning",
    icon: <BsSnow />,
  },
  {
    name: "Water Geyser",
    icon: <GiHeatHaze />,
  },
  {
    name: "Security cameras",
    icon: <GiCctvCamera />,
  },
  {
    name: "Fire extinguisher",
    icon: <FaFireExtinguisher />,
  },
  {
    name: "First Aid",
    icon: <BiSolidFirstAid />,
  },
  {
    name: "Wifi",
    icon: <BiWifi />,
  },

  {
    name: "Refrigerator",
    icon: <BiSolidFridge />,
  },

  {
    name: "Free parking",
    icon: <AiFillCar />,
  },

];
import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  MoviesSearchResults,
  TvsSearchResults,
} from "../Components/SearchResults";

const Wrapper = styled.div`
  margin: 150px 60px 0px 90px;
`;

const Btns = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 120px;
`;

const CatButton = styled(motion.div)`
  color: rgb(255, 255, 255);
  cursor: pointer;
  margin: 0px 60px 0px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Keyword = styled.h1`
  margin: 50px 0px;
  font-size: 36px;
  font-weight: 600;
`;

const btnVariants = {
  start: {
    width: "60px",
    height: "60px",
  },
  end: ({ category }: { category: boolean }) => ({
    width: category ? "120px" : "60px",
    height: category ? "120px" : "60px",
    transition: {
      duration: 0.4,
      type: "tween",
    },
    opacity: category ? 1 : 0.3,
  }),
  hover: {
    fillOpacity: [1, 0, 1],
    transition: {
      repeat: Infinity,
      duration: 1.5,
    },
  },
};

const btnTextVariants = {
  start: {
    fontSize: "8px",
  },
  end: ({ category }: { category: boolean }) => ({
    fontSize: category ? "16px" : "8px",
    fontWeight: category ? 600 : 300,
    transition: {
      duration: 0.4,
      type: "tween",
    },
    opacity: category ? 1 : 0.3,
  }),
};

function Search() {
  const location = useLocation();
  const srcParams = new URLSearchParams(location.search);
  const keyword = srcParams.get("keyword");
  const [cat, setCat] = useState(srcParams.get("category") === "movies");
  const navigate = useNavigate();

  return (
    <>
      <Wrapper>
        <Btns>
          <CatButton
            onClick={() => {
              setCat(true);
              srcParams.set("category", "movies");
              navigate(`/search/?${srcParams.toString()}`);
            }}
          >
            <motion.svg
              variants={btnVariants}
              initial="start"
              animate="end"
              whileHover="hover"
              style={{ x: 10 }}
              custom={{ category: cat }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
            >
              <path d="M377.083,190.125l-52.299,23.984v-47.774c0-6.012-4.849-10.925-10.925-10.925h-14.739    c8.727-14.352,13.899-31.224,13.899-49.196c0-52.622-42.796-95.418-95.418-95.418c-44.154,0-81.261,30.125-92.121,70.917    c-13.188-14.675-32.194-23.984-53.463-23.984C32.323,57.665,0,89.923,0,129.681c0,9.632,2.004,18.877,5.495,27.281    C2.263,158.836,0,162.263,0,166.4v204.477c0,6.012,4.849,10.925,10.925,10.925h302.998c6.012,0,10.925-4.849,10.925-10.925    v-47.774l52.299,23.984c3.62,1.875,15.451,0.84,15.451-9.956v-137.05C391.111,187.539,380.509,188.574,377.083,190.125z     M217.6,32.517c40.598,0,73.632,32.97,73.632,73.632c0,40.663-32.97,73.632-73.632,73.632c-40.663,0-73.632-32.97-73.632-73.632    C143.968,65.487,176.937,32.517,217.6,32.517z M71.952,79.45c27.669,0,50.166,22.497,50.166,50.166s-22.497,50.166-50.166,50.166    c-27.669,0-50.166-22.497-50.166-50.166C21.786,102.012,44.283,79.45,71.952,79.45z M302.998,359.887H21.786V181.204    c13.382,13.059,31.16,20.428,50.166,20.428c20.881,0,40.275-8.792,53.915-24.436h27.992    c17.519,15.774,39.952,24.436,63.677,24.436c23.725,0,46.158-8.663,63.677-24.436h21.786V359.887z M370.747,320.065l-45.899-21.01    v-60.962l45.899-21.01V320.065z" />
            </motion.svg>
            <motion.span
              variants={btnTextVariants}
              initial="start"
              animate="end"
              custom={{ category: cat }}
            >
              MOVIES
            </motion.span>
          </CatButton>
          <CatButton
            onClick={() => {
              setCat(false);
              srcParams.set("category", "tvs");
              navigate(`/search/?${srcParams.toString()}`);
            }}
          >
            <motion.svg
              variants={btnVariants}
              initial="start"
              animate="end"
              whileHover="hover"
              custom={{ category: !cat }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              fill="currentColor"
            >
              <path d="M512 448H127.1C110.3 448 96 462.3 96 479.1S110.3 512 127.1 512h384C529.7 512 544 497.7 544 480S529.7 448 512 448zM592 0h-544C21.5 0 0 21.5 0 48v320C0 394.5 21.5 416 48 416h544c26.5 0 48-21.5 48-48v-320C640 21.5 618.5 0 592 0zM576 352H64v-288h512V352z" />
            </motion.svg>
            <motion.span
              variants={btnTextVariants}
              initial="start"
              animate="end"
              custom={{ category: !cat }}
            >
              TV SHOW
            </motion.span>
          </CatButton>
        </Btns>
        <Keyword>Search: {keyword}</Keyword>
        {cat ? (
          <MoviesSearchResults keyword={keyword} />
        ) : (
          <>
            <TvsSearchResults keyword={keyword} />
          </>
        )}
      </Wrapper>
    </>
  );
}

export default Search;

import { useViewportScroll, AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import { useNavigate, useMatch } from "react-router-dom";
import styled from "styled-components";
import {
  IGetMoviesResult,
  getSearchResult,
  IGetMovieDetail,
  getMovieDetail,
  ITvShows,
  ITvShowsDetail,
  getTvShowsDetail,
} from "../api";
import { makeImagePath, Ratings } from "../Routes/UTILS";
import {
  Box,
  Info,
  BigMovie,
  BigCover,
  BigTitle,
  BigInfo,
  Adult,
  BigOverview,
  BigSubInfo,
  boxVariants,
  infoVariants,
} from "./Slider";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const TemplateBox = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(auto, 1fr);
  column-gap: 10px;
  row-gap: 50px;
  margin-bottom: 100px;
`;

const TextExcept = styled.div`
  width: 100%;
  text-align: center;
  font-size: 36px;
  font-weight: 600;
`;

export function MoviesSearchResults({ keyword }: { keyword: string | null }) {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch(`/search/:movieId`);

  const { data: dataFirst, isLoading: isLoadingFirst } =
    useQuery<IGetMoviesResult>(["search: " + keyword + "movie", 1], () =>
      getSearchResult({
        keyword: keyword,
        category: "movie",
        page: 1,
      })
    );
  const { data: dataSecond, isLoading: isLoadingSecond } =
    useQuery<IGetMoviesResult>(["search: " + keyword + "movie", 2], () =>
      getSearchResult({
        keyword: keyword,
        category: "movie",
        page: 2,
      })
    );

  const noData = dataFirst?.total_pages!! < 1;

  const { scrollY } = useViewportScroll();

  const onBoxClicked = ({ movieId }: { movieId: number }) => {
    navigate(`/search/${movieId}?category=movies&keyword=${keyword}`);
  };
  const onOverlayClick = () =>
    navigate(`/search/?category=movies&keyword=${keyword}`);
  const clickedMovie =
    (bigMovieMatch?.params.movieId &&
      dataFirst?.results.find(
        (movie) => String(movie.id) === bigMovieMatch.params.movieId
      )) ||
    dataSecond?.results.find(
      (movie) => String(movie.id) === bigMovieMatch?.params.movieId
    );

  const { data: clickedMovieDetail } = useQuery<IGetMovieDetail>(
    [bigMovieMatch?.params.movieId, "detail"],
    () => getMovieDetail(bigMovieMatch?.params.movieId)
  );

  return noData ? (
    <TextExcept>No search results</TextExcept>
  ) : isLoadingFirst && isLoadingSecond ? (
    <TextExcept>Loading . . .</TextExcept>
  ) : (
    <>
      <TemplateBox key={"movie"}>
        {dataFirst?.results.map((movie) => (
          <Box
            layoutId={movie.id.toString()}
            key={movie.id}
            variants={boxVariants}
            onClick={() => onBoxClicked({ movieId: movie.id })}
            initial="normal"
            whileHover="hover"
            transition={{
              type: "tween",
            }}
            bgPhoto={
              movie.backdrop_path || movie.poster_path !== null
                ? makeImagePath(
                    movie.backdrop_path || movie.poster_path,
                    "w500"
                  )
                : "https://github.com/zerosial/NomadClone-ReactMovie/blob/main/public/noImage.gif?raw=true"
            }
          >
            <Info variants={infoVariants}>
              <h4>{movie.title}</h4>
            </Info>
          </Box>
        ))}
        {dataSecond?.results.map((movie: any) => (
          <Box
            layoutId={movie.id.toString()}
            key={movie.id}
            variants={boxVariants}
            onClick={() => onBoxClicked({ movieId: movie.id })}
            initial="normal"
            whileHover="hover"
            transition={{
              type: "tween",
            }}
            bgPhoto={
              movie.backdrop_path || movie.poster_path !== null
                ? makeImagePath(
                    movie.backdrop_path || movie.poster_path,
                    "w500"
                  )
                : "https://ang-projects.com/public/uploads/contents/testi-no-image.png"
            }
          >
            <Info variants={infoVariants}>
              <h4>{movie.title}</h4>
            </Info>
          </Box>
        ))}
      </TemplateBox>
      <AnimatePresence>
        {bigMovieMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ></Overlay>
            <BigMovie
              layoutId={bigMovieMatch.params.movieId!!.toString()}
              scrollY={scrollY.get()}
            >
              {clickedMovie && (
                <>
                  <BigCover
                    bgPhoto={makeImagePath(
                      clickedMovie.backdrop_path || clickedMovie.poster_path,
                      "w500"
                    )}
                  >
                    <BigTitle>{clickedMovie.title}</BigTitle>
                  </BigCover>
                  <BigInfo>
                    <div>
                      {new Date(
                        clickedMovieDetail?.release_date as string
                      ).getFullYear()}
                    </div>
                    <Adult adult={clickedMovieDetail?.adult}>
                      {clickedMovieDetail?.adult ? 19 : "All"}
                    </Adult>
                    {(clickedMovieDetail?.vote_average as number) <= 0.0 ? (
                      <div>Not Rated</div>
                    ) : (
                      <Ratings
                        rating={clickedMovieDetail?.vote_average as number}
                      />
                    )}
                  </BigInfo>
                  <BigOverview>{clickedMovie.overview}</BigOverview>
                  <BigSubInfo>
                    <div>
                      <span>Genres: </span>
                      {clickedMovieDetail?.genres.map((item) => (
                        <span> {item.name} </span>
                      ))}
                    </div>
                    <div>
                      <span>Language: </span>
                      {clickedMovieDetail?.original_language.toUpperCase()}
                    </div>
                  </BigSubInfo>
                </>
              )}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export function TvsSearchResults({ keyword }: { keyword: string | null }) {
  const navigate = useNavigate();
  const bigTvMatch = useMatch(`/search/:tvId`);

  const { data: dataFirst, isLoading: isLoadingFirst } = useQuery<ITvShows>(
    ["search: " + keyword + "tv", 1],
    () =>
      getSearchResult({
        keyword: keyword,
        category: "tv",
        page: 1,
      })
  );
  const { data: dataSecond, isLoading: isLoadingSecond } = useQuery<ITvShows>(
    ["search: " + keyword + "tv", 2],
    () =>
      getSearchResult({
        keyword: keyword,
        category: "tv",
        page: 2,
      })
  );

  const noData = dataFirst?.total_pages!! < 1;

  const { scrollY } = useViewportScroll();

  const onBoxClicked = ({ tvId }: { tvId: number }) => {
    navigate(`/search/${tvId}?category=tvs&keyword=${keyword}`);
  };
  const onOverlayClick = () =>
    navigate(`/search/?category=tvs&keyword=${keyword}`);
  const clickedTv =
    (bigTvMatch?.params.tvId &&
      dataFirst?.results.find(
        (tv) => String(tv.id) === bigTvMatch.params.tvId
      )) ||
    dataSecond?.results.find((tv) => String(tv.id) === bigTvMatch?.params.tvId);

  const { data: clickedTvDetail, isLoading: isLoadingDetail } =
    useQuery<ITvShowsDetail>([bigTvMatch?.params.tvId, "detail"], () =>
      getTvShowsDetail(bigTvMatch?.params.tvId)
    );

  return noData ? (
    <TextExcept>No search results</TextExcept>
  ) : isLoadingFirst && isLoadingSecond ? (
    <TextExcept>Loading . . .</TextExcept>
  ) : (
    <>
      <TemplateBox key={"tv"}>
        {dataFirst?.results.map((tv) => (
          <Box
            layoutId={tv.id.toString()}
            key={tv.id}
            variants={boxVariants}
            onClick={() => onBoxClicked({ tvId: tv.id })}
            initial="normal"
            whileHover="hover"
            transition={{
              type: "tween",
            }}
            bgPhoto={
              tv.backdrop_path || tv.poster_path !== null
                ? makeImagePath(tv.backdrop_path || tv.poster_path, "w500")
                : "https://github.com/zerosial/NomadClone-ReactMovie/blob/main/public/noImage.gif?raw=true"
            }
          >
            <Info variants={infoVariants}>
              <h4>{tv.name}</h4>
            </Info>
          </Box>
        ))}
        {dataSecond?.results.map((tv: any) => (
          <Box
            layoutId={tv.id.toString()}
            key={tv.id}
            variants={boxVariants}
            onClick={() => onBoxClicked({ tvId: tv.id })}
            initial="normal"
            whileHover="hover"
            transition={{
              type: "tween",
            }}
            bgPhoto={
              tv.backdrop_path || tv.poster_path !== null
                ? makeImagePath(tv.backdrop_path || tv.poster_path, "w500")
                : "https://github.com/zerosial/NomadClone-ReactMovie/blob/main/public/noImage.gif?raw=true"
            }
          >
            <Info variants={infoVariants}>
              <h4>{tv.name}</h4>
            </Info>
          </Box>
        ))}
      </TemplateBox>
      <AnimatePresence>
        {bigTvMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ></Overlay>
            <BigMovie
              layoutId={bigTvMatch.params.tvId!!.toString()}
              scrollY={scrollY.get()}
            >
              {clickedTv && (
                <>
                  <BigCover
                    bgPhoto={makeImagePath(
                      clickedTv.backdrop_path || clickedTv.poster_path,
                      "w500"
                    )}
                  >
                    <BigTitle>{clickedTv.name}</BigTitle>
                  </BigCover>
                  <BigInfo>
                    <div>
                      {(clickedTvDetail?.first_air_date as string) +
                        " ~ " +
                        (new Date(clickedTvDetail?.last_air_date as string) >
                        new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7)
                          ? ""
                          : clickedTvDetail?.last_air_date)}
                    </div>
                    <Adult adult={clickedTvDetail?.adult}>
                      {clickedTvDetail?.adult ? 19 : "All"}
                    </Adult>
                    {(clickedTvDetail?.vote_average as number) <= 0.0 ? (
                      <div>Not Rated</div>
                    ) : (
                      <Ratings
                        rating={clickedTvDetail?.vote_average as number}
                      />
                    )}
                  </BigInfo>
                  <BigOverview>{clickedTv.overview}</BigOverview>
                  <BigSubInfo>
                    <div>
                      <span>Genres: </span>
                      {clickedTvDetail?.genres.map((data) => (
                        <span> {data.name} </span>
                      ))}
                    </div>
                    <div>
                      <span>Language: </span>
                      {clickedTvDetail?.original_language.toUpperCase()}
                    </div>
                  </BigSubInfo>
                </>
              )}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

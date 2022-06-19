import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { Slider } from "../Components/Slider";
import { makeImagePath, Types } from "./UTILS";

export const Wrapper = styled.div`
  background: black;
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

export const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

export const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

export const Overview = styled.p`
  font-size: 36px;
  width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  line-height: 50px;
  height: 50 * 3px;
`;

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "now_playing"],
    () => getMovies(Types.now_playing)
  );
  const bannerIndex = 0;

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              data?.results[bannerIndex].backdrop_path || ""
            )}
          >
            <Title>{data?.results[bannerIndex].title}</Title>
            <Overview>{data?.results[bannerIndex].overview}</Overview>
          </Banner>
          <Slider type={Types.now_playing} />
          <Slider type={Types.popular} />
          <Slider type={Types.top_rated} />
          <Slider type={Types.upcoming} />
        </>
      )}
    </Wrapper>
  );
}

export default Home;

import { useQuery } from "react-query";
import { getTvShows, ITvShows } from "../api";
import { SliderTvs } from "../Components/Slider";
import { Wrapper, Loader, Banner, Title, Overview } from "./Home";
import { makeImagePath, TypeShows } from "./UTILS";

function Tv() {
  const { data, isLoading } = useQuery<ITvShows>(["tvs", "on_the_air"], () =>
    getTvShows(TypeShows.on_the_air)
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
            <Title>{data?.results[bannerIndex].name}</Title>
            <Overview>{data?.results[bannerIndex].overview}</Overview>
          </Banner>
          <SliderTvs type={TypeShows.on_the_air} />
          <SliderTvs type={TypeShows.popular} />
          <SliderTvs type={TypeShows.top_rated} />
        </>
      )}
    </Wrapper>
  );
}

export default Tv;

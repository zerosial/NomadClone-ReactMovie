import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieDetail from "../components/MovieDetail";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState();
  const { id } = useParams();
  const getMoviesDetail = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovies(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMoviesDetail();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {console.log("movies", movies)}
          {
            <MovieDetail
              key={movies.id}
              id={movies.id}
              coverImg={movies.large_cover_image}
              title={movies.title_long}
              summary={movies.summary}
              genres={movies.genres}
            />
          }
        </div>
      )}
    </div>
  );
}

export default Detail;

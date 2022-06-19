import { useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  MoviesSearchResults,
  TvsSearchResults,
} from "../Components/SearchResults";

const Wrapper = styled.div`
  margin: 150px 60px 0px 90px;
`;

const Keyword = styled.h1`
  margin: 50px 0px;
  font-size: 36px;
  font-weight: 600;
`;

function Search() {
  const location = useLocation();
  const srcParams = new URLSearchParams(location.search);
  const keyword = srcParams.get("keyword");

  return (
    <>
      <Wrapper>
        <Keyword>Search: {keyword}</Keyword>
        <MoviesSearchResults keyword={keyword} />
        <TvsSearchResults keyword={keyword} />
      </Wrapper>
    </>
  );
}

export default Search;

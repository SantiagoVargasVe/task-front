import { useState, useEffect } from "react";
import HeroCard from "./HeroCard";
import Filter from "./Filter";
import "./App.css";
import axios from "axios";
import "animate.css";
import InfiniteScroll from "react-infinite-scroll-component";
function App() {
  const [characters, setCharacters] = useState([]);
  const [allCharacters, setAllCharacters] = useState([]);
  const [page, setPage] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterEpisodes, setFilterEpisodes] = useState("");
  const [filterOrigin, setFilterOrigin] = useState("");
  const [filterSpecies, setFilterSpecies] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(async () => {
    const response = await axios.get(
      "https://rickandmortyapi.com/api/character/?page=1"
    );
    setCharacters(response.data.results);
    setAllCharacters(response.data.results);

    setPage(response.data.info.next);
  }, []);

  const handleFilter = ([input, value]) => {
    console.log(input, value);
    let newCharacters = [];
    if (isDeleting([input, value])) {
      newCharacters = allCharacters;
      newCharacters = filterByName(
        input == "name" ? value : filterName,
        newCharacters
      );
      newCharacters = filterByEpisodes(
        input == "episodes" ? value : filterEpisodes,
        newCharacters
      );
      newCharacters = filterByOrigin(
        input == "origin" ? value : filterOrigin,
        newCharacters
      );
      newCharacters = filterBySpecies(
        input == "species" ? value : filterSpecies,
        newCharacters
      );
      newCharacters = filterByGender(
        input == "gender" ? value : filterGender,
        newCharacters
      );
      newCharacters = filterByStatus(
        input == "status" ? value : filterStatus,
        newCharacters
      );

      if (input == "name") {
        setFilterName(value);
      } else if (input == "episodes") {
        setFilterEpisodes(value);
      } else if (input == "origin") {
        setFilterOrigin(value);
      } else if (input == "species") {
        setFilterSpecies(value);
      } else if (input == "gender") {
        setFilterGender(value);
      } else if (input == "status") {
        setFilterStatus(value);
      }
    } else {
      if (input === "name") {
        setFilterName(value);
        newCharacters = filterByName(value, characters);
      } else if (input === "episodes") {
        setFilterEpisodes(value);
        newCharacters = filterByEpisodes(value, characters);
      } else if (input === "origin") {
        setFilterOrigin(value);
        newCharacters = filterByOrigin(value, characters);
      } else if (input === "species") {
        setFilterSpecies(value);
        newCharacters = filterBySpecies(value, characters);
      } else if (input === "gender") {
        setFilterGender(value);
        newCharacters = filterByGender(value, characters);
      } else if (input === "status") {
        setFilterStatus(value);
        newCharacters = filterByStatus(value, characters);
      }
    }
    setCharacters(newCharacters);
  };

  const isDeleting = ([input, value]) => {
    if (input === "name" && value.length < filterName.length) {
      return true;
    } else if (input === "episodes" && value.length < filterEpisodes.length) {
      return true;
    } else if (input === "origin" && value.length < filterOrigin.length) {
      return true;
    } else if (input === "species" && value.length < filterSpecies.length) {
      return true;
    } else if (input === "gender" && value.length < filterSpecies.length) {
      return true;
    } else if (input === "status" && value.length < filterStatus.length) {
      return true;
    }
  };

  const filterByName = (value, arrayCharacters) => {
    let filteredCharacters = arrayCharacters.filter((character) => {
      return character.name.toLowerCase().includes(value.toLowerCase());
    });

    return filteredCharacters;
  };

  const filterByEpisodes = (value, arrayCharacters) => {
    let filteredCharacters = arrayCharacters.filter((character) => {
      const episodesLength = character.episode.length + "";
      return episodesLength.includes(value);
    });

    return filteredCharacters;
  };

  const filterByOrigin = (value, arrayCharacters) => {
    let filteredCharacters = arrayCharacters.filter((character) => {
      return character.origin.name.toLowerCase().includes(value.toLowerCase());
    });

    return filteredCharacters;
  };

  const filterBySpecies = (value, arrayCharacters) => {
    let filteredCharacters = arrayCharacters.filter((character) => {
      return character.species.toLowerCase().includes(value.toLowerCase());
    });

    return filteredCharacters;
  };

  const filterByGender = (value, arrayCharacters) => {
    let filteredCharacters = arrayCharacters.filter((character) => {
      return character.gender.toLowerCase().includes(value.toLowerCase());
    });

    return filteredCharacters;
  };

  const filterByStatus = (value, arrayCharacters) => {
    let filteredCharacters = arrayCharacters.filter((character) => {
      return character.status.toLowerCase().includes(value.toLowerCase());
    });

    return filteredCharacters;
  };

  return (
    <div className="App">
      <Filter handleFilter={handleFilter} />
      <InfiniteScroll
        dataLength={characters.length}
        className="container-characters"
        height={"95vh"}
        next={() => {
          console.log("Estoy cargando más contenido", page);
          axios
            .get(page)
            .then((res) => {
              setAllCharacters([...allCharacters, ...res.data.results]);
              setCharacters([...characters, ...res.data.results]);
              setPage(res.data.info.next);
            })
            .catch((err) => console.log(err));
        }}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {characters.map((character) => (
          <HeroCard key={character.id} {...character} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default App;

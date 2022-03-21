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

  const handleFilterName = (e) => {
    const filter = e.target.value;
    console.log("Este es el filtro del evento", filter);
    if (filter.length < filterName.length) {
      console.log("Este es el filtro del estado", filterName);
      filterAll({ name: filter });
    } else {
      const filteredCharacters = characters.filter((character) => {
        return character.name.toLowerCase().includes(filter.toLowerCase());
      });
      setCharacters(filteredCharacters);
    }
    setFilterName(filter);
  };

  const filterAll = ({ nameFilter, episodes }) => {
    setCharacters(allCharacters);
    console.log(allCharacters);
    nameFilter = nameFilter ? nameFilter : filterName;
    let filteredCharacters = characters;
    if (nameFilter.length > 0) {
      console.log("filtro por nombre", nameFilter);
      filteredCharacters = filteredCharacters.filter((character) => {
        return character.name.toLowerCase().includes(nameFilter.toLowerCase());
      });
      console.log();
      setCharacters(filteredCharacters);
    }
    // if (filterEpisodes.length > 0) {
    //   console.log("Estoy filtrando por episodios");
    //   filteredCharacters = filteredCharacters.filter((character) => {
    //     const numberEpisodes = character.episode.length + "";
    //     return numberEpisodes.includes(filterEpisodes.toLowerCase());
    //   });
    // }
    // if (filterOrigin.length > 0) {
    //   filteredCharacters = filteredCharacters.filter((character) => {
    //     return character.origin.name
    //       .toLowerCase()
    //       .includes(filterOrigin.toLowerCase());
    //   });
    // }
    // if (filterSpecies.length > 0) {
    //   filteredCharacters = filteredCharacters.filter((character) => {
    //     return character.species
    //       .toLowerCase()
    //       .includes(filterSpecies.toLowerCase());
    //   });
    // }
    // if (filterGender.length > 0) {
    //   filteredCharacters = filteredCharacters.filter((character) => {
    //     return character.character.gender
    //       .toLowerCase()
    //       .includes(filterGender.toLowerCase());
    //   });
    // }
    // if (filterSpecies.length > 0) {
    //   filteredCharacters = filteredCharacters.filter((character) => {
    //     return character.status
    //       .toLowerCase()
    //       .includes(filterSpecies.toLowerCase());
    //   });
    // }
    // if (filterStatus.length > 0) {
    //   filteredCharacters = filteredCharacters.filter((character) => {
    //     return character.status
    //       .toLowerCase()
    //       .includes(filterStatus.toLowerCase());
    //   });
    // }
  };

  const handleFilterEpisodes = (e) => {
    const filter = e.target.value;
    const filteredCharacters = characters.filter((character) => {
      const numberEpisodes = character.episode.length + "";
      return numberEpisodes.includes(filter.toLowerCase());
    });
    setFilterEpisodes(filter);
    setCharacters(filteredCharacters);
  };

  const handleFilterOrigin = (e) => {
    const filter = e.target.value;
    const filteredCharacters = characters.filter((character) => {
      return character.origin.name.toLowerCase().includes(filter.toLowerCase());
    });
    setFilterOrigin(filter);
    setCharacters(filteredCharacters);
  };

  const handleFilterGender = (e) => {
    const filter = e.target.value;
    const filteredCharacters = characters.filter((character) => {
      return character.gender.toLowerCase().includes(filter.toLowerCase());
    });
    setFilterGender(filter);
    setCharacters(filteredCharacters);
  };

  const handleFilterStatus = (e) => {
    const filter = e.target.value;
    const filteredCharacters = characters.filter((character) => {
      return character.status.toLowerCase().includes(filter.toLowerCase());
    });
    setFilterStatus(filter);
    setCharacters(filteredCharacters);
  };

  const handleFilterSpecies = (e) => {
    const filter = e.target.value;
    const filteredCharacters = characters.filter((character) => {
      return character.species.toLowerCase().includes(filter.toLowerCase());
    });
    setFilterSpecies(filter);
    setCharacters(filteredCharacters);
  };

  const reFilter = () => {
    setCharacters(allCharacters);
    setFilterName("");
    setFilterEpisodes("");
    setFilterOrigin("");
    setFilterGender("");
    setFilterStatus("");
    setFilterSpecies("");
  };

  return (
    <div className="App">
      <Filter
        handleFilterName={handleFilterName}
        handleFilterEpisodes={handleFilterEpisodes}
        handleFilterOrigin={handleFilterOrigin}
        handleFilterGender={handleFilterGender}
        handleFilterStatus={handleFilterStatus}
        handleFilterSpecies={handleFilterSpecies}
        filterName={filterName}
        filterEpisodes={filterEpisodes}
        filterOrigin={filterOrigin}
        filterGender={filterGender}
        filterStatus={filterStatus}
        filterSpecies={filterSpecies}
      />
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

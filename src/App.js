import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cache, setCache] = useState({});

  const fetchData = async () => {
    if (cache[input]) {
      setRecipes(cache[input]);
      return;
    }
    const result = await fetch(
      "https://dummyjson.com/recipes/search?q=" + input
    );
    const json = await result.json();
    console.log(json);
    setRecipes(json?.recipes);
    setCache((prev) => ({ ...prev, [input]: json?.recipes }));
  };
  useEffect(() => {
    const interval = setTimeout(fetchData, 300);

    return () => {
      clearTimeout(interval);
    };
    // fetchData();
  }, [input]);

  return (
    <div className="App">
      <h3>Autocomplete Searchbar</h3>
      <div className="input-container">
        <input
          className="input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
        />
        {showResults && (
          <div className="result-container">
            {recipes.map((recipe) => (
              <span className="result" key={recipe.id}>
                {recipe.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

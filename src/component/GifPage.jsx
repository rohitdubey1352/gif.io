import { useState, useEffect } from "react";

const API_KEY = "jkPsawMJYEU1lbCbWTS9y7j19TxLhSyI"; // Replace with your actual API key

const GifPage = () => {
  const [gifs, setGifs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(9); // GIFs per page

  const fetchGifs = async (term, page, reset = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const offset = (page - 1) * limit;
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/${
          term ? "search" : "trending"
        }?api_key=${API_KEY}&q=${term}&limit=${limit}&offset=${offset}`
      );
      const data = await response.json();
      setGifs((prevGifs) => (reset ? data.data : [...prevGifs, ...data.data]));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGifs("", 1); // Fetch trending GIFs on initial load (page 1)
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1); // Reset page to 1 for new search
    fetchGifs(searchTerm, 1, true); // Pass 'true' to reset GIFs
  };

  const handleShowMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchGifs(searchTerm, nextPage);
  };

  const hasMoreGifs = gifs.length < (searchTerm ? Infinity : Infinity); // Assuming there's no way to know the total count for trending

  const downloadGif = (gif) => {
    const url = gif.images.downsized.url;
    const link = document.createElement("a");
    link.href = url;
    link.download = `${gif.title}.gif`; // Set download filename with title
    link.style.display = "none"; // Hide the link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <section className="main">
        <span></span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for GIFs"
          />
          <button type="submit">Search</button>
        </form>
        <span></span>

        {isLoading && <p>Loading GIFs...</p>}
        {error && <p>Error: {error}</p>}
        {gifs.map((gif) => (
          <div className="gifContent" key={gif.id}>
            <img src={gif.images.downsized.url} alt={gif.title} />
            <button onClick={() => downloadGif(gif)}>View</button>
          </div>
        ))}
        <span></span>
        {hasMoreGifs && (
          <button className="showMore" onClick={handleShowMore}>
            Show More
          </button>
        )}
      </section>
    </>
  );
};

export default GifPage;

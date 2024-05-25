import PropTypes from "prop-types";
function MovieDetail({id, coverImg, title, genres}){
    return (
        <div>
            <div>{id}</div>
            <img src={coverImg} alt={title}/>
            <h2>{title}</h2>
            <ul>
            {genres.map((g) => (
                <li key={g}>{g}</li>
            ))}
            </ul>
        </div> 
    );
}

MovieDetail.propTypes = {
    id: PropTypes.number.isRequired,
    coverImg: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MovieDetail;
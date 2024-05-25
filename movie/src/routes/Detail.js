import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetail from "../components/MovieDetail";

function Detail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [mvDetail, setMvDetail] = useState([]);

    useEffect(() => {
        const getMovie = async () => {
            try {
                const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
                const json = await response.json();
                setMvDetail(json.data.movie ? [json.data.movie] : []);
            } catch (error) {
                console.error("영화 정보를 가져오는데 실패했습니다:", error);
            } finally {
                setLoading(false);
            }
        };
        getMovie();
    }, [id]);

    return (
        <div>
            {loading ? (
                <h1>로딩 중...</h1>
            ) : (
                <div>
                    {mvDetail.length > 0 ? (
                        mvDetail.map((movie) => (
                            <MovieDetail
                                key={movie.id}
                                id={movie.id}
                                coverImg={movie.large_cover_image}
                                title={movie.title}
                                summary={movie.summary}
                                genres={movie.genres}
                            />
                        ))
                    ) : (
                        <h1>영화 정보를 찾을 수 없습니다.</h1>
                    )}
                </div>
            )}
        </div>
    );
}

export default Detail;
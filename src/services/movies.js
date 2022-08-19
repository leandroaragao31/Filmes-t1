import React, { Component } from 'react'
import axios from 'axios'

const FilmesApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie/popular?api_key=d595a5668e695d5eceb1a3afe07cbd87&language=en-US&page=1'
})
console.log(FilmesApi)


export default class Movies extends Component {
    state = {
        movies: [],
        FilterMovies:[]
    }

    componentDidMount() {
        this.getMovies();
    }

    getMovies = async () => {
        const resposta = await FilmesApi.get()
        console.log(resposta);


        const allFilmes = resposta.data.results.map((item) => {
            return {
                ...item,
                image: `https://image.tmdb.org/t/p/w500${item.poster_path}`
            }

        })
        this.setState({
            movies: allFilmes,
            FilterMovies:allFilmes
        })
        console.log(allFilmes)
    }

    handleChange = (event) =>{
        const ListaFiltrada = this.state.movies.filter((item) => {
            if(item.original_title.toLowerCase().includes(event.target.value.toLowerCase())){
                return  true
            }else{
                return ""
            }
        })
        this.setState({
            FilterMovies:ListaFiltrada
        })
        console.log(this.state.FilterMovies)
    }

    render() {
        return (
            <>
            <input  onChange={this.handleChange}/>
                {this.state.FilterMovies.map((item, index) => (
                    <div key={index}>
                        <ul >
                            <li>{item.original_title}</li>
                            <li>{item.overview}</li>
                            <li>{item.vote_average}</li>
                        </ul>
                        <img src={item.image} alt='posters' />
                    </div>
                ))}

            </>
        )
    }
}
import Head from 'next/head'
import { usePokemonList } from '@/hooks/pokemon'
import { useState } from 'react'

export default function Home() {
    const { pokemonList } = usePokemonList()
    const perPage = 20

    // Number of pages based on total number of Pokémon and number of Pokémon per page
    const totalPages = Math.ceil(pokemonList?.total / perPage)

    // Local state to track the current page
    const [currentPage, setCurrentPage] = useState(1)

    // Calculate the offset for the current page
    const offset = (currentPage - 1) * perPage
    const clickForm = newPage => {
        // eslint-disable-next-line no-console
        console.log(newPage)

        setCurrentPage(newPage)

        // Change the URL by adding the "paged" parameter
        window.location.href = window.location.pathname + `?paged=${newPage}`
    }

    return (
        <>
            <Head>
                <title>Pokemon List</title>
            </Head>

            <div className="grid grid-cols-1 md:grid-cols-2">
                {pokemonList?.pokemons
                    .slice(offset, offset + perPage)
                    .map(pokemon => (
                        // eslint-disable-next-line react/jsx-key
                        <div key={pokemon.id}>
                            <h2>{pokemon.name}</h2>
                            <p>ID: {pokemon.id}</p>
                            <p>Height: {pokemon.height}</p>
                            <p>Weight: {pokemon.weight}</p>
                            <img
                                src={pokemon.image}
                                alt={pokemon.name + '.png'}
                            />
                            {JSON.parse(pokemon.types).map(type => (
                                <p key={type.type.name}>{type.type.name}</p>
                            ))}
                        </div>
                    ))}
            </div>

            <div className="pagination">
                <button
                    onClick={() => {
                        const url = new URL(window.location.href)
                        const paged =
                            parseInt(url.searchParams.get('paged'), 10) || 1
                        if (paged > 1) {
                            url.searchParams.set(
                                'paged',
                                (paged - 1).toString(),
                            )
                            window.location.href = url.toString()
                        }
                    }}>
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => clickForm(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}>
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => {
                        const url = new URL(window.location.href)
                        const paged =
                            parseInt(url.searchParams.get('paged'), 10) || 1
                        if (paged < totalPages) {
                            url.searchParams.set(
                                'paged',
                                (paged + 1).toString(),
                            )
                            window.location.href = url.toString()
                        }
                    }}>
                    Next
                </button>
            </div>
        </>
    )
}

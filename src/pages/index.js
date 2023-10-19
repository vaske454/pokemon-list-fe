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
    return (
        <>
            <Head>
                <title>Pokemon List</title>
            </Head>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pokemonList?.pokemons
                    .slice(offset, offset + perPage)
                    .map(pokemon => (
                        <div
                            key={pokemon.id}
                            className="border p-4 rounded shadow-md">
                            <h2 className="text-xl font-semibold mb-2">
                                {pokemon.name}
                            </h2>
                            <p className="mb-2">ID: {pokemon.id}</p>
                            <p className="mb-2">Height: {pokemon.height}</p>
                            <p className="mb-2">Weight: {pokemon.weight}</p>
                            <img
                                src={pokemon.image}
                                alt={`${pokemon.name}.png`}
                                className="mx-auto my-2"
                            />
                            <div className="space-x-2">
                                {JSON.parse(pokemon.types).map(type => (
                                    <p
                                        key={type.type.name}
                                        className="px-2 py-1 text-xs bg-blue-200 rounded">
                                        {type.type.name}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>

            <div className="pagination">
                <div className="flex justify-center my-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-l cursor-pointer"
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
                        <a
                            className={`px-4 py-2 bg-gray-200 rounded cursor-pointer`}
                            key={index}
                            href={`/?paged=${index + 1}`}
                            onClick={() => setCurrentPage(index + 1)}>
                            {index + 1}
                        </a>
                    ))}

                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r cursor-pointer"
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
            </div>
        </>
    )
}

import Head from 'next/head'
import { usePokemonList } from '@/hooks/pokemon'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
    const { pokemonList } = usePokemonList()
    const perPage = 20

    // Number of pages based on total number of Pokémon and number of Pokémon per page
    const totalPages = Math.ceil(pokemonList?.total / perPage)
    const router = useRouter()
    const { paged } = router.query
    const currentPageFromURL = parseInt(router.query.paged, 10) || 1

    // Local state to track the current page
    const [currentPage] = useState(currentPageFromURL)

    // Calculate the offset for the current page
    const offset = (currentPage - 1) * perPage

    const handlePageChange = newPage => {
        router.push(`/?paged=${newPage}`)
    }
    // eslint-disable-next-line no-console
    let pageNumber = parseInt(paged, 10)
    if (isNaN(pageNumber)) {
        pageNumber = 1
    }

    return (
        <>
            <Head>
                <title>Pokemon List</title>
            </Head>

            <div>
                {pokemonList?.total > 0 ? (
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
                                    <p className="mb-2">
                                        Height: {pokemon.height}
                                    </p>
                                    <p className="mb-2">
                                        Weight: {pokemon.weight}
                                    </p>
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
                ) : (
                    <h1 className="text-3xl text-center p-4 bg-yellow-200 rounded-lg">
                        There are no Pokémon available.
                    </h1>
                )}
                {pokemonList?.total > 0 && (
                    <div className="pagination">
                        <div className="flex justify-center my-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-l cursor-pointer"
                                onClick={() => {
                                    const url = new URL(window.location.href)
                                    const paged =
                                        parseInt(
                                            url.searchParams.get('paged'),
                                            10,
                                        ) || 1
                                    if (paged > 1) {
                                        url.searchParams.set(
                                            'paged',
                                            (paged - 1).toString(),
                                        )
                                        window.location.href = url.toString()
                                    }
                                }}
                                style={{
                                    display: pageNumber > 1 ? 'block' : 'none',
                                }}>
                                Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, index) => (
                                <a
                                    key={index}
                                    href={`/?paged=${index + 1}`}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 ${
                                        pageNumber === index + 1
                                            ? 'bg-blue-500 text-white font-bold'
                                            : 'bg-gray-200'
                                    } rounded cursor-pointer`}>
                                    {index + 1}
                                </a>
                            ))}

                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r cursor-pointer"
                                style={{
                                    display:
                                        pageNumber < totalPages
                                            ? 'block'
                                            : 'none',
                                }}
                                onClick={() => {
                                    const url = new URL(window.location.href)
                                    const paged =
                                        parseInt(
                                            url.searchParams.get('paged'),
                                            10,
                                        ) || 1
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
                )}
            </div>
        </>
    )
}

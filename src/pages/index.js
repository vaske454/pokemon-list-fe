import Head from 'next/head'
import { usePokemonList } from '@/hooks/pokemon'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
    const { pokemonList } = usePokemonList()
    const perPage = 20

    // Number of pages based on the total number of Pokémon and the number of Pokémon per page
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
            <header>
                <h1 className="text-3xl text-center p-4 rounded-lg">
                    Pokemon List
                </h1>
            </header>

            <main className="p-8">
                {pokemonList?.total > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {pokemonList?.pokemons
                            .slice(offset, offset + perPage)
                            .map(pokemon => (
                                <article
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
                                    <div className="space-x-2 flex">
                                        {JSON.parse(pokemon.types).map(type => (
                                            <p
                                                key={type.type.name}
                                                className="px-2 py-1 text-xs bg-blue-200 rounded">
                                                {type.type.name}
                                            </p>
                                        ))}
                                    </div>
                                </article>
                            ))}
                    </div>
                ) : (
                    <h1 className="text-3xl text-center p-4 bg-yellow-200 rounded-lg">
                        There are no Pokémon available.
                    </h1>
                )}
            </main>
            <footer className="flex justify-center my-4">
                {pokemonList?.total > 0 && (
                    <ul className="pagination">
                        <div className="flex justify-center my-4">
                            <button
                                className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-l cursor-pointer ${
                                    pageNumber <= 1 ? 'hidden' : ''
                                }`}
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
                                }}>
                                Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, index) => (
                                <li
                                    className={`px-4 py-2 ${
                                        pageNumber === index + 1
                                            ? 'bg-blue-500 text-white font-bold'
                                            : 'bg-gray-200'
                                    } rounded cursor-pointer`}
                                    key={index}>
                                    <a
                                        href={`/?paged=${index + 1}`}
                                        onClick={() =>
                                            handlePageChange(index + 1)
                                        }>
                                        {index + 1}
                                    </a>
                                </li>
                            ))}

                            <button
                                className={`bg-blue-500 hover-bg-blue-600 text-white font-bold py-2 px-4 rounded-r cursor-pointer ${
                                    pageNumber >= totalPages ? 'hidden' : ''
                                }`}
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
                    </ul>
                )}
            </footer>
        </>
    )
}

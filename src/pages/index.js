import Head from 'next/head'
import { usePokemonList } from '@/hooks/pokemon'
import { useRouter } from 'next/router'

export default function Home() {
    const { pokemonList } = usePokemonList()
    const perPage = 20
    const currentPage = parseInt(pokemonList?.current_page)
    const nextPage = currentPage + 1
    const previousPage = currentPage - 1

    // Number of pages based on the total number of Pokémon and the number of Pokémon per page
    const totalPages = Math.ceil(pokemonList?.total / perPage)
    const router = useRouter()

    const handlePageChange = newPage => {
        router.push(`/?paged=${newPage}`)
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
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {pokemonList?.pokemons.map(pokemon => (
                            <article
                                key={pokemon.id}
                                className="border p-4 rounded shadow-md">
                                <h2 className="text-center text-xl my-4 border-b border-solid border-black">
                                    {pokemon.name}
                                </h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="text-sm">
                                                Property
                                            </th>
                                            <th className="text-sm">Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-gray-500">
                                                ID:
                                            </td>
                                            <td className="mb-2">
                                                {pokemon.id}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-gray-500">
                                                Height:
                                            </td>
                                            <td className="mb-2">
                                                {pokemon.height}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-gray-500">
                                                Weight:
                                            </td>
                                            <td className="mb-2">
                                                {pokemon.weight}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p>
                                    <img
                                        src={pokemon.image}
                                        alt={`${pokemon.name}.png`}
                                        className="mx-auto my-2"
                                    />
                                </p>
                                <ul className="space-x-2 flex">
                                    {JSON.parse(pokemon.types).map(type => (
                                        <li
                                            key={type.type.name}
                                            className="px-2 py-1 text-xs bg-blue-200 rounded">
                                            {type.type.name}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </section>
                ) : (
                    <h2 className="text-3xl text-center p-4 bg-yellow-200 rounded-lg">
                        There are no Pokémon available.
                    </h2>
                )}
            </main>
            <footer>
                {pokemonList?.total > 0 && (
                    <ul className="pagination flex justify-center my-4">
                        <li
                            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-l cursor-pointer ${
                                previousPage < 1 ? 'hidden' : ''
                            }`}>
                            <a href={`/?paged=${previousPage}`}>Previous</a>
                        </li>

                        {Array.from({ length: totalPages }, (_, index) => (
                            <li
                                className={`px-4 py-2 ${
                                    currentPage === index + 1
                                        ? 'bg-blue-500 text-white font-bold'
                                        : 'bg-gray-200'
                                } rounded cursor-pointer`}
                                key={index}>
                                <a
                                    href={`/?paged=${index + 1}`}
                                    onClick={() => handlePageChange(index + 1)}>
                                    {index + 1}
                                </a>
                            </li>
                        ))}

                        <li
                            className={`bg-blue-500 hover-bg-blue-600 text-white font-bold py-2 px-4 rounded-r cursor-pointer ${
                                currentPage >= totalPages ? 'hidden' : ''
                            }`}>
                            <a href={`/?paged=${nextPage}`}>Next</a>
                        </li>
                    </ul>
                )}
            </footer>
        </>
    )
}

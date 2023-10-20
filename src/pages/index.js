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
                <h1 className="page-title">Pokemon List</h1>
            </header>

            <main className="site-main">
                {pokemonList?.total > 0 ? (
                    <section className="pokemon-list">
                        {pokemonList?.pokemons.map(pokemon => (
                            <article key={pokemon.id} className="pokemon-item">
                                <h2 className="pokemon-name">{pokemon.name}</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="table-header">
                                                Property
                                            </th>
                                            <th className="table-header">
                                                Value
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="property">ID:</td>
                                            <td className="value">
                                                {pokemon.id}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="property">
                                                Height:
                                            </td>
                                            <td className="value">
                                                {pokemon.height}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="property">
                                                Weight:
                                            </td>
                                            <td className="value">
                                                {pokemon.weight}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p>
                                    <img
                                        src={pokemon.image}
                                        alt={`${pokemon.name}.png`}
                                        className="pokemon-image"
                                    />
                                </p>
                                <ul className="pokemon-types">
                                    {JSON.parse(pokemon.types).map(type => (
                                        <li
                                            key={type.type.name}
                                            className="pokemon-type">
                                            {type.type.name}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </section>
                ) : (
                    <h2 className="no-pokemon-message">
                        There are no Pokémon available.
                    </h2>
                )}
            </main>
            <footer>
                {pokemonList?.total > 0 && (
                    <ul className="pagination">
                        <li
                            className={`previous-btn ${
                                previousPage < 1 ? 'hidden' : ''
                            }`}>
                            <a href={`/?paged=${previousPage}`}>Previous</a>
                        </li>

                        {Array.from({ length: totalPages }, (_, index) => (
                            <li
                                className={`page-number ${
                                    currentPage === index + 1 ? 'active' : ''
                                }`}
                                key={index}>
                                <a
                                    href={`/?paged=${index + 1}`}
                                    onClick={() => handlePageChange(index + 1)}>
                                    {index + 1}
                                </a>
                            </li>
                        ))}

                        <li
                            className={`next-btn ${
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

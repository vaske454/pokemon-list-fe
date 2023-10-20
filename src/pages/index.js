import Head from 'next/head'
import { usePokemonList } from '@/hooks/pokemon'
import { useRouter } from 'next/router'
import Header from '@/components/Header'
import PokemonItem from '@/components/PokemonItem'
import NoPokemonMessage from '@/components/NoPokemonMessage'
import Footer from '@/components/Footer'

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
            <Header />

            <main className="site-main">
                {pokemonList?.total > 0 ? (
                    <section className="pokemon-list">
                        {pokemonList?.pokemons.map(pokemon => (
                            <PokemonItem key={pokemon.id} pokemon={pokemon} />
                        ))}
                    </section>
                ) : (
                    <NoPokemonMessage />
                )}
            </main>
            <Footer
                currentPage={currentPage}
                totalPages={totalPages}
                previousPage={previousPage}
                nextPage={nextPage}
                handlePageChange={handlePageChange}
            />
        </>
    )
}

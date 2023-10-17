import Head from 'next/head'
import { usePokemonList } from '@/hooks/pokemon'

export default function Home() {
    const { pokemonList } = usePokemonList()

    return (
        <>
            <Head>
                <title>Pokemon List</title>
            </Head>

            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <p>{pokemonList?.message}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

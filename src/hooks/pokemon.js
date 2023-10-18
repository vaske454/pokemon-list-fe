import useSWR from 'swr'
import axios from '@/lib/axios'

export const usePokemonList = () => {
    const { data: pokemonList } = useSWR('/api/pokemon-list', () =>
        axios
            .get('/api/pokemon-list', {
                params: {
                    paged:
                        new URLSearchParams(window.location.search).get(
                            'paged',
                        ) || 1,
                },
            })
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
    )

    return {
        pokemonList,
    }
}

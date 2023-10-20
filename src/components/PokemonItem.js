import React from 'react'

export default function PokemonItem({ pokemon }) {
    return (
        <article key={pokemon.id} className="pokemon-item">
            <h2 className="pokemon-name">{pokemon.name}</h2>
            <table>
                <thead>
                    <tr>
                        <th className="table-header">Property</th>
                        <th className="table-header">Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="property">ID:</td>
                        <td className="value">{pokemon.id}</td>
                    </tr>
                    <tr>
                        <td className="property">Height:</td>
                        <td className="value">{pokemon.height}</td>
                    </tr>
                    <tr>
                        <td className="property">Weight:</td>
                        <td className="value">{pokemon.weight}</td>
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
                    <li key={type.type.name} className="pokemon-type">
                        {type.type.name}
                    </li>
                ))}
            </ul>
        </article>
    )
}

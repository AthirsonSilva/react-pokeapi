import React from 'react'

const Card = ({
	pokemon,
	loading
}: {
	pokemon: any[]
	loading: boolean
}): JSX.Element => {
	console.log(pokemon)

	return (
		<>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				pokemon.map((item: any): JSX.Element => {
					return (
						<>
							<div className='card'>
								<h2>{item.id}</h2>
								<img
									src={item.sprites.front_default}
									alt='pokemon'
								/>
								<h3>{item.species.name}</h3>
							</div>
						</>
					)
				})
			)}
		</>
	)
}

export default Card

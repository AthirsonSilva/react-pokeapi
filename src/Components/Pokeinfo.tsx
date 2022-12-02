import React from 'react'

const Pokeinfo = ({ data }: any): JSX.Element => {
	console.log(data)

	return (
		<>
			{data.length === 0 ? (
				<>
					<h5>Click on a pokemon to see more info</h5>
				</>
			) : (
				<>
					<h1>{data.name}</h1>
					<img src={data.sprites.front_default} alt='pokemon' />
					<div className='abilities'>
						{data.abilities.map((item: any): JSX.Element => {
							return (
								<>
									<div className='group'>
										<h3>{item.ability.name}</h3>
									</div>
								</>
							)
						})}
					</div>
					<div className='base-stat'>
						{data.stats.map((item: any): JSX.Element => {
							return (
								<>
									<div className='group'>
										<h3>
											{item.stat.name}: {item.base_stat}
										</h3>
									</div>
								</>
							)
						})}
					</div>
				</>
			)}
		</>
	)
}

export default Pokeinfo

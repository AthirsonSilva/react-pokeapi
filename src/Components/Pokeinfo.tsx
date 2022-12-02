import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Modal } from 'react-bootstrap'

const Pokeinfo = ({ data }: any): JSX.Element => {
	const [show, setShow] = React.useState<boolean>(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	console.log(data)

	const getPokemonLocationEncounters = async (): Promise<any> => {
		const result = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${data.id}/encounters`
		)
		const json = await result.json()

		console.log('encounters', json)
	}

	React.useEffect((): void => {
		if (data.id) {
			getPokemonLocationEncounters()
		}
	}, [data.id])

	return (
		<>
			{data.length === 0 ? (
				<>
					<h5>Click on a pokemon to see more info</h5>
				</>
			) : (
				<>
					<h1 className='pokemon-name'>{data.name}</h1>
					<img src={data.sprites.front_default} alt='pokemon' />
					<div className='types'>
						{data.types.map((item: any) => {
							return (
								<>
									<div className='group'>
										<h3>{item.type.name}</h3>
									</div>
								</>
							)
						})}
					</div>
					<div className='abilities'>
						{data.abilities.map((item: any): JSX.Element => {
							return (
								<>
									<div className='group'>
										<h6>{item.ability.name}</h6>
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
					<br />
					<div className='btn-group'>
						<button
							className='skills-btn'
							onClick={(): void => handleShow()}
						>
							Skills
						</button>
					</div>

					<Modal show={show} onHide={(): void => handleClose()}>
						<Modal.Header closeButton>
							<Modal.Title>
								{data.name.toString()}'s movepool
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							{data.moves.map((item: any): JSX.Element => {
								return (
									<>
										<div className='group'>
											<h3>{item.move.name}</h3>
										</div>
									</>
								)
							})}
						</Modal.Body>
					</Modal>
				</>
			)}
		</>
	)
}

export default Pokeinfo

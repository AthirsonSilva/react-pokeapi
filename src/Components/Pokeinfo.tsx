import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Modal } from 'react-bootstrap'

const Pokeinfo = ({ data }: any): JSX.Element => {
	const [show, setShow] = React.useState<boolean>(false)
	const [encounters, setEncounters] = React.useState<any[]>([])
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	const [infoTitle, setInfoTitle] = React.useState<string>('')

	console.log(data)

	const getPokemonLocationEncounters = async (): Promise<any> => {
		const result = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${data.id}/encounters`
		)
		const json = await result.json()
		setEncounters(json)

		console.log('encounters', json)
	}

	const renderMovepools = (): JSX.Element => {
		console.log('data', data.moves)

		return (
			<>
				{data.moves.map((item: any): JSX.Element => {
					return (
						<>
							<div className='group'>
								<h3>
									{item.move.name
										.toString()
										.replace('-', ' ')}
								</h3>
							</div>
						</>
					)
				})}
			</>
		)
	}

	const renderEncounters = (): JSX.Element => {
		return (
			<>
				{encounters.map((item: any): JSX.Element => {
					let locationArea = item.location_area.name
						.toString()
						.replace('-', ' ')

					// removes the last word in the string
					locationArea = locationArea
						.replace('-', ' ')
						.split(' ')
						.slice(0, -1)
						.join(' ')

					return (
						<>
							<div className='group'>
								<h3>{locationArea}</h3>
							</div>
						</>
					)
				})}
			</>
		)
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
					<h1 className='pokemon-name'>
						{data.name.toString()} - #{data.id}
					</h1>
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

					<Modal show={show} onHide={(): void => handleClose()}>
						<Modal.Header closeButton>
							<Modal.Title>
								{data.name.toString().toUpperCase()}'s{' '}
								{infoTitle.toString().toUpperCase()}
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							{infoTitle === 'movepool'
								? renderMovepools()
								: null}
							{infoTitle === 'encounters'
								? renderEncounters()
								: null}
						</Modal.Body>
					</Modal>
				</>
			)}
		</>
	)
}

export default Pokeinfo

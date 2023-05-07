import React from "react"
import { Modal } from "react-bootstrap"

type InfoModalProps = {
	show: boolean
	data: any
	handleClose: () => void
}

const InfoModal = ({
	show,
	data,
	handleClose,
}: InfoModalProps) => {
	const [encounters, setEncounters] = React.useState<any[]>([])
	const [moveTypes, setMoveTypes] = React.useState<any[]>([])

	React.useEffect((): void => {
		if (data.id) {
			getPokemonLocationEncounters()
		}

		setMoveTypes(['level-up', 'machine', 'tutor', 'egg'])
	}, [data.id])

	const getPokemonLocationEncounters = async (): Promise<any> => {
		const result = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${data.id}/encounters`
		)

		const json = await result.json()

		setEncounters(json)
	}

	const filterMovesByLearnMethod = (learnMethod: string): any => {
		return data.moves.filter((item: any): any => {
			return item.version_group_details.some((item: any): any => {
				return item.move_learn_method.name === learnMethod
			})
		})
	}

	const renderMovepools = (movieLearningType: string): JSX.Element => {
		const moves = filterMovesByLearnMethod(movieLearningType)

		return (
			<>
				<div className='group'>
					<div className="mt-4">
						{moves.length === 0 ? (
							<p>It doesn't learn any {movieLearningType} moves</p>
						) : (
							<>
								{moves.map((item: any): JSX.Element => {
									return (
										<>
											<div className='group'>
												<p>
													{formatName(item.move.name)}
												</p>
											</div>
										</>
									)
								})}
							</>
						)}
					</div>
				</div>
			</>
		)
	}


	const formatName = (name: string): string => {
		name = name.replace(/-/g, ' ')

		return name.replace(/\b\w/g, (txt: string) => {
			return txt.toUpperCase()
		})
	}

	const renderEncounters = (): JSX.Element => {
		return (
			<div className="mt-4">
				{encounters.length === 0 ? (
					<p>It doesn't appear in any location</p>
				) : (
					<>
						{encounters.map((item: any): JSX.Element => {
							return (
								<>
									<div className='group'>
										<p>{formatName(item.location_area.name)}</p>
									</div>
								</>
							)
						})}
					</>
				)}
			</div>
		)
	}


	return (
		<Modal show={show} size="xl" backdrop="static" scrollable={true} onHide={(): void => handleClose()}>
			<Modal.Header closeButton>
				<Modal.Title>
					{data.name.toString().toUpperCase()}'S{' INFO'}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<main className="grid grid-cols-3 gap-3 info-modal">
					<div className="col-span-1 overflow-y-scroll">
						<h6>LEVEL UP MOVES</h6>
						{renderMovepools(moveTypes[0])}
					</div>
					<div className="col-span-1 overflow-y-scroll">
						<h6>MACHINE MOVES</h6>
						{renderMovepools(moveTypes[1])}
					</div>
					<div className="col-span-1 overflow-y-scroll">
						<h6>TUTOR MOVES</h6>
						{renderMovepools(moveTypes[2])}
					</div>
					<div className="col-span-1 overflow-y-scroll">
						<h6>EGG MOVES</h6>
						{renderMovepools(moveTypes[3])}
					</div>
					<div className="col-span-1 overflow-y-scroll">
						<h6>ENCOUNTERS</h6>
						{renderEncounters()}
					</div>
				</main>
			</Modal.Body>
		</Modal>
	)
}

export default InfoModal
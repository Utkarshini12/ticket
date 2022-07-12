import { CButtonToolbar } from "@coreui/react";

function Card({ color, count, icon, path }) {
    return (

        <div className="col-xs-12 col-lg-3 col-md-6 my-1">
            <div className={`card  cardItem shadow  bg-${color} text-dark bg-opacity-25 borders-b`} style={{ width: 15 + 'rem' }}>
                <div className="card-body">
                    <h5 className="card-subtitle mb-2"><i className={`bi bi-${icon} text-${color} mx-2`}></i>Open </h5>
                    <hr />
                    <div className="row">
                        <div className="col">
                            <h1 className="col text-dark mx-4">{{count}}</h1>
                        </div>
                        <div className="col">
                            <div style={{ width: 40, height: 40 }}>
                                <CircularProgressbar value={count} styles={buildStyles({
                                    textColor: "red",
                                    pathColor: {path},
                                })} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

{/* <Card color='primary' count=5 icon="pencil" path="darkblue" /> */}

export default Card;
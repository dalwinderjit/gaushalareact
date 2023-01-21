import React, { Component } from 'react'

export default class Cards extends Component {
    render() {
        return (
            <>
                <div className="row " style={{ border: '0px solid black', margin: '0px' }}>
                    <div className="col-md-3 col-sm-6" style={{ marginLeft: '0px', minWidth: '25%' }}>
                        <div className="col-md-12 card1">
                            <div>
                                <div className="card-icon">
                                    <svg ><use xlinkHref="#cow-icon" /></svg>
                                </div>
                                <div>
                                    <h6>Breeding Summary</h6>
                                    <select className="kgs-select">
                                        <option>month</option>
                                    </select><br /><br /><br />
                                    <p>
                                        <span className="score-text">Total Score</span>
                                        <span className="score-figure">100</span></p>
                                    <p>
                                        <span className="score-text">Total Score</span>
                                        <span className="score-figure">100</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 col-sm-6">
                        <div className="row">
                            <div className="col-md-4 col-sm-12 card_ lg_">
                                <div>
                                    <div className="card-icon">
                                        <svg ><use xlinkHref="#cow-icon" /></svg>
                                    </div>
                                    <div>
                                        <p>Total Cow</p>
                                        <p>100</p>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12 card_ lg_1">
                                <div>
                                    <div className="card-icon">
                                        <svg ><use xlinkHref="#bull" /></svg>
                                    </div>
                                    <div>
                                        <p>Total Bull</p>
                                        <p>100</p>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12 card_ lg_2">
                                <div>
                                    <div className="card-icon">
                                        <svg ><use xlinkHref="#sperm-svg-icon" /></svg>
                                    </div>
                                    <div>
                                        <p>Total Semen</p>
                                        <p>100</p>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12 card_ lg_3">
                                <div>
                                    <div className="card-icon">
                                        <svg ><use xlinkHref="#cow-icon" /></svg>
                                    </div>
                                    <div>
                                        <p>Pregnant Cow</p>
                                        <p>100</p>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12 card_ lg_4">
                                <div>
                                    <div className="card-icon">
                                        <svg ><use xlinkHref="#cow-icon" /></svg>
                                    </div>
                                    <div>
                                        <p>Total Bull</p>
                                        <p>100</p>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12 card_ lg_5">
                                <div>
                                    <div className="card-icon">
                                        <svg ><use xlinkHref="#cow-icon" /></svg>
                                    </div>
                                    <div>
                                        <p>Total Semen</p>
                                        <p>100</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

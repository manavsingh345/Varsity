function Awards() {
    return (
        <div>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-6 p-5'>
                        <img src="media/images/largestBroker.svg" alt="LargestBroker" />
                    </div>
                    <div className='col-6 p-5 mt-3'>
                        <h1>Largest stock broker in India</h1>
                        <p >2+ million Zerodha clients contribute to over 15% of all retail order volumes in India daily by trading and investing in:</p>
                        <div className='row p-5'>
                            <div className='col-6 '>
                                <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                                    <li>
                                        <p>Futures and Options</p>
                                    </li>
                                    <li>
                                        <p>Commodity derivatives</p>
                                    </li>
                                    <li>
                                        <p>Currency derivatives</p>
                                    </li>
                                </ul>
                            </div>
                            <div className='col-6'>

                                <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                                    <li>
                                        <p>Stock & IPOs</p>
                                    </li>
                                    <li>
                                        <p>Direct mutual funds</p>
                                    </li>
                                    <li>
                                        <p>Bonds and Govt. Securities</p>
                                    </li>


                                </ul>
                            </div>
                        </div>

                    <img src="media\images\pressLogos.png" alt="logos" style={{width:"90%"}} />
                    </div>
                </div>
            </div>

        </div>

    )
}
export default Awards;
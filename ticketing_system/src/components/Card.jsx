import React from 'react'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'

export default function Card({ title, description, image }) {
    return (
        <div className="col-lg-4 col-md-6">
            <div className="hotel">
                <div className="hotel-img">
                    <img
                        src={image}
                        alt="Hotel 1"
                        className="img-fluid"
                    />
                </div>
                <h3><a href="#">{title}</a></h3>
                <div className="stars">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                </div>
                <p>{description}</p>
                <EventDetailItem
                    title='Tickets'
                    desc='23'
                />
                <EventDetailItem
                    title='Ticket Price'
                    desc='450'
                />
                <EventDetailItem
                    title='Event Ending At'
                    desc='12/15/15'
                />
                <PrimaryButton
                    btnTitle='Buy Tickets'
                    className='p-2 w-100 rounded-1  '
                    bodyClass='m-3'
                />
            </div>
        </div>
    )
}

const EventDetailItem = ({ title = "", desc = "" }) => {
    return (
        <div className='d-flex justify-content-between '>
            <p><strong>{title}</strong></p>
            <p>{desc}</p>
        </div>
    )
}

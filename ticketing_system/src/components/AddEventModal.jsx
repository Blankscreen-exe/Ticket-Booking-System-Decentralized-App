import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PrimaryButton from './PrimaryButton';
import TextInputComp from './TextInputComp';
import { Row } from 'react-bootstrap';
import { appLogger } from '../../helpers/common';
import { UploadFile } from '../api/ApiMethods';
import { addEvent } from '../../helpers/contractInteraction';

export default function AddEventModal(props) {
  const { onHide } = props

  const [event, setEvent] = useState({
    event_img: null,
    img_url: "",
    title: "",
    description: "",
    ticket_count: 0,
    ticket_price: 0,
    event_end_time: "",
  })

  const handleChange = (value, key) => {
    setEvent({ ...event, [key]: value })
  }

  useEffect(() => {
    console.log("event", event);
  }, [event])

  const handleEventImage = (file) => {
    console.log("file", file);

    setEvent({
      ...event,
      event_img: file,
      img_url: URL.createObjectURL(file)
    })
    uploadImage(file)
  }

  const uploadImage = (selectedFile) => {
    UploadFile(selectedFile)
  }


  const handleAddEvent = () => {
    const body = {
      imgUrl: "",
      title: "",
      description: "",
      ticketCount: "",
      isActive: "",
      ticketPrice: "",
      eventStartTime: "",
      eventEndTime: "",
      from: ""
    }
    addEvent(body)
      .then((resp) => {
        appLogger("add event resp", resp)
      })
      .catch((error) => {
        appLogger("add event error", error)
      })
  }


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Event
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <section id="contact" className="section-bg wow fadeInUp">
          <div className="form">
            <form action="" method="post" role="form" className="   ">
              <Row>
                <TextInputComp
                  className='col-sm-12  col-md-6 col-lg-6'
                  placeholder='Title'
                  type='text'
                  value={event.title}
                  onChange={(e) => handleChange(e, "title")}
                />
                <TextInputComp
                  className='col-sm-12  col-md-6 col-lg-6'
                  placeholder='Description'
                  type='text'
                  value={event.description}
                  onChange={(e) => handleChange(e, "description")}
                />
                <TextInputComp
                  className='col '
                  placeholder='Ticket Price (ETH)'
                  type='number'
                  value={event.ticket_price}
                  onChange={(e) => handleChange(e, "ticket_price")}
                />
                <TextInputComp
                  className='col '
                  placeholder='Tickets Quantity'
                  type='number'
                  value={event.ticket_count}
                  onChange={(e) => handleChange(e, "ticket_count")}
                />
              </Row>
              <TextInputComp
                className='col '
                placeholder='End Date'
                type='datetime-local'
                value={event.event_end_time}
                onChange={(e) => handleChange(e, "event_end_time")}
              />
              <TextInputComp
                className='col '
                placeholder='Select Image'
                type='file'
                // value={event.event_img}
                onChange={(e) => handleEventImage(e)}
              />

              {event.img_url &&
                <div className='w-100'>
                  <img
                    className='  '
                    style={{ width: "200px", height: "200px", objectFit: "cover", alignSelf: 'center' }}
                    src={event.img_url}
                  />
                </div>
              }
            </form>
          </div>
        </section>

      </Modal.Body>
      <Modal.Footer>
        <PrimaryButton
          className="bg-dark "
          btnTitle={"Close"}
          handleOnClick={onHide}
        />
        <PrimaryButton
          btnTitle={"Add"}
          handleOnClick={() => {
            handleAddEvent()
          }}
        />
      </Modal.Footer>
    </Modal>
  );
}
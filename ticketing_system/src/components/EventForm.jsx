import React, {useState} from 'react'
import PropTypes from 'prop-types'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function EventForm(props) {
    const [formData, setFormData] = useState({})

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({
          ...formData,
          [name]: value,
        });
        console.log(formData)
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        console.log("button clicked!")
        console.log(event.target)

        // try {
        //   const accounts = await web3.eth.getAccounts();
        //   await contract.methods
        //     .addEvent(id, imgUrl, title, description, isActive, ticketPrice)
        //     .send({ from: accounts[0] });
    
        //   // Event added successfully, you can add additional logic here.
        //   console.log('Event added successfully');
        // } catch (error) {
        //   console.error('Error adding event:', error);
        // }
      };

    return (
        <>
            <h2>Event Submission Form</h2>
            <Form onClick={(e) => {e.preventDefault();console.log(e.target.value); handleSubmit(e)} }>
                <Form.Group className="mb-3" controlId="formEventId" onChange={(e) => handleInputChange(e)}>
                    <Form.Label>ID: </Form.Label>
                    <Form.Control type="number" name="id" min={0 /*get min from*/} placeholder="Event ID" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEventTitle" onChange={(e) => handleInputChange(e)}>
                    <Form.Label>Title: </Form.Label>
                    <Form.Control type="text" name="title" min={0 /*get min from*/} placeholder="Event Title" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEventDescription" onChange={(e) => handleInputChange(e)}>
                    <Form.Label>Description: </Form.Label>
                    <Form.Control type="text" name="description" min={0 /*get min from*/} placeholder="Event Description" />
                    <Form.Text className="text-muted">
                    
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEventTicketCount" onChange={(e) => handleInputChange(e)}>
                    <Form.Label>Tickets Available: </Form.Label>
                    <Form.Control type="number" name="ticketCount" min={0 /*get min from*/} placeholder="Ticket Count" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEventTicketPrice" onChange={(e) => handleInputChange(e)}>
                    <Form.Label>Ticket Price (ETH): </Form.Label>
                    <Form.Control type="number" name="ticketPrice" min={0 /*get min from*/} placeholder="Ticket Price" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEventStartDate" onChange={(e) => handleInputChange(e)}>
                    <Form.Label>End Date: </Form.Label>
                    <Form.Control type="date" name="startDate" min={0 /*get min from*/} placeholder="Event Start Date time" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEventEndDate" onChange={(e) => handleInputChange(e)}>
                    <Form.Label>End Date: </Form.Label>
                    <Form.Control type="date" name="endDate" min={0 /*get min from*/} placeholder="Event End Date time" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit Event
                </Button>
            </Form>
        </>
    )
}

EventForm.propTypes = {}

export default EventForm

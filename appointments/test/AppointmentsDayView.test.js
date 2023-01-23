/**
 * @jest-environment jsdom
 */

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import { 
    Appointment, 
    AppointmentsDayView 
} from '../src/AppointmentsDayView';

describe('Appointment', () => {
    let container;
    let customer;
    beforeEach(() => {
        container = document.createElement('div');
    });
    const render = component => 
        ReactDOM.render(component, container);
    const today = new Date();
    it('renders the appointment header', () => {
        const startsAt = today.setHours(12, 0);
        render(<Appointment startsAt={startsAt} />);
        expect(
            container.querySelectorAll('th')[0].textContent
        ).toEqual('12:00');
    });
    it('renders the customer first name', () => {
        customer = { firstName: 'Ashley' };
        render(<Appointment customer={customer} />);
        expect(container.textContent).toMatch('Ashley');
    });
    it('renders the customer last name', () => {
        customer = { firstName: 'Ashley', lastName: 'Smith' };
        render(<Appointment customer={customer} />);
        expect(container.textContent).toMatch('Smith');
    });
    it('renders the customer phone number', () => {
        customer = { phoneNumber: '0452583334' };
        render(<Appointment customer={customer} />);
        expect(container.textContent).toMatch('0452583334');
    });
    it('renders the stylist name', () => {
        customer = { stylist: 'Jake' };
        render(<Appointment customer={customer} />);
        expect(container.textContent).toMatch('Jake');
    });
    it('renders the salon service', () => {
        customer = { service: 'Blow dry' };
        render(<Appointment customer={customer} />);
        expect(container.textContent).toMatch('Blow dry');
    });
    it('renders the notes', () => {
        customer = { notes: 'Allergic to nuts' };
        render(<Appointment customer={customer} />);
        expect(container.textContent).toMatch('Allergic to nuts');
    });
    it('renders another customer first name', () => {
        customer = { firstName: 'Jordan' };
        render(<Appointment customer={customer} />);
        expect(container.textContent).toMatch('Jordan');
    })
});

describe('AppointmentsDayView', () => {
    let container;

    const today = new Date();
    const appointments = [
        { 
            startsAt: today.setHours(12, 0),
            customer: { firstName: 'Ashley' }
        },
        {
            startsAt: today.setHours(13, 0),
            customer: { firstName: 'Jordan' }
        },
    ];

    beforeEach(() => {
        container = document.createElement('div');
    });

    const render = component =>
    ReactDOM.render(component, container);

    it ('renders a div with the right id', () => {
        render(<AppointmentsDayView appointments={[]} />);
        expect(container.querySelector('div#appointmentsDayView'))
            .not.toBeNull();
    });

    it('renders multiple appointments in an ol element', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.querySelector('ol')).not.toBeNull();
        expect(container.querySelector('ol').children
        ).toHaveLength(2);
    });

    it('renders each appointment in an li', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.querySelectorAll('li')).toHaveLength(2);
        expect(
            container.querySelectorAll('li')[0].textContent
        ).toEqual('12:00');
        expect(
            container.querySelectorAll('li')[1].textContent
        ).toEqual('13:00');
    });

    it('initially shows a message saying there are no appointments today', () => {
        render(<AppointmentsDayView appointments={[]} />);
        expect(container.textContent).toMatch(
            'There are no appointments scheduled for today.'
        );
    });
    
    it('selects the first appointment by default', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.textContent).toMatch('Ashley');
    });

    it('has a button element in each li', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(
            container.querySelectorAll('li > button')
        ).toHaveLength(2);
        expect(
            container.querySelectorAll('li > button')[0].type
        ).toEqual('button');
    });

    it('renders another appointment when selected', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        const button = container.querySelectorAll('button')[1];
        ReactTestUtils.Simulate.click(button);
        expect(container.textContent).toMatch('Jordan');
    })
});
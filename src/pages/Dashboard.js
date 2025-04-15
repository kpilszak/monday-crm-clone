import { useState, useEffect, useContext } from 'react'

import TicketCard from '../components/TicketCard'
import axios from 'axios'

const Dashboard = () => {
    const [tickets, setTickets] = useState(null)

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('http://localhost:8000/tickets');

                const dataObject = response.data.data;

                const arrayOfKeys = Object.keys(dataObject);
                const arrayOfData = Object.values(dataObject);

                const formattedArray = arrayOfKeys.map((key, index) => ({
                    ...arrayOfData[index],
                    documentId: key
                }));

                setTickets(formattedArray);
            } catch (error) {
                console.error('Failed to fetch tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    const colors = [
        'rgb(255,179,186)',
        'rgb(255,223,186)',
        'rgb(255,255,186)',
        'rgb(186,255,201)',
        'rgb(186,186,255)',
    ]

    const uniqueCategories = [
        ...new Set(tickets?.map(({ category }) => category))
    ]

    return (
        <div className="dashboard">
            <h1>My Projects</h1>
            <div className="ticket-container">
                {tickets && uniqueCategories?.map((uniqueCategory, categoryIndex) => {
                    return (
                        <div key={categoryIndex}>
                            <h3>{uniqueCategory}</h3>
                            {tickets
                                .filter(ticket => ticket.category === uniqueCategory)
                                .map((filteredTicket, ticketIndex) => (
                                    <TicketCard
                                        key={ticketIndex}
                                        id={ticketIndex}
                                        color={colors[categoryIndex] || colors[0]}
                                        ticket={filteredTicket}
                                    />
                                ))}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Dashboard
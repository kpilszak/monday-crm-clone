import { Link } from 'react-router-dom'
import AvatarDisplay from "./AvatarDisplay"
import StatusDisplay from "./StatusDisplay"
import PriorityDisplay from "./PriorityDisplay"
import ProgressDisplay from "./ProgressDisplay"
import DeleteBlock from "./DeleteBlock"

const TicketCard = ({ color, ticket }) => {
    return (
        <div className="ticket-card">
            <Link to={`/ticket/${ticket.documentId}`} id="link">
                <div className="ticket-color" style={{backgroundColor: color}}></div>
                <h3>{ticket.title}</h3>
                <AvatarDisplay ticket={ticket}/>
                <StatusDisplay status={ticket.status}/>
                <PriorityDisplay priority={ticket.priority}/>
                <ProgressDisplay progress={ticket.progress}/>
            </Link>
            <DeleteBlock documentId={ticket.documentId} />
        </div>
    )
}

export default TicketCard
import react from 'react'
import propType from 'prop-types'
import { Link } from 'react-router-dom'
const ProfileItem = ({ profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills }
}) => {
    return (
        <div className="profile bg-light">
            <img src={avatar} className="round-img"></img>
            <div>
                <h2>{name}</h2>
                <p>{status} {company && <span> at {company}</span>}</p>
                <p className="my-1">{location && <span> at {location} </span>}</p>
                <Link to={`/profile`} />
            </div>
            text
        </div>
    )
}
ProfileItem.propType = {

}

export default ProfileItem
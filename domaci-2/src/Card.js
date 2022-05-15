import React, { useState } from 'react';

function Card(props) {

    //const notClickedURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/768px-React-icon.svg.png";
    const notClickedURL = "https://brandlogos.net/wp-content/uploads/2020/09/react-logo.png";
    const imageURL = props.cardInfo.image_url;
    const id = props.cardInfo.id;
    const position = props.position;
    const isClicked = props.cardInfo.open;
    const isOver = props.over;

    function handleClick() {
        if (!isOver) {
            props.handleClick(id, position);
        }
    }

    return (
        <div className='card' style={{width:"180px",height:"180px"}}>
            <div className="image" onClick={handleClick}>
                <img src={isClicked ? imageURL : notClickedURL} />
            </div>
        </div>
    );
}

export default Card
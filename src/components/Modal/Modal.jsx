import React from 'react'
import ReactPlayer from "react-player";
import { Modal } from "react-bootstrap";
// import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";

const Modals = (props) => {
    const youtubeUrl = "https://www.youtube.com/watch?v=";
    console.log(youtubeUrl+props.video)
    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title
                    id="contained-modal-title-vcenter"
                    style={{ color: "#000000", fontWeight: "bolder" }}
                >
                    {props.detail}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "#000000" }}>
                <ReactPlayer
                    className="container-fluid"
                    url={youtubeUrl + props.video}
                    playing
                    controls={true}
                    width="100%"
                ></ReactPlayer>
            </Modal.Body>
        </Modal>
    )
}

export default Modals;

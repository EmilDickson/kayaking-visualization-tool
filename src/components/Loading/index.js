import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => (
    <div className="loadingContainer">
        <Spinner animation="grow" />
    </div>
)

export default Loading;
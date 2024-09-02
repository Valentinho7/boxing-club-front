import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import planningImage1 from '../img/planning-adulte.jpg'; 
import planningImage2 from '../img/planning-enfant.jpg'; 

function PlanningController() {
    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12 mb-4">
                    <img src={planningImage1} alt="Planning Adulte" className="img-fluid" />
                </div>
                <div className="col-12 mb-4">
                    <img src={planningImage2} alt="Planning Enfant" className="img-fluid" />
                </div>
            </div>
        </div>
    );
}

export default PlanningController;
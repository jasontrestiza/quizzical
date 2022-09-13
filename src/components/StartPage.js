import React from "react"

export default function StartPage(props){

    return (

        <div className="starting-page">
            <h1>Quizzical</h1>
            <p className="title-description">Test your knowledge with random questions.</p>
            <button className="primary-btn" onClick={props.createQuiz}>Proceed</button>
        </div>

    )
}
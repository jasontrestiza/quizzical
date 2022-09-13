import React from "react"
import he from "he"

export default function Quizzical({id,question,selectedAnswer,isFinished,question_number}){

    const[answerChosen,setAnswerChosen] = React.useState('')
    const [isHovering,setIsHovering] = React.useState(false)

    function handleMouseOver(){
        setIsHovering(true)
    }
    function handleMouseOut(){
        setIsHovering(false)
    }

    const choicesElements = question.answers.map((answer,index) => {
        
        const backgroundStyle = {
            backgroundColor: '',
        }

        if(answer === answerChosen && !isFinished){
            backgroundStyle.backgroundColor = '#D6DBF5'
        }
        else if(answer === question.correctAnswer && isFinished){
            backgroundStyle.backgroundColor = '#94D7A2'
          
        }
        else if(answer === answerChosen && question.correctAnswer !== answerChosen && isFinished){
            backgroundStyle.backgroundColor = '#F8BCBC'    
        }
      
        return (
            <p 
                key={index} 
                className={isHovering ? 'quiz-answers quiz-answers:hover' : 'quiz-answers'} 
                style={backgroundStyle} 
                onClick = {() => storeAnswer(answer)} 
                onMouseOver={handleMouseOver} 
                onMouseOut={handleMouseOut}> 
                {he.decode(answer)}
            </p>
        )
    })
 
    function storeAnswer(answer){
        setAnswerChosen(answer)
        selectedAnswer(id,answer)
    }

    return(
        <div className="quiz-content">
            <h4>{question_number}.)  {he.decode(question.question)}</h4>
            {choicesElements} 
        </div>
    )
}
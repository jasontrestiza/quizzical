import React from "react"
import Quizzical from "./components/Quizzical"
import StartPage from "./components/StartPage"
import QuizSettings from "./components/QuizSettings"
import {nanoid} from "nanoid"


export default function App(){
    
    const [isStarting,setIsStarting] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const [totalScore, setTotalScore] = React.useState(0)
    const [loading,setLoading] = React.useState(false)
    const [isFinished,setIsFinished] = React.useState(false)
    const [isSetting,setIsSetting] = React.useState(false)

    const [formData,setFormData] = React.useState({
        numberOfItems: 1,
        quizCategory: "",
        quizDifficulty: "",
        quizType: ""

    })
    
    React.useEffect(() => {
        if(!isStarting){
            return;
        }
        fetch("https://opentdb.com/api.php?amount="+formData.numberOfItems+"&category="+formData.quizCategory+"&difficulty="+formData.quizDifficulty+"&type="+formData.quizType)
        .then(res => res.json())
        .then(data => {
            setQuestions(data.results.map((items,index) => {
                const {question,incorrect_answers,correct_answer} = items
                const answers = incorrect_answers.slice()
            
                function random(arr){
                    return Math.floor(Math.random() * arr.length)
                }
                answers.splice(random(incorrect_answers), 0, correct_answer)
                setLoading(false)
            
                return {
                    id: nanoid(),
                    question_number:  index+1,
                    question: question,
                    answers: answers,
                    correctAnswer: correct_answer,
                    selectedAnswer: ''
                }
            }))
        })
        .catch(error => console.error('No Data found',error))  
    },[isSetting])
 


   function handleChange(event){
        const {name,value} = event.target

        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
   }

   function checkNumberOfQuestions(event){
        const {name} = event.target
        if(name === "numberOfItems"){
            if(formData.numberOfItems > 50){
                alert("Your inputted number of questions are exceeded the maximum number of questions.")
                
                setFormData(prevFormData => {
                    return {
                        ...prevFormData,
                        numberOfItems: 1
                    }
                })
            }
        }
   }

   function createSetting(){
         setIsSetting(true)
    }
   
    const questionList = questions.map(items => {
        return <Quizzical
                    key = {items.id}
                    id = {items.id}
                    question = {items}
                    selectedAnswer = {answerSelector}
                    isFinished = {isFinished}
                    question_number={items.question_number}
                    // review = {review}
                />
    })

   function answerSelector(id,answer){
        setQuestions(prevQuestion => prevQuestion.map(holder => {
            return holder.id === id ?
                {...holder, selectedAnswer: answer} :
                holder
        }))
   }
 
   function createQuiz(){
        setIsStarting(true)
        setLoading(true)
   }



   function checkAnswer(){
        for(const question of questions){
            if(question.correctAnswer === question.selectedAnswer){
                setTotalScore(prevScore => prevScore + 1)
            }
        }
        setIsFinished(true)
   }


   function restartQuiz(){
        setIsStarting(false)
        setQuestions([])
        setTotalScore(0)
        setLoading(false)
        setIsFinished(false)
        setIsSetting(false)
        setFormData(prevData => {
            return {
                numberOfItems: 1,
                quizCategory: "",
                quizDifficulty: "",
                quizType: ""
            }
        })
   }

    return(
        <main>
            {!isStarting && <StartPage createQuiz ={createQuiz} />}
            {isStarting && !isSetting && <QuizSettings 
                                value= {formData.numberOfItems} 
                                handleChange={handleChange}
                                checkNumberOfQuestions={checkNumberOfQuestions}
                                name={formData.numberOfItems}
                                formData={formData}
                                submitSetting={createSetting}
                                />
                                }
            {isStarting && isSetting &&
                <div className="main-quiz">
                    {questionList}
                    {!isFinished && !loading &&
                        <button className="secondary-btn margin-btn" onClick={checkAnswer}>Check Answers</button>
                    }
                    {
                      isFinished && 
                      <p className="summary-score">You scored {totalScore}/{formData.numberOfItems} correct answers 
                      <button className="secondary-btn" onClick={restartQuiz}>Play Again </button>
                      </p> 
                    }
                </div>
            }     
        </main>
    )
}
import React from "react"

export default function QuizSettings({formData, handleChange, checkNumberOfQuestions, submitSetting}){
    return(
        <div className="quiz-settings">
            
                <label htmlFor="numberOfItems">Number of Questions: <small>(Maximum of 50 Questions)</small></label>
                <br/>
                <input 
                    type="number" 
                    name="numberOfItems" 
                    min= "1" 
                    max ="50" 
                    step="1" 
                    value= {formData.numberOfItems > 50 ? "" : formData.numberOfItems}
                    onChange={handleChange}
                    onKeyUp={checkNumberOfQuestions}>
                </input>
                <br/>

                <label htmlFor="quizCategory">Select Category:</label>
                <br/>
                <select 
                    id="quizCategory"
                    value={formData.quizCategory}
                    onChange={handleChange}
                    name="quizCategory"
                >
                    <option value="">Any Category</option>
                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="11">Entertainment: Films</option>
                    <option value="12">Entertainment: Music</option>
                    <option value="13">Entertainment: Musicals and Theatres</option>
                    <option value="14">Entertainment: Television</option>
                    <option value="15">Entertainment: Video Games</option>
                    <option value="16">Entertainment: Board Games</option>
                    <option value="29">Entertainment: Comics</option>
                    <option value="31">Entertainment: Japanese Anime and Manga</option>
                    <option value="32">Entertainment: Cartoon and Animations</option>
                    <option value="17">Science and Nature </option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="30">Science: Gadgets</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                </select>
                <br/>
                <label htmlFor="quizDifficulty">Select Difficulty:</label>
                <br/>
                <select
                    id="quizDifficulty"
                    value={formData.quizDifficulty}
                    name="quizDifficulty"
                    onChange={handleChange}
                >
                    <option value="">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>

                </select>
                <br/>
                <label htmlFor="quizType">Select Difficulty:</label>
                <br/>
                <select
                    id="quizType"
                    value={formData.quizType}
                    name="quizType"
                    onChange={handleChange}
                >
                    <option value="">Any Type</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True/False</option>

                </select>
                <br/>
                
                <button className="secondary-btn margin-btn" onClick={submitSetting}>Start Quiz</button>
        </div>
    )
}
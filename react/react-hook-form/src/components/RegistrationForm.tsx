import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

type PersonDetails = {
    name: string,
    email: string,
    scores: number[]
}

export const RegistrationForm = () => {
    const { register, handleSubmit, errors, control } = useForm<PersonDetails>();
    const { fields, append, remove } = useFieldArray({ control, name: 'scores' })

    const onSubmit = (data: PersonDetails) => {
        console.log('Details', data)
    }

    if (fields.length === 0) {
        append({})
    }

    //synchronous validation
    const isEven = (score: number) => score % 2 === 0;

    //asynchronous validation
    const emailIsUnique = async (email: string) => {
        await wait(1000)
        return email !== 'someoneexaple@com'
    }

    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
                <label htmlFor="name" >Name</label>
                <input type="text" name="name" id="name" ref={register({ required: true })} />
                {errors.name && errors.name.type === 'required' && (
                    <div className="error">You must enter your Name.</div>
                )}
            </div>
            <div className="field">
                <label htmlFor="email" >Eamil</label>
                <input type="text" name="email" id="email" ref={register({ required: true, validate: emailIsUnique })} />
                {errors.email && errors.email.type === 'required' && (
                    <div className="error"> You must enter your Email.</div>
                )}
                {
                    errors.email && errors.email.type === "validate" && (
                        <div className="error">This email address already exists</div>
                    )}
            </div>
            {fields.map((score, index) => (
                <div key={score.id}>
                    <div className="field">
                        <label htmlFor={`score[${index}`}>
                            Score {`${index + 1}`}
                        </label>
                        <input
                            type="number"
                            id={`score[${index}]`}
                            name={`score[${index}]`}
                            ref={register({
                                required: true,
                                min: 0,
                                max: 100,
                                validate: isEven
                            })}
                        />
                        {
                            errors.scores &&
                            errors.scores[index] &&
                            errors.scores[index].type === "required" && (
                                <div className="error">
                                    Your must enter your score.
                                </div>
                            )
                        }
                        {
                            errors.scores &&
                            errors.scores[index] &&
                            errors.scores[index].type === "min" && (
                                <div className="error">
                                    Your score must be at least 0
                                </div>
                            )
                        }
                        {
                            errors.scores &&
                            errors.scores[index] &&
                            errors.scores[index].type === "max" && (
                                <div className="error">
                                    Your score must be no more than 100
                                </div>
                            )
                        }
                        {
                            errors.scores &&
                            errors.scores[index] &&
                            errors.scores[index].type === "validate" && (
                                <div className="error">
                                    Your score must be and even number
                                </div>
                            )
}
                        <button 
                            className = "remove"
                            onClick = {(e: React.MouseEvent)=>{
                                e.preventDefault()
                                remove(index)
                            }}
                        >Remove</button> 

                        <button 
                            className = "add"
                            onClick = {(e:React.MouseEvent) =>{
                                e.preventDefault()
                                append({})
                            }}   
                          >Add score</button>  
                    </div>
                </div>


            ))}




            <button type="submit"> Save </button>
        </form>
    )
}

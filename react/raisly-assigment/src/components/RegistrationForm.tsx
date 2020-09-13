import React from 'react';
import { useForm } from 'react-hook-form';
import { validateEmailRequest } from '../apis/ValidateEmailIdApi';
import { signupApiRequest } from '../apis/SignUpFormApi';


type ISignUpForm = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}


export default function RegistrationForm() {

    const { register, handleSubmit, errors } = useForm<ISignUpForm>();
    const [displayFormStatus, setDisplayFormStatus] = React.useState(false)
    const createNewUser = async (data: ISignUpForm) => {
        try {

            const submissionResponse = await signupApiRequest(data)
            console.log('response', submissionResponse)
            if (submissionResponse) {
                // setFormStatus(formStatusProps.success)
            }
        } catch (error) {
            const response = error
        } finally {
            setDisplayFormStatus(true)
        }
    }


    //asynchronous validation
    const emailIsUnique = async (email: string) => {
        let isUnqiue = false
        try {
            const response = await validateEmailRequest(email)

            if (response.data?.status === 'OK') {
                isUnqiue = true
            }
        } catch (error) {
            console.log('Server Error', error)
        }

        return isUnqiue
    }

    return (

        <form onSubmit={handleSubmit(createNewUser)}>
            <div className="field">
                <label htmlFor="firstName" >FirstName</label>
                <input type="text" name="firstName" id="firstName" ref={register({ required: true })} />
                {errors.firstName && errors.firstName.type === 'required' && (
                    <div className="error">You must enter your FirstName.</div>
                )}
            </div>

            <div className="field">
                <label htmlFor="lastName" >LastName</label>
                <input type="text" name="lastName" id="lastName" ref={register({ required: true })} />
                {errors.lastName && errors.lastName.type === 'required' && (
                    <div className="error">You must enter your LastName.</div>
                )}
            </div>

            <div className="field">
                <label htmlFor="email" >Eamil</label>
                <input type="text" name="email" id="email" ref={register({ required: true})} />
                {errors.email && errors.email.type === 'required' && (
                    <div className="error"> You must enter your Email.</div>
                )}
                {
                    errors.email && errors.email.type === "validate" && (
                        <div className="error">This email address has already been registered.</div>
                    )}

            </div>
            <div className="field">
                <label htmlFor="password" >Password</label>
                <input type="text" name="password" id="password" ref={register({ required: true })} />
                {errors.password && errors.password.type === 'required' && (
                    <div className="error"> You must enter your Password.</div>
                )}


            </div>
            <button type="submit"> Save </button>
        </form>

    )
}

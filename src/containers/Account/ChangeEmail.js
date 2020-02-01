import React from 'react'
import Shell from './Shell'
import {
    Form,
    Input,
    Message,
    Header,
    Button,
    Label,
    Segment,
} from 'semantic-ui-react'
import { authAxios } from '../../utils'
import { changeEmailURL, emailURL } from '../../constants'


class ChangeEmail extends React.Component {
    state = {
        currentEmail: '',
        newEmail: '',
        confirmEmail: '',
        error: null,
        loading: false,
    }

    componentDidMount() {
        this.handleUserDetails()
    }

    handleUserDetails = () => {
        this.setState({
            loading: true,
        })

        authAxios.get(emailURL).then(res => {
            this.setState({
                loading: false,
                currentEmail: res.data.email
            })
        })
            .catch(err => {
                this.setState({
                    loading: false,
                    error: err.response.data.message
                })
            })
    }

    handleChange = e => {
        this.setState({
            /* values shown when typed at input box */
            [e.target.name]: e.target.value,
            error: null,
        })
    }

    handleSubmit = e => {
        /* prevent page from reloading */
        e.preventDefault()
        this.setState({
            loading: true,
        })
        /* check both emails match */
        const { newEmail, confirmEmail } = this.state
        if (newEmail !== '' && confirmEmail !== '') {
            if (newEmail === confirmEmail) {
                /* call api, uses ChangeEmailView */
                authAxios.post(changeEmailURL, {
                    /* backend server must take and serialize variable in this format:
                     confirm_email */
                    email: newEmail,
                    confirm_email: confirmEmail
                })
                    .then(res => {
                        this.setState({
                            loading: false,
                            /* set form to be empty */
                            newEmail: '',
                            confirmEmail: '',
                            /* update the user's email */
                            currentEmail: newEmail,
                        })
                    })
                    .catch(err => {
                        this.setState({
                            loading: false,
                            error: err.response.data.message
                        })
                    })
            }
            else {
                this.setState({
                    error: 'Emails DO NOT match',
                    loading: false
                })
            }
        }
        else {
            this.setState({
                error: 'Please complete all form fields',
                loading: false
            })
        }
    }

    render() {

        const { currentEmail, newEmail, confirmEmail, error, loading } = this.state

        return (
            < Shell >
                <Segment>
                    <Header as='h4'>Change Email</Header>
                    <Form onSubmit={this.handleSubmit} error={error !== null}>
                        <Form.Field>
                            <Label size='large' pointing='below' color='blue'>Current Email </Label>
                            <Input value={currentEmail} disabled />
                        </Form.Field>
                        <Form.Field required>
                            <Label size='large' pointing='below' color='blue'>New Email </Label>
                            <Input value={newEmail} placeholder='New Email'
                                type='email' name='newEmail'
                                onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field required>
                            <Label size='large' pointing='below' color='blue'>Confirm New Email </Label>
                            <Input value={confirmEmail} placeholder='Confirm Email'
                                type='email' name='confirmEmail'
                                onChange={this.handleChange} />
                        </Form.Field>
                        {error &&
                            <Message error heading='Error occurred' content={error} />
                        }

                        <Button primary
                            type='submit'
                            loading={loading}
                            disabled={loading} >Submit</Button>
                    </Form>
                </Segment>
            </Shell >
        )
    }
}


export default ChangeEmail
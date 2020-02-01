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
import { changePasswordURL } from '../../constants'


class ChangePassword extends React.Component {
    state = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        error: null,
        loading: false,
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
        /* check both passwords match */
        const { newPassword, confirmPassword, currentPassword } = this.state
        if (newPassword !== '' && confirmPassword !== '') {
            if (newPassword === confirmPassword) {
                /* call api, uses ChangePasswordView */
                authAxios.post(changePasswordURL, {
                    /* backend server must take and serialize variable in this format:
                     confirm_password */
                    current_password: currentPassword,
                    password: newPassword,
                    confirm_password: confirmPassword
                })
                    .then(res => {
                        this.setState({
                            loading: false,
                            /* set form to be empty */
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: '',
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
                    error: 'Passwords DO NOT match',
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

        const { currentPassword, newPassword, confirmPassword, error, loading } = this.state

        return (
            < Shell >
                <Segment>
                    <Header as='h4'>Change Password</Header>
                    <Form onSubmit={this.handleSubmit} error={error !== null}>
                        <Form.Field required>
                            <Label size='large' pointing='below' color='blue'>Current Password </Label>
                            <Input value={currentPassword} placeholder='Current Password'
                                type='password' name='currentPassword'
                                onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field required>
                            <Label size='large' pointing='below' color='blue'>New Password </Label>
                            <Input value={newPassword} placeholder='New Password'
                                type='password' name='newPassword'
                                onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field required>
                            <Label size='large' pointing='below' color='blue'>Confirm New Password </Label>
                            <Input value={confirmPassword} placeholder='Confirm Password'
                                type='password' name='confirmPassword'
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


export default ChangePassword
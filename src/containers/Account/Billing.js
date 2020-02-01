import React from 'react'
import {
    Segment,
    Header,
    Divider,
    Icon,
    Dimmer,
    Loader,
    Image,
    Form,
    Button

} from 'semantic-ui-react'
import Shell from './Shell'
import imagePlaceHolder from '../../assets/images/facialrecognition.jpg'
import { authAxios } from '../../utils'
import { billingURL } from '../../constants'


class Billing extends React.Component {

    state = {
        error: null,
        loading: false,
        billingDetails: {},
    }

    componentDidMount() {
        this.handleUserDetails()
    }

    handleUserDetails = () => {
        this.setState({
            loading: true,
        })

        authAxios.get(billingURL).then(res => {
            this.setState({
                loading: false,
                billingDetails: res.data
            })
        })
            .catch(err => {
                this.setState({
                    loading: false,
                    error: err.response.data.message
                })
            })
    }

    renderBillingDetails(details) {
        const free_trial = 'free_trial'
        const member = 'member'
        const not_member = 'not_member'

        return (
            <Segment>
                <Header as='h3'>Monthly Summary</Header>
                {details.membershipType === free_trial ? (
                    <React.Fragment>
                        <p>
                            Your free trial ends on June 19 2020
                        </p>
                        <p>
                            API requests amount this month: 20
                        </p>
                    </React.Fragment>
                )
                    :
                    details.membershipType === member ? (
                        < React.Fragment >
                            <p>
                                Next billing date: 25 June 2019
                            </p>
                            <p>
                                API requests amount this month: 20
                            </p>
                            <p>
                                Amount Due: $20
                            </p>
                        </React.Fragment>
                    )
                        : details.membershipType === not_member ? (
                            < React.Fragment >
                                <p>
                                    Your free trial has ended
                                </p>
                                <Form>
                                    <Form.Field>
                                        <input placeholder='card details' />
                                    </Form.Field>
                                </Form>
                            </React.Fragment>
                        )
                            : null
                }
            </Segment>
        )
    }


    render() {

        const { error, loading, billingDetails } = this.state

        return (
            <Shell>
                {/* if there's an error */}
                {error && (
                    <Segment placeholder>
                        <Header icon><Icon name='rocket' />
                            Could not fetch account details. Try reloading the page
                        </Header>
                        {/* a tag is used to reload the page */}
                        <a href='/account/billing/'>
                            <Button primary>
                                Reload
                        </Button>
                        </a>

                    </Segment>
                )}
                {/* if loading */}
                {loading && (
                    <Segment>
                        <Dimmer active inverted>
                            <Loader inverted>
                                Face Recognition
                            </Loader>
                        </Dimmer>
                        <Image src={imagePlaceHolder} />
                    </Segment>
                )}
                {billingDetails && (
                    this.renderBillingDetails(billingDetails)
                )}
            </Shell>
        )
    }
}

export default Billing
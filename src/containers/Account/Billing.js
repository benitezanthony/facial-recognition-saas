import React from 'react'
import {
    Segment,
    Header,
    Icon,
    Dimmer,
    Loader,
    Image,
    Button,
    Modal,
    Divider
} from 'semantic-ui-react'
import Shell from './Shell'
import imagePlaceHolder from '../../assets/images/imagePlaceHolder.png'
import { authAxios } from '../../utils'
import { billingURL, cancelSubscriptionURL } from '../../constants'
import SubscribeForm from './SubscribeForm'

class Billing extends React.Component {

    state = {
        error: null,
        loading: false,
        billingDetails: {},
        open: false,
    }

    componentDidMount() {
        this.handleUserDetails()
    }

    show = (size) => () => this.setState({ size, open: true })
    close = () => this.setState({ open: false })

    handleUnsubscribe = () => {
        this.setState({
            error: null,
            loading: true,
        })
        authAxios.post(cancelSubscriptionURL)
            .then(res => {
                this.setState({
                    loading: false,
                })
                /* closes the modal */
                this.close()
                /* reload profile information */
                this.handleUserDetails()
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.message,
                    loading: false,
                })
            })
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
                            {/* Used to created blank space 
                            Use \xa0 - it is a NO-BREAK SPACE char.*/}
                            Your free trial ends on: {'\xa0'}
                            <b>
                                {new Date(details.free_trial_end_date).toDateString()}
                            </b>
                        </p>
                        <p>
                            {/* Used to created blank space 
                            Use \xa0 - it is a NO-BREAK SPACE char.*/}
                            API requests amount this month: {'\xa0'}
                            <b>
                                {details.api_request_count}
                            </b>
                        </p>
                        <SubscribeForm handleUserDetails={this.handleUserDetails} />
                    </React.Fragment>
                )
                    :
                    details.membershipType === member ? (
                        < React.Fragment >
                            <p>
                                {/* Used to created blank space 
                                Use \xa0 - it is a NO-BREAK SPACE char.*/}
                                Next billing date: {'\xa0'}
                                <b>
                                    {new Date(details.next_billing_date).toUTCString()}
                                </b>
                            </p>
                            <p>
                                {/* Used to created blank space 
                                Use \xa0 - it is a NO-BREAK SPACE char.*/}
                                API requests amount this month: {'\xa0'}
                                <b>
                                    {details.api_request_count}
                                </b>
                            </p>
                            <p>
                                Amount Due: {'\xa0'}
                                <b>
                                    $ {details.amount_due}
                                </b>
                            </p>
                            <Divider />
                            <Button onClick={this.show('mini')}>Cancel Subscription</Button>

                        </React.Fragment>
                    )
                        : details.membershipType === not_member ? (
                            < React.Fragment >
                                <p>
                                    Your free trial has ended
                                </p>
                                <SubscribeForm handleUserDetails={this.handleUserDetails} />
                            </React.Fragment>
                        )
                            : null
                }
            </Segment>
        )
    }


    render() {

        const { error, loading, billingDetails, open, size } = this.state

        return (
            <React.Fragment>
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
                                <Loader />
                            </Dimmer>
                            <Image src={imagePlaceHolder} />
                        </Segment>
                    )}
                    {billingDetails && (
                        this.renderBillingDetails(billingDetails)
                    )}
                </Shell>

                <Modal size={size} open={open} onClose={this.close}>
                    <Modal.Header>Cancel your Subscription</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to cancel your subscription?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.close}>No</Button>
                        <Button
                            positive
                            icon='checkmark'
                            labelPosition='right'
                            content='Yes'
                            onClick={this.handleUnsubscribe}
                        />
                    </Modal.Actions>
                </Modal>
            </React.Fragment>

        )
    }
}

export default Billing

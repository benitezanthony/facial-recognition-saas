import {
    Segment,
    Header,
    Icon,
    Dimmer,
    Loader,
    Image,
    Button,
    Message
} from 'semantic-ui-react'
import React from 'react'
import Shell from './Shell'
import { authAxios } from '../../utils'
import { APIkeyURL } from '../../constants'
import imagePlaceHolder from '../../assets/images/imagePlaceHolder.png'


class APIKey extends React.Component {

    state = {
        loading: false,
        error: null,
        keys: []
    }


    componentDidMount() {
        this.handleUserDetails()
    }

    handleUserDetails = () => {
        this.setState({
            loading: true,
        })

        authAxios.get(APIkeyURL).then(res => {
            this.setState({
                loading: false,
                keys: res.data
            })
        })
            .catch(err => {
                this.setState({
                    loading: false,
                    error: err.response.data.message
                })
            })
    }

    render() {
        const { loading, error, keys } = this.state

        return (
            <Shell>
                {error && <Message error header='Error occurred' content={error} />}
                {/* if loading */}
                {loading && (
                    <Segment>
                        <Dimmer active inverted>
                            <Loader />
                        </Dimmer>
                        <Image src={imagePlaceHolder} />
                    </Segment>
                )}
                {keys &&
                    <Segment>
                        <Header as='h3'>
                            API Key
                        </Header>
                        {/* map each key, k */}
                        {keys.map(k => {
                            return (
                                <p key={k.pk}>
                                    <b>
                                        {k.key}
                                    </b>
                                </p>
                            )
                        })}

                    </Segment>
                }
            </Shell>
        )
    }
}

export default APIKey
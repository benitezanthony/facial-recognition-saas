import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
    Button,
    Container,
    Menu,
    Responsive,
    Segment,
    Visibility,
} from 'semantic-ui-react'
import { getWidth } from '../../utils'
import { withRouter } from "react-router-dom"
import { logout } from "../../store/actions/auth"
import { connect } from "react-redux";



/* const HomepageHeading = ({ mobile }) => (
    <Container text>
        <Header
            as='h1'
            content='Imagine-a-Company'
            inverted
            style={{
                fontSize: mobile ? '2em' : '4em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: mobile ? '1.5em' : '3em',
            }}
        />
        <Header
            as='h2'
            content='Do whatever you want when you want to.'
            inverted
            style={{
                fontSize: mobile ? '1.5em' : '1.7em',
                fontWeight: 'normal',
                marginTop: mobile ? '0.5em' : '1.5em',
            }}
        />
        <Button primary size='huge'>
            Get Started
      <Icon name='right arrow' />
        </Button>
    </Container>
)

HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
} */

class DesktopContainer extends Component {
    state = {}

    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })

    render() {
        const { children, isAuthenticated } = this.props
        const { fixed } = this.state

        return (
            <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
                <Visibility
                    once={false}
                    onBottomPassed={this.showFixedMenu}
                    onBottomPassedReverse={this.hideFixedMenu}
                >
                    <Segment
                        inverted
                        textAlign='center'
                        style={{ padding: '1em 0em' }}
                        vertical
                    >
                        <Menu
                            fixed={fixed ? 'top' : null}
                            inverted={!fixed}
                            pointing={!fixed}
                            secondary={!fixed}
                            size='large'
                        >
                            <Container>
                                <Menu.Item
                                    // used to underline menu item, requires withRouter
                                    active={this.props.location.pathname === '/'}
                                    // can use this because we wrapped DesktopContainer "withRouter"
                                    onClick={() => this.props.history.push('/')}>
                                    Home
                                </Menu.Item>
                                <Menu.Item
                                    // used to underline menu item, requires withRouter
                                    active={this.props.location.pathname === '/demo'}
                                    onClick={() => this.props.history.push('/demo')}>
                                    Demo
                                </Menu.Item>


                                <Menu.Item position='right'>
                                    {isAuthenticated ?
                                        <React.Fragment>
                                            <Button inverted={!fixed}
                                                onClick={() => this.props.logout()}>
                                                Logout
                                        </Button>
                                            <Button inverted primary
                                                onClick={() => this.props.history.push('/account/change-email')}>
                                                Account
                                        </Button>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <Button inverted={!fixed}
                                                onClick={() => this.props.history.push('/login')}>
                                                Log in
                                        </Button>
                                            <Button inverted={!fixed} primary={fixed}
                                                style={{ marginLeft: '0.5em' }}
                                                onClick={() => this.props.history.push('/signup')}>
                                                SignUp
                                        </Button>
                                        </React.Fragment>

                                    }
                                </Menu.Item>
                            </Container>
                        </Menu>
                        {/* <HomepageHeading /> */}
                    </Segment>
                </Visibility>

                {children}

            </Responsive>
        )
    }
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(DesktopContainer))



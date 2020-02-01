import React from 'react'
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Image,
    List,
    Segment,
} from 'semantic-ui-react'
import Face from '../assets/images/facialrecognition.jpg'
import { Link } from 'react-router-dom'



const HomepageLayout = () => (
    <React.Fragment>
        <Segment style={{ padding: '8em 0em' }} vertical>
            <Grid container stackable verticalAlign='middle'>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                            Facial Recognition API
            </Header>
                        <p style={{ fontSize: '1.33em' }}>
                            Try our fast and affordable facial recognition API for free. No credit
                            card required!
            </p>

                    </Grid.Column>
                    <Grid.Column floated='right' width={6}>
                        <Image bordered rounded size='large' src={Face} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column textAlign='center'>
                        <Link to='/login'>
                            <Button primary size='huge'>
                                Get Started
                            </Button>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>



        <Segment style={{ padding: '8em 0em' }} vertical>
            <Container text>
                <Header as='h3' style={{ fontSize: '2em' }}>
                    Try our API
        </Header>
                <p style={{ fontSize: '1.33em' }}>
                    "We’ve seen how useful the spectrum of face-related technologies can be for people and for society overall. It can make products safer and more secure—for example, face authentication can ensure that only the right person gets access to sensitive information meant just for them. It can also be used for tremendous social good; there are nonprofits using face recognition to fight against the trafficking of minors.

                    But it’s important to develop these technologies the right way.

                    We share many of the widely-discussed concerns over the misuse of face recognition. As we’ve said in our AI Principles and in our Privacy and Security Principles, it’s crucial that these technologies are developed and used responsibly. When it comes to face-related technology:

                    <br></br><br></br>
                    It needs to be fair, so it doesn’t reinforce or amplify existing biases, especially where this might impact underrepresented groups.
                    <br></br><br></br>
                    It should not be used in surveillance that violates internationally accepted norms.
                    <br></br><br></br>
                    And it needs to protect people’s privacy, providing the right level of transparency and control."
                    <br></br><br></br>
                    - Source: Google
                    <br></br><br></br>


                    <a href="https://ai.google/responsibilities/facial-recognition/">
                        <Button size='large'>
                            Read More
                        </Button>
                    </a>
                </p>
                <br></br>
                <Divider></Divider>
                <Header as='h3' style={{ fontSize: '2em' }}>
                    Pay-Per-Use Software (SaaS)
                </Header>
                <Header>Pay for what you use at $0.05 per request.</Header>

                <p style={{ fontSize: '1.33em' }}>
                    "Software pay per use is one of the contemporary trends to enter the market with the advent of cloud computing & SaaS (Software as a Service).
                    The concept of cloud network implies the offerings of a range of services by a third-party provider using the internet. The services offered includes SaaS,
                    wherein the virtual server provides the usage of the software through the cloud. Combining these two notions results in the offering of pay per use SaaS (Software as a Service),
                    which essentially entails paying a small subscription fee on per usage basis every time the software is being used."

                    <br></br><br></br>
                    - Source: Atos
                    <br></br><br></br>
                </p>
                <a href="https://apprenda.com/library/glossary/definition-payperuse-software-saas/">
                    <Button size='large'>
                        Read More
                        </Button>
                </a>
            </Container>
        </Segment>

        <Segment inverted vertical style={{ padding: '5em 0em' }}>
            <Container>
                <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content='About' />
                            <List link inverted>
                                <List.Item >Sitemap</List.Item>
                                <List.Item >Contact Us</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content='Services' />
                            <List link inverted>
                                <List.Item >FAQ</List.Item>
                                <List.Item >Pricing</List.Item>
                                <List.Item >API</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Header as='h4' inverted>
                                Facial Recognition SaaS
                            </Header>
                            <p>
                                Power Your Business with Software as a Service. <br></br>
                                Software as a service is a way of delivering centrally hosted
                                applications over the internet as a service.
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    </React.Fragment>
)

export default HomepageLayout
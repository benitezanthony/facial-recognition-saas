import React from 'react'
import {
    Button,
    Container,
    Divider,
    Image,
    Segment,
    Form,
    Icon,
    Message,
    Progress,
    Loader,
    Dimmer
} from 'semantic-ui-react'
import axios from "axios"
import { fileUploadURL, facialRecognitionURL } from "../constants"
import imagePlaceHolder from '../assets/images/facialrecognition.jpg'
import testFaceImage from '../assets/images/face.png'

class Demo extends React.Component {

    state = {
        fileName: "",
        file: null,
        error: null
    }

    handleFileChange = e => {
        this.setState({
            fileName: e.target.files[0].name,
            file: e.target.files[0],
            error: null,
            loading: false,
            statusCode: null,
            progress: 0,
            spinner: false,
            data: null,
        })
    }

    handleSubmit = e => {
        //prevents page from reloading
        e.preventDefault()
        //if there is something stored in file
        if (this.state.file) {
            this.handleFileUpload(this.state.file)
        }
        else {
            this.setState({
                error: "No file selected"
            })
        }
    }

    handleFileUpload = async file => {
        /* variable that assigns this keyword, which references the class */
        const __demo_class = this
        const formData = new FormData()
        //append file to object, file is coming from the state
        formData.append("file", file)
        this.setState({
            loading: true
        })
        //config used to handle callbacks from axios
        const config = {
            //progressEvent is what we receive from axios
            onUploadProgress: function (progressEvent) {
                //used for progress bar
                const progress = Math.round(100 * progressEvent.loaded / progressEvent.total)
                /* this.setState cannot be used because this utilizes 
                this from the function itself, not the class */
                __demo_class.setState({ progress })

                if (progress === 100) {
                    __demo_class.setState({
                        loading: false,
                        spinner: true
                    })
                }
            }
        }
        //axios, post the dictionary(object) of form data
        /* we need to create an API endpoint for this component 
        create app: python manage.py startapp core*/
        axios.post(fileUploadURL, formData, config)
            .then(res => {
                this.setState({
                    data: res.data,
                    statusCode: res.status,
                    spinner: false,
                })
            })
            .catch(err => {
                this.setState({
                    error: err.message,
                    loading: false,
                    spinner: false,
                })
            })

    }

    render() {

        const { error, progress, loading, spinner, data } = this.state

        return (
            <Container style={{ padding: "1em" }}>
                <Segment vertical>
                    <Divider horizontal>
                        Upload an image
                    </Divider>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <Button as="label" htmlFor="file" type="button" animated="fade">
                                <Button.Content visible>
                                    <Icon name="file" />
                                </Button.Content>
                                <Button.Content hidden>
                                    Select a File (Max Size 2 MB)
                            </Button.Content>
                            </Button>
                            <input id="file" type="file" hidden
                                onChange={this.handleFileChange} />
                            <Form.Input fluid label="File Chosen: "
                                placeholder="Upload a file by clicking the upload bar above"
                                readOnly
                                value={this.state.fileName}
                            />
                            <Button primary type="submit">
                                Upload
                            </Button>
                            {/* in order to download image, we must use an anchor tag */}
                            <a className="ui button" href={testFaceImage} download>
                                {/* i tag for an icon */}
                                <i aria-hidden="true" className="download icon" ></i>
                                Download test image
                            </a>
                        </Form.Field>
                    </Form>
                    {/* display message if there's an error */}
                    {error &&
                        <Message error header="There was an error" content={error} />
                    }
                </Segment>
                <Segment>
                    <Divider horizontal>Endpoint</Divider>
                    <p>
                        POST to {facialRecognitionURL} with headers: "Authentication: "
                        "Token {"<your_token>"}"
                    </p>
                </Segment>
                <Segment vertical>
                    <Divider horizontal>
                        JSON Response
                    </Divider>
                    {loading &&
                        <Progress
                            style={{ marginTop: "20px" }}
                            percent={progress}
                            indicating progress>
                            File upload progress
                        </Progress>
                    }
                </Segment>
                {spinner &&
                    <Segment>
                        <Dimmer active inverted>
                            <Loader inverted>
                                Face Recognition
                            </Loader>
                        </Dimmer>
                        <Image src={imagePlaceHolder} />
                    </Segment>
                }
                {data &&
                    <div>
                        <pre>
                            {JSON.stringify(data, null, 2)}
                        </pre>
                    </div>
                }
            </Container>
        )
    }
}



export default Demo
import React, { Component } from 'react'
import { dataResponse } from "../mockFile/mock_file"
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import Slide from '@material-ui/core/Slide';
import ListOfTime from './list_of_time';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openModel: false,
            data: {}
        }
    }
    componentDidMount() {
        console.log("ee")
        fetch('/personsData').then(res =>
            res.json()).then(data => {
                console.log(data)
            })
    }
    routeCalender = (data) => {
        this.setState({ openModel: true, data: data })
    }
    handleClose = () => {
        this.setState({ openModel: false })
    }
    render() {
        return (
            <div >
                <Grid container>
                    {dataResponse.members.map((data, index) => {
                        return (
                            <Grid item xs={12} md={6} key={data.id} onClick={() => this.routeCalender(data)}>
                                <Card className="person">
                                    <CardActionArea >
                                        <CardHeader
                                            avatar={
                                                <Avatar  >
                                                    {data.real_name[0]}
                                                </Avatar>}
                                            title={data.real_name}
                                        />
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
                {this.state.openModel && <Dialog fullScreen open={this.state.openModel} onClose={this.handleClose} TransitionComponent={Transition}>
                    <AppBar >
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                                <ArrowBackOutlinedIcon fontSize="large" />
                            </IconButton>
                            <Typography variant="h6" >
                                <CardHeader
                                    avatar={
                                        <Avatar  >
                                            {this.state.data.real_name[0]}
                                        </Avatar>}
                                    title={this.state.data.real_name}
                                />
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <div>adfefe</div>
                    <ListOfTime events={this.state.data.activity_periods} timeZone={this.state.data.tz}></ListOfTime>
                </Dialog>}
            </div>
        )
    }
}

export default Home

import React, { Component } from 'react'
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
import { postUserActiveData } from '../action/index'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openModel: false,
            data: {},
            responseData: {},
            openLoader: true,
            snackerror: false,
            snackOpenSucess: false,
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            if (this.props.data.data === "error occured") {
                this.setState({ snackerror: true, snackOpenSucess: false })
            }
            else {
                this.setState({ responseData: this.props.data.data, openLoader: false, snackOpenSucess: true, snackerror: false })
            }
        }
    }
    componentDidMount() {
        this.setState({ openLoader: true })
        this.props.postUserActiveData()
    }
    routeCalender = (data) => {
        this.setState({ openModel: true, data: data })
    }
    handleClose = () => {
        this.setState({ openModel: false })
    }
    handleCloseSnack = () => {
        this.setState({ snackOpenSucess: false, snackerror: false })
    }
    render() {
        const { responseData, openModel, data, openLoader, snackOpenSucess, snackerror } = this.state
        return (
            <div >
                <AppBar >
                    <Toolbar >
                        <SupervisorAccountIcon></SupervisorAccountIcon>
                            &nbsp;
                        Memebers List
                    </Toolbar>
                </AppBar>
                <Grid container>
                    {responseData.members && responseData.members.map((data, index) => {
                        return (
                            <Grid item xs={12} md={6} key={data.id} className="personGrid" onClick={() => this.routeCalender(data)}>
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
                <Snackbar open={snackerror} autoHideDuration={6000} onClose={this.handleCloseSnack}>
                    <MuiAlert elevation={6} variant="filled" severity="error" >
                        Network Issue
                    </MuiAlert>
                </Snackbar>
                <Snackbar open={snackOpenSucess} autoHideDuration={1000} onClose={this.handleCloseSnack}>
                    <MuiAlert elevation={6} variant="filled" severity="success" >
                        Data Retrived
                    </MuiAlert>
                </Snackbar>
                <Backdrop open={openLoader} >
                    <CircularProgress color="inherit" />
                </Backdrop>
                {openModel && <Dialog fullScreen open={openModel} onClose={this.handleClose} TransitionComponent={Transition}>
                    <AppBar >
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                                <ArrowBackOutlinedIcon fontSize="large" />
                            </IconButton>
                            <Typography variant="h6" >
                                <CardHeader
                                    avatar={
                                        <Avatar  >
                                            {data.real_name[0]}
                                        </Avatar>}
                                    title={data.real_name}
                                />
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <ListOfTime events={data.activity_periods} timeZone={data.tz}></ListOfTime>
                </Dialog>}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return { data: state.data }
}
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ postUserActiveData }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Home)

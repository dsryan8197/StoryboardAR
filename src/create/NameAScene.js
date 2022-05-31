import React, { Component } from 'react';
import back from '../../backArrow.png'
import PickAPic from '../view/PickAPic'
import { Col, Row, Grid } from "react-native-easy-grid";
import help from '../../help.png'

import {
  Text,
  TextInput,
  Image,
  View,
  StatusBar,
  Picker,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

import { NativeRouter, Route, Link } from "react-router-native";

export default class NameAScene extends Component {
  constructor(props) {
    super();
    this.state = {
      intExt: 'INT',
      location: '',
      dayNight: 'Day'
    }
  }

  goBack() {
    this.props.history.push('/')
  }

  render() {
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

    return (
      <SafeAreaView style={{ width: '100%', height: '100%', background: 'transparent' }}>
        <StatusBar hidden={false} />
        <NativeRouter>
          <Route exact path="/">
            <View style={{ flex: 1 }}>
              <View style={{
                width: SCREEN_WIDTH,
                height: 0,
                borderTopColor: '#F7F5FB',
                opacity: 1,
                borderTopWidth: SCREEN_HEIGHT / 1.7,
                borderRightWidth: SCREEN_WIDTH,
                borderRightColor: 'transparent',
                position: 'absolute'
              }}></View>

              <Grid>
                <Row size={1}>
                  <Col size={1} style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {this.props.created && <TouchableHighlight style={localStyles.backButton, { justifyContent: 'center' }} onPress={() => this.goBack()}>
                      <Image style={localStyles.backButton} source={back}></Image>
                    </TouchableHighlight>}
                  </Col>
                  <Col size={3} style={{ justifyContent: 'center' }}>
                    <Text style={localStyles.Film}>Create a Scene</Text>
                  </Col>
                  <Col size={1} style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableHighlight style={{ justifyContent: 'center' }} onPress={() => { this.props.goBackToInfo() }}>
                      <Image style={localStyles.Modelbuttonsone} source={help}></Image>
                    </TouchableHighlight>
                  </Col>
                </Row>
                <Row size={7} style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: '15%' }}>
                  <Col size={1}></Col>
                  <Col size={6}>
                    <View style={localStyles.createSCene} >
                      <Picker
                        style={{ width: '25%' }}
                        selectedValue={this.state.intExt}
                        onValueChange={(itemValue, itemIndex) => this.setState({ intExt: itemValue })}
                      >
                        <Picker.Item label="INT" value="INT" />
                        <Picker.Item label="EXT" value="EXT" />
                      </Picker>

                      <TextInput
                        placeholder="location"
                        value={this.state.ProjectNameInput}
                        style={{
                          paddingLeft: 10, fontSize: 23, textAlign: 'center', width: '50%', marginRight: 20, marginLeft: 20, paddingBottom: 10,
                          borderBottomColor: '#C4C4C4', borderBottomWidth: 2
                        }}
                        onChangeText={e => this.setState((prevState) => ({
                          location: e
                        }))}
                      />

                      <Picker style={{ backgroundColor: 'white', width: '25%' }}
                        selectedValue={this.state.dayNight}
                        onValueChange={(itemValue, itemIndex) => this.setState({ dayNight: itemValue })}
                      >
                        <Picker.Item label="Day" value="Day" />
                        <Picker.Item label="Night" value="Night" />
                      </Picker>
                    </View>
                  </Col>
                  <Col size={1}></Col>
                </Row>
                <Row size={1} style={{ paddingTop: 5 }} >
                  <Col size={1} ></Col>
                  <Col size={5} style={{ flexDirection: 'row', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Link to="/pics"
                      style={localStyles.buttonsplus}
                      onPress={() => {
                        this.props.AddSceneDescription(this.props.ProjectNameInput, this.state.intExt, this.state.location, this.state.dayNight, this.state.intExt + ' ' + this.state.location + ' ' + this.state.dayNight)
                      }
                      }>
                      <Text style={localStyles.buttonText}>+</Text>
                    </Link>
                  </Col>
                  <Col size={1}></Col>
                </Row>
              </Grid>
            </View>
          </Route>
          <Route path="/pics" render={props => (
            <PickAPic {...props}
              created={"true"}
              deletePicture={this.props.deletePicture}
              goBackToInfo={this.props.goBackToInfo}
              Arrange={this.props.Arrange}
              DataForPic={this.props.DataForPic}
              updatePictures={this.props.updatePictures}
              reRender={this.props.Info}
              Info={this.props.ObjofProje[this.state.intExt + ' ' + this.state.location + ' ' + this.state.dayNight]}
              projectNameInput={this.props.ProjectNameInput}
              ObjofProje={this.props.ObjofProje}
              activeProject={this.props.activeProject} />)
          } />
        </NativeRouter>
      </SafeAreaView>
    )
  }
}

var localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  outer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    backgroundColor: "#8A4FFF",
  },
  Modelbuttons2: {
    height: 35,
    opacity: 0.3,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Modelbuttonsone: {
    height: 31,
    width: 27,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inner: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "#FFFFFF",
  },
  titleText: {
    color: 'white',
    textAlign: 'center',
    borderColor: '#C3BEF7',
    borderRadius: 50,
    fontSize: 25
  },
  backButton: {
    height: 35,
    width: 36,
  },
  littleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 10
  },
  titleText2: {
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    borderColor: '#C3BEF7',
    borderRadius: 50,
    fontSize: 25,
    width: 300
  },
  Film: {
    color: '#7844CA',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C3BEF7',
    borderRadius: 50,
    fontSize: 30,
    fontWeight: '200',

  },
  buttonText: {
    color: '#C3BEF7',
    fontSize: 30,
    textAlign: 'center',

  },
  buttons: {
    height: 80,
    width: '70%',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#C3BEF7',
    borderRadius: 10,
    borderWidth: 5,
    borderColor: 'rgba(0,0,0,.2)',
  },
  buttonsplus: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 8,
    borderColor: '#C3BEF7',
  },
  Modelbuttons: {
    height: 25,
    width: 25,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  viewforobjects: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '10%',
    height: '100%',
  },
  createSCene: {
    justifyContent: 'center',
    height: 150,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  createSCene2: {
    position: 'absolute',
    justifyContent: 'center',
    height: 150,
    borderWidth: 2,
    borderColor: 'black',
    top: '90%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
module.exports = NameAScene
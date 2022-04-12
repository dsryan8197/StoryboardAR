import React, { Component } from 'react';
import PickAScene from './src/view/PickAScene'
import NameAProject from './src/create/NameAProject'
import persons from './Group8.png'
import trash from './trashicon2.png'
import Info1 from './slate1.jpg'
import Info2 from './people1.jpg'
import Info3 from './camera1.jpg'
import Info4 from './Info4.jpg'
import Info5 from './Info5.jpg'
import arrowright from './arrowforpages.png'
import back from './backArrow.png'
import { Col, Row, Grid } from "react-native-easy-grid";
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';
import Swipeout from 'react-native-swipeout';
import { AsyncStorage } from 'react-native';
import download from './downArrow.png'
import bigDownload from './bigDownload.png'
import back2 from './back2.png'
import camera from './camerasnapshot.png'
import character from './charactericon.png'
import help from './help.png'

// import {AnimatePResence, motion } from 'framer-motion'
import {
  AppRegistry,
  Text,
  Button,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  // PixelRatio,
  Dimensions,
  ScrollView,
  Image,
  TouchableHighlight,
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from '@viro-community/react-viro';

import { NativeRouter, Route, Routes, Link } from "react-router-native";

export default class PickAProject extends Component {
  constructor(props) {
    super();
    this.state = {
      activeProject : null,
      ProjectNameInput : '',
      InfoPage: false,
      inf: 'one',
      ProjectObj : {
      },
    } 
  }
 storeData = async () => {
  try {
    const jsonValue = JSON.stringify(this.state)
    await AsyncStorage.setItem('photoboard', jsonValue)
  } catch (e) {
  }
}

  goBackToInfo = () => {
    return (
      this.setState((prevState) => ({
        ...prevState,
        InfoPage: false,
        inf: 'one'
      })
    ), () => {
      this.storeData()
    })
  }

 getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('photoboard')
    if(jsonValue != null) {
      this.setState(JSON.parse(jsonValue))
    }
  } catch(e) {
  }
}

DeleteSceneDescription = (sceneName, project, states) => {
const x = states.ProjectObj[project]
delete x[sceneName]
return (
this.setState((prevState) => ({
  ...prevState,
  ProjectObj: {
    ...prevState.ProjectObj,
    [project]: {
      ...x
  }}}), () => {
  this.storeData()
  })
  )
}

AddSceneDescription = (project, intro, sceneName, outro, full) => {
this.setState((prevState) => ({
  ...prevState,
  ProjectObj: {
    ...prevState.ProjectObj,
    [project]: {
      ...prevState.ProjectObj[project],
    [full]: {
       description: full,
       images: []
  }}}}), () => {
  this.storeData()
})
}

//this holds the typed onChange value of a project name when being created
handleChange = (e) => {
  this.setState((prevState) => ({
    ...prevState,
    ProjectNameInput : e
  }), () => {
  this.storeData()
  });
}

AddProject = (ProjectNameInput) => {
this.setState((prevState) => ({
  ...prevState,
  activeProject: ProjectNameInput,
  ProjectObj : {
    ...prevState.ProjectObj,
    [ProjectNameInput] : {}
  }}), () => {
  this.storeData()
})  
}

deleteProj = (ProjectNameInput) => {
const y = this.state.ProjectObj
delete y[ProjectNameInput]
return (
this.setState((prevState) => ({
  ...prevState,
  activeProject: ProjectNameInput,
  ProjectObj : {
     ...y
  }}), () => {
  this.storeData()
}))
}

updatePictures = (imageURL, Scene, Img, project ) => {
this.setState((prevState) => ({
  ...prevState,
  ProjectObj: {
    ...prevState.ProjectObj,
    [project] : {
      ...prevState.ProjectObj[project],
      [Scene] : {
        description: [Scene],
        images: [...Img, imageURL]
  }}}}), () => {
this.storeData()
})
}

deletePicture = (imageURL, Scene, Img, project ) => {
this.setState((prevState) => ({
  ...prevState,
  ProjectObj: {
    ...prevState.ProjectObj,
    [project] : {
      ...prevState.ProjectObj[project],
      [Scene] : {
        description: [Scene],
        images: [...Img].filter(el => el !== imageURL)
   }}}}), () => {
this.storeData()
})}

Arrange = ( imageURL, Scene, Img, project, direction, index ) => {
if (direction == "down" && index > 0) {
  let d = Img[index]
  Img[index] = Img[index - 1]
  Img[index - 1] = d
this.setState((prevState) => ({
  ...prevState,
  ProjectObj: {
    ...prevState.ProjectObj,
    [project] : {
      ...prevState.ProjectObj[project],
      [Scene] : {
        description: [Scene],
        images: [...Img]
  }}}}), () => {
this.storeData()
})

} else if (direction == "up" && index < Img.length -1) {
  let q = Img[index]
  Img[index] = Img[index + 1]
  Img[index + 1] = q
this.setState((prevState) => ({
  ...prevState,
  ProjectObj: {
    ...prevState.ProjectObj,
    [project] : {
      ...prevState.ProjectObj[project],
      [Scene] : {
        description: [Scene],
        images: [...Img]
  }}}}), () => {
this.storeData()
})
}
}

componentDidMount() {
// if (this.props.reRender) {
// this.setState((prevState) => ({
//   ...this.props.reRender
//   }))
// } else {
  this.getData()
}

//home page that shows all your projects (films) and provides option to add a new project
render() {
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')
// let splash = true

if (!this.state.InfoPage) {

// if (this.state.inf == 'zero') {
//         setTimeout(() => {
//         this.setState({inf : 'one'});
//     }, 3500) 
// return (
// <SafeAreaView style={{width: '100%', height: '100%', backgroundColor: '#7844CA'}}>
//  <StatusBar hidden={false} />
//  {/* <View style={{width: SCREEN_WIDTH,
//                     height: 0,
//                     borderTopColor: '#F7F5FB',
//                     opacity: .5,
//                     borderTopWidth: SCREEN_HEIGHT / 1.7,
//                     borderRightWidth: SCREEN_WIDTH,
//                     borderRightColor: 'transparent',
//                     position: 'absolute'}}></View>
//                     <View style={{width: SCREEN_WIDTH,
//                     height: 0,
//                     borderTopColor: 'transparent',
//                     opacity: .5,
//                     borderTopWidth: SCREEN_HEIGHT ,
//                     borderRightWidth: SCREEN_WIDTH / 1.5,
//                     borderRightColor: '#F7F5FB',
//                     position: 'absolute'}}></View> */}
//   <Grid>
//     <Row size={1} style={{width: '100%', height: '100%', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//     {/* <View style={{width: '100%', height: '100%', flex: 1, alignItems: 'center', justifyContent: 'center'}}> */}
//     <Image
//         style={{width: 115, height: 170, alignItems: 'center', justifyContent: 'center'}}
//         source={persons}
//         key="cbutton">
//        </Image>
//        {/* </View> */}
//       {/* <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', textAlign: 'center', justifyContent: 'center'}}>
//         <Text style={{ color: '#8F8F8F', fontSize: 30}}>photobo</Text><Text style={{color: '#C3BEF7', fontSize:35}}>AR</Text><Text style={{color: '#8F8F8F', fontSize: 30}}>d</Text>
//        </View> */}
//     </Row>
//   </Grid>
// </SafeAreaView>
// )
// }

if (this.state.inf == 'one') {
return (
<SafeAreaView style={{width: '100%', height: '100%', background: 'transparent'}}>
 <StatusBar hidden={false} />
  <Grid>
    <Row size={1}></Row>
    <Row size={4}>
        <Image
        style={{width: '100%', height: '100%',  alignContent: 'center', justifyContent: 'center'}}
        source={Info1}
        key="cbutton">
       </Image>
    </Row>
    <Row size={2} style={{marginBottom: '10%'}}>
       <View style={{alignItems: 'flex-start',  paddingLeft: '10%',width: '90%', justifyContent: 'center'}}>
         <Text style={localStyles.buttonTextII}>Draft</Text>
         <Text style={{color: '#8F8F8F',  paddingTop: '3%', fontSize: 20}}>Create your films and your scenes</Text>
         <Text style={{color: '#8F8F8F',paddingTop: '3%', fontSize: 20}}>Swipe scenes to delete</Text>
      </View>
    </Row>
    <Row size={1} style={{ alignItems: 'center'}}>
      <Col size={0.5}></Col>
      <Col size={4} style={{top: 50}}>
        <AnimatedDotsCarousel
        length={3}
        currentIndex={0}
        maxIndicators={4}
        interpolateOpacityAndColor={true}
        activeIndicatorConfig={{
          color: 'purple',
          margin: 3,
          opacity: 1,
          size: 8,
        }}
        inactiveIndicatorConfig={{
          color: 'white',
          margin: 3,
          borderColor: 'black',
          borderWidth: 1,
          opacity: 0.5,
          size: 8,
        }}
        decreasingDots={[
          {
            config: { color: 'white', margin: 3, opacity: 0.5, size: 6 },
            quantity: 1,
          },
          {
            config: { color: 'white', margin: 3, opacity: 0.5, size: 4 },
            quantity: 1,
          },
        ]}
      />
      </Col>
      <Col size={2}>
        <TouchableHighlight onPress={()=> {(
                this.setState((prevState) => ({
                  ...prevState,
                  inf : 'two'
            })))}} style={localStyles.introButton}>

            <Image style={{width: 80, height: 80}} source={back2}></Image>
         </TouchableHighlight>
      </Col>
    </Row>
    <Row size={1}></Row>
  </Grid>
</SafeAreaView>
)
}

if (this.state.inf == 'two') {
return (
<SafeAreaView style={{width: '100%', height: '100%'}}>
 <StatusBar hidden={false} />
 <Grid>
    <Row size={1}></Row>
      <Row size={4} style={{paddingBottom: '5%'}}>
        <Image
        style={{width: '100%', height: '100%',  alignContent: 'center', justifyContent: 'center'}}
        source={Info2}
        key="cbutton">
       </Image>
    </Row>
    <Row size={2} style={{marginBottom: '10%'}}>
      <View style={{alignItems: 'flex-start', paddingLeft: '10%', width: '90%', justifyContent: 'center'}}>
        <Text style={localStyles.buttonTextII}>Frame</Text>
        <Text style={{color: '#8F8F8F', paddingTop: '3%', fontSize: 20}}>Frame shots in AR with 150 models</Text>
        <Text style={{color: '#8F8F8F', paddingTop: '3%', fontSize: 20}}>Tap your models to rotate</Text>
      </View>
    </Row>
    <Row size={1} style={{alignItems: 'center'}}>
      <Col size={0.5}></Col>
      <Col size={4} style={{top: 50}}>
        <AnimatedDotsCarousel
        length={3}
        currentIndex={1}
        maxIndicators={4}
        interpolateOpacityAndColor={true}
        activeIndicatorConfig={{
          color: 'purple',
          margin: 3,
          opacity: 1,
          size: 8,
        }}
        inactiveIndicatorConfig={{
          color: 'white',
          margin: 3,
          borderColor: 'black',
          borderWidth: 1,
          opacity: 0.5,
          size: 8,
        }}
        decreasingDots={[
          {
            config: { color: 'white', margin: 3, opacity: 0.5, size: 6 },
            quantity: 1,
          },
          {
            config: { color: 'white', margin: 3, opacity: 0.5, size: 4 },
            quantity: 1,
          },
        ]}
      />
    </Col>
    <Col size={2}>
        <TouchableHighlight onPress={()=> {(
                this.setState((prevState) => ({
                  ...prevState,
                  inf : 'three'
            })))}} style={localStyles.introButton}>
            <Image style={{width: 80, height: 80}} source={back2}></Image>
        </TouchableHighlight>
      </Col>
    </Row>
    <Row size={1}></Row>
  </Grid>
</SafeAreaView>
  )
}

if (this.state.inf == 'three') {
return (
<SafeAreaView style={{width: '100%', height: '100%', background: 'transparent'}}>
  <StatusBar hidden={false} />
<Grid>
    <Row size={1}></Row>
    <Row size={4}>
        <Image
        style={{width: '100%', height: '100%',  alignContent: 'center', justifyContent: 'center'}}
        source={Info5}
        key="cbutton">
       </Image>
     </Row>
     <Row size={2} style={{marginBottom: '10%'}} >
        <View style={{alignItems: 'flex-start',  paddingLeft: '10%', width: '90%', justifyContent: 'center'}}>
          <Text style={localStyles.buttonTextII}>Save</Text>
         <Text style={{color: '#8F8F8F', paddingTop: '3%', fontSize: 20}}>Check your photo gallery</Text>
         <Text style={{color: '#8F8F8F', paddingTop: '3%', fontSize: 20}}>For your storyboards</Text>
       </View>
      </Row>
      <Row size={1} style={{alignItems: 'center'}}>
       <Col size={0.5}></Col>
       <Col size={4} style={{top: 50}}>
         <AnimatedDotsCarousel
        length={3}
        currentIndex={2}
        maxIndicators={4}
        interpolateOpacityAndColor={true}
        activeIndicatorConfig={{
          color: 'purple',
          margin: 3,
          opacity: 1,
          size: 8,
        }}
        inactiveIndicatorConfig={{
          color: 'white',
          margin: 3,
          borderColor: 'black',
          borderWidth: 1,
          opacity: 0.5,
          size: 8,
        }}
        decreasingDots={[
          {
            config: { color: 'white', margin: 3, opacity: 0.5, size: 6 },
            quantity: 1,
          },
          {
            config: { color: 'white', margin: 3, opacity: 0.5, size: 4 },
            quantity: 1,
          },
        ]}
      />
     </Col>
      <Col size={2}>
        <TouchableHighlight onPress={()=> {(
                this.setState((prevState) => ({
                  ...prevState,
                  InfoPage: true,
                  inf: 'one' 
              })))}} style={localStyles.introButton}>
            <Image style={{width: 80, height: 80}} source={back2}></Image>
        </TouchableHighlight>
      </Col>
    </Row>
    <Row size={1}></Row>
  </Grid> 
</SafeAreaView> 
  )
}

}
if (this.state.InfoPage) {
 return (
<SafeAreaView style={{width: '100%', height: '100%', background: 'transparent'}}>
<StatusBar hidden={false} />
  <NativeRouter>
    {/* <Route exact path="/"> */}
   <View style={{flex: 1}}>
       <View style={{width: SCREEN_WIDTH,
                    height: 0,
                    borderTopColor: '#F7F5FB',
                    opacity: 1,
                    borderTopWidth: SCREEN_HEIGHT / 1.7,
                    borderRightWidth: SCREEN_WIDTH,
                    borderRightColor: 'transparent',
                    position: 'absolute'}}></View>

      <Grid style={localStyles.test}>
        <Row size={1}>
          <Col size={1}></Col>
          <Col size={3} style={{justifyContent: 'center'}}>
             <Text style={localStyles.Film}>Films</Text>
           </Col>
          <Col size={1} style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableHighlight  style={{justifyContent: 'center'}} onPress={()=>{this.goBackToInfo()}}>
              <Image style={localStyles.Modelbuttonsone} source={help}></Image>
           </TouchableHighlight>
        </Col>
        </Row>
        <Row size={7}>
           {/* <Col size={1}></Col> */}
           <Col size={6}>
             <ScrollView horizontal={false} style={{width: '100%', height: '100%'}}>
          {Object.keys(this.state.ProjectObj).map((el, i) => { 
            return (
               <Swipeout right={[{
                    text: 'Delete',
                    backgroundColor: 'red',
                    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                    onPress: () => { this.deleteProj(el) }
                  }]} autoClose='true'
                  style={{alignItems: 'center',  width: '100%', justifyContent: 'center'}}
                     backgroundColor= 'transparent'>
              <Link to="/scene" key={i} style={localStyles.buttons} onPress={()=> {(
                this.setState((prevState) => ({
                  ...prevState, 
                  activeProject : el,
                  ProjectNameInput: el
                })))}}>
              {/* <View style={{width: '100%', height: '100%', backgroundColor: 'orange'}}> */}
                <View style={{width: '90%', height: '100%', flexDirection: 'row'}}>
                    <View style={{width: '50%', height: '100%', justifyContent: 'center'}}>
                      <View style={localStyles.buttonsCube}>
                       <Image source={Info1} style={{width: '100%',height:'100%',  borderRadius: 5, }}></Image>
                     {/* {!this.state.ProjectObj[el][Object.keys(this.state.ProjectObj[el])[0]].images.length > 0 && <Image source={Info1} style={{width: '100%',height:'100%',  borderRadius: 5,}}></Image>} */}
                      </View>
                    </View>
                     <View style={{ textAlign: 'center', justifyContent: 'center',  width: '50%', height: '100%'}}>
                    <Text style={localStyles.titleText2}>{el}</Text>
                    {Object.keys(this.state.ProjectObj[el]).length === 1 ? <Text style={localStyles.ScenesText}>1 Scene</Text>
                    : <Text style={localStyles.ScenesText}>{Object.keys(this.state.ProjectObj[el]).length} Scenes</Text> }
                    </View>
                  <View style={{ textAlign: 'center', justifyContent: 'center'}}>
                    <Image source={arrowright} style={{ width: 20, height: 20}}/>
                  </View>
                </View>
                {/* </View> */}
             </Link>
             </Swipeout>
          )})}
            </ScrollView>
          </Col>
          {/* <Col size={1}></Col> */}
      </Row>
      <Row size={1} style={{paddingTop: 10}}>
        <Col size={1}></Col>
        <Col size={5} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
           {/* <TouchableHighlight onPress={()=>{this.goBackToInfo()}}>
            <Image style={localStyles.Modelbuttonsone} source={help}></Image>
          </TouchableHighlight> */}
          {/* <View style={{paddingRight: 5}}> */}
          {/* <Image style={localStyles.Modelbuttons2} onPress={()=>{alert('download')}} source={bigDownload}></Image>
          </View> */}
           <Link to="/addAProject" style={localStyles.buttonsplus}>
               <Text style={localStyles.buttonText}>{"+"}</Text>
           </Link>
        {/* <View style={{paddingLeft: 5}}>
       <Image style={localStyles.Modelbuttons2} onPress={()=>{alert('download')}} source={download}></Image>
        </View> */}
        </Col>
         <Col size={1}></Col>
      </Row>

   </Grid>
   </View>
   {/* </View> */}
       {/* </Route> */}
       <Routes>
      <Route path="/scene" render={props => 
          (<PickAScene {...props} 
          DeleteSceneDescription={this.DeleteSceneDescription}
          deletePicture={this.deletePicture}
          updatePictures={this.updatePictures}
          ProjectNameInput={this.state.ProjectNameInput}
          goBackToInfo={this.goBackToInfo}
          AddSceneDescription={this.AddSceneDescription}
          Info={this.state}
          Arrange={this.Arrange}
          Draggable={this.state[this.state.activeProject]}
          ObjofProje={this.state.ProjectObj[this.state.activeProject]}/>)
          }/>
          {/* route for when you click "+" add a new project */}
          <Route path="/addAProject" element={ 
          <NameAProject
          created={"true"}
          Arrange={this.Arrange}
          Arrange={this.Arrange}
          goBackToInfo={this.goBackToInfo}
          DeleteSceneDescription={this.DeleteSceneDescription}
          deletePicture={this.deletePicture}
          updatePictures={this.updatePictures}
          ObjofProje={this.state.ProjectObj}
          ProjectNameInput={this.state.ProjectNameInput}
          AddSceneDescription={this.AddSceneDescription}
          AddProject={this.AddProject}
          handleChange={this.handleChange}
          Info={this.state}/>
          } />
       </Routes>
  </NativeRouter>
</SafeAreaView>
    )
  }
    }}


var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    backgroundColor: "#8A4FFF",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "#FFFFFF",
  },
  viewforobjects : {
    width: '100%',
    alignItems:'center',
    justifyContent: 'center',
    paddingBottom: '10%',
    height: '100%',
  },
  Film: {
    color:'#7844CA',
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    borderColor: '#C3BEF7',
    borderRadius: 50,
    fontSize : 30,
    fontWeight: '200',
  },
  titleText: {
    paddingTop: 35,
    color:'white',
    textAlign:'center',
    borderColor: '#C3BEF7',
    // borderRadius: 50,
    fontSize : 25
  },
  titleText2: {
    color:'black',
    fontWeight: '200',
    paddingBottom: 5,
    // textAlign:'center',
    justifyContent: 'center',
    // borderColor: '#C3BEF7',
    // borderRadius: 50,
    fontSize : 25,
    width: '70%'
  },
    ScenesText: {
    color:'gray',
    fontWeight: '200',
    // textAlign:'center',
    justifyContent: 'center',
    // borderColor: '#C3BEF7',
    // borderRadius: 50,
    fontSize : 15,
    width: '70%'
  },
  buttonText: {
    color:'#C3BEF7',
    textAlign:'center',
    fontSize : 30
  },
  buttonTextII: {
    color:'#C3BEF7',
    paddingTop: '15%',
    textAlign:'center',
    fontSize : 40,
  },
  deleteButton : {
    color: 'white'
  },
  buttonsCube: {
    height: 120,
    width: 120,
    alignContent: 'center',
    alignItems: 'center', //Centered vertically    justifyContent: 'center',
    // marginTop: 20,
    // marginBottom: 20,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    backgroundColor:'#C3BEF7',
    // marginBottom: 50,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: 'rgba(0,0,0,.1)',
  },
  buttons : {
    height: 150,
    width: '88%',
    alignContent: 'center',
    alignItems: 'center', //Centered vertically    justifyContent: 'center',
    // marginTop: 10,
    // marginBottom: 10,
    justifyContent: 'center',
    textAlign: 'center',
    // backgroundColor:'#C3BEF7',
    // borderRadius: 10,
    borderBottomWidth: 2,
    borderColor: 'rgba(0,0,0,.2)',
  },
   buttonsplus : {
    height: 80,
    width: 80,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor:'#FFFFFF',
    borderRadius: 80/2,
    borderWidth: 8,
    borderColor: '#C3BEF7',
  },
  // test: {
  //   backgroundColor: 'linear-gradient(165deg, #f7f5fb 50%, #fff 50%)',
  //   // backgroundImage: linear-gradient(165deg, rgb(247, 245, 251) 50%, rgb(255, 255, 255) 50%);
  // },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  introButton : {
     width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#7844CA'

  },
   Modelbuttons : {
    height: 25,
    width: 25,
    paddingTop:20,
    left: '95%',
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
  },
    Modelbuttons2 : {
    height: 35,
    opacity: 0.3,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
    Modelbuttonsone : {
    height: 31,
    width: 27,
    // paddingBottom:20,
      justifyContent: 'center',
    alignItems: 'center'
  },
});

module.exports = PickAProject
// export default () => {
//   return (
//     <View style={{width: '100%', height: '100%', backgroundColor: 'blue'}}>
//       <Text style={{width: '100%', height: '100%'}}>gasdfadfasdfadsfaf</Text>
//     </View>
//   );
// };

// var styles = StyleSheet.create({
//   f1: {flex: 1},
//   helloWorldTextStyle: {
//     fontFamily: 'Arial',
//     fontSize: 30,
//     color: '#ffffff',
//     textAlignVertical: 'center',
//     textAlign: 'center',
//   },
// });

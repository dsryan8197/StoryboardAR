<p align='center'>
<img src='https://github.com/dsryan8197/photoboardlanding/blob/master/logo.png' width=100%>
</p>
<h4 align='center'>an Augmented Reality app to help filmmakers storyboard their films</h4>

<div align='center'>
<img src='https://github.com/dsryan8197/photoboardlanding/blob/master/storyboard2copy.gif' width=480 height=222/>
<img src='./Group6.png' width=300 height=300/>
      </div>
<div align='center' >
<img src='https://github.com/dsryan8197/photoboardlanding/blob/master/storyboardfinal.gif' width=222 height=480/>
</div>

## Download IOS app v.2.2
<a href="https://apps.apple.com/us/app/storyboardar/id1619218172" download>Install</a>

## Contribute
Feel free to raise a PR against an open issue or raise an issue yourself. We're always looking to improve!

1. `npm install`
2. `npx pod-install` (iOS)
3. Connect device to Xcode
4. `npx react-native run-ios`
5. Build in Xcode

## File Structure
```
Src folder
      ----App.js-----
     |              |
NameAProject       PickAScene
     |              |
NameAScene          |
     |------->   PickAPic

PickAPic.js renders 4 components:
 -images
 -AR visualizer
 -Characters
 -Character poses      

 MODLES/Images:
 finalModles folder - all the gltfs of models
 picsofModels folder -all the images of models
 ModelScript.js - my api for the above folders
```

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Platform
} from "react-native";
import Expo from "expo";
import { Actions, Router, Scene } from "react-native-mobx";
import { observable } from "mobx";
import { autobind } from "core-decorators";
import { observer } from "mobx-react/native";
import Drawer from "react-native-drawer";
import SideMenu from "./SideMenu";
import Login from "./login";
import Loading from "./loading";
import GroupList from "./group-list"
import CheckAttendance from "./check-attendance"
import MyGroup from "./my-group"
import EnterGroupName from "./enter-group-name"
import User from "./models/user";
import Global from "./models/global";
import FirebaseApi from "./models/firebase"


@autobind
@observer
export default class App extends Component {
  @observable email = "";
  @observable token = null;
  @observable isLogin = false;
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      drawerDisabled: false
    };
    this.User = User;
    this.FirebaseApi = FirebaseApi;
  }
  componentDidMount() {
    //this.setState({});
  }
  closeDrawer = () => {
    this._drawer.close();
  };
  openDrawer = () => {
    this._drawer.open();
  };

  render() {
    return (
      <Drawer
        ref={ref => (this._drawer = ref)}
        type="static"
        content={<SideMenu User={this.User} closeDrawer={this.closeDrawer} />}
        acceptDoubleTap
        styles={{
          main: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 15}
        }}
        onOpen={() => {
          this.setState({ drawerOpen: true });
        }}
        onClose={() => {
          this.setState({ drawerOpen: false });
        }}
        captureGestures={"open"}
        tweenDuration={100}
        panThreshold={0.08}
        disabled={this.state.drawerDisabled}
        openDrawerOffset={0.2}
        closedDrawerOffset={0}
        panOpenMask={0.2}
        tapToClose={true}
        negotiatePan
        tweenHandler={ratio => ({
          main: {opacity: (2 - ratio) / 2}
        })}
      >
        <Router
          sceneStyle={{
            paddingTop: 64,
          }}
          backButtonIcon="angle-left"
          leftIconStyle={{
            fontSize: 32,
            color: "#fff",
            width: __d(53.33),
            height: __d(53.33),
            lineHeight: __d(53.33),
            paddingLeft: 15
          }}
          drawerMenuPress={() => {
            !this.state.drawerOpen && this.openDrawer();
            this.state.drawerOpen && this.closeDrawer();
          }}
          User={this.User}
          FirebaseApi={this.FirebaseApi}

        >
          <Scene
              key="login"
              title=""
              component={Login}
              hideNavBar={true}
              sceneStyle={{
                  paddingTop: 0
              }}/>
          <Scene
              key="loading"
              title=""
              component={Loading}
              hideNavBar={true}
              sceneStyle={{
                  paddingTop: 0
              }}/>
          <Scene
              key="checkAttendance"
              title="Check Attendance"
              component={CheckAttendance}
              hideNavBar={false}
              />
          <Scene
              key="groupList"
              title="Group List"
              component={GroupList}
              hideNavBar={false}
          />
          <Scene
              key="myGroup"
              title="My Group"
              component={MyGroup}
              hideNavBar={false}
          />
          <Scene
              key="enterGroupName"
              title="Enter Group Name"
              component={EnterGroupName}
              hideNavBar={false}
          />
        </Router>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

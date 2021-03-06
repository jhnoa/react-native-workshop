// @flow

import React, {Component} from 'react';
import {ScrollView, View, TouchableOpacity, Text} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Icon from '../../../global/core-ui/Icon';
import {connect} from 'react-redux';
import {ListItem} from 'react-native-elements';

type Props = {
  navigation: Object;
  handleAction: (action: Object) => void;
  followingData: Array<*>;
};
type State = {
  items: Array<*>;
  search: string;
  followingList: Array<*>;
};

export class FollowingScreen extends Component<Props, State> {
  static navigationOptions = (options: *) => ({
    headerLeft: (
      <View style={{paddingLeft: 10}}>
        <TouchableOpacity
          onPress={() => {
            options.navigation.goBack(null);
          }}
        >
          <Icon
            name={'arrow-back'}
            size={30}
            color={'black'}
            type={'MATERIAL_ICONS'}
          />
        </TouchableOpacity>
      </View>
    ),
    headerTitle: (
      <Text style={{fontSize: 24, fontWeight: 'bold'}}>Following</Text>
    ),
  });

  state = {
    items: [],
    search: '',
    followingList: [],
  };

  componentDidMount() {
    this.props.handleAction({type: 'FOLLOWING_REQUESTED'});
  }

  async navigateToProfile(item: Object) {
    this.props.navigation.navigate({
      routeName: 'Profile',
      params: {
        userLogin: item.login,
      },
      key: item.id,
    });
    // this.props.handleAction({
    //   type: 'ON_USER_MOUNT',
    //   payload: item.login,
    // });
  }

  render() {
    let {items, search} = this.state;
    items = this.props.followingData;
    let showItems = [];
    if (search !== '') {
      items.forEach((item) => {
        if (item.login.toLowerCase().includes(search.toLowerCase())) {
          showItems.push(item);
        }
      });
    } else {
      showItems = this.props.followingData;
    }

    return (
      <View style={{flex: 1}}>
        <SearchBar
          onChangeText={(text: string): void => this.setState({search: text})}
          onClearText={() => this.setState({search: ''})}
          value={this.state.search}
          placeholderTextColor={'#E1E4EC'}
          placeholder={'Type Here...'}
          icon={{
            type: 'material',
            color: '#909AA3',
            name: 'search',
            style: {alignContent: 'center'},
          }}
          inputStyle={{backgroundColor: '#E1E4EC'}}
          containerStyle={{
            backgroundColor: 'white',
            borderBottomWidth: 0.1,
            borderTopWidth: 0.5,
          }}
        />
        <ScrollView>
          {showItems.map((item) => (
            <ListItem
              containerStyle={{backgroundColor: 'white'}}
              roundAvatar
              avatar={{uri: item.avatar_url}}
              key={item.id}
              title={item.login}
              onPress={() => this.navigateToProfile(item)}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    followingData: state.followingReducer.followingData,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleAction: (action: Object) => dispatch(action),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FollowingScreen);

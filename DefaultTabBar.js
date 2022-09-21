import React from 'react';
import { TextPropTypes, ViewPropTypes, } from 'deprecated-react-native-prop-types';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import {
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import Button from './Button';

const DefaultTabBar = createReactClass({
  propTypes: {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    textStyle: TextPropTypes.style,
    tabStyle: ViewPropTypes.style,
    renderTab: PropTypes.func,
    underlineStyle: ViewPropTypes.style,
  },

  getDefaultProps() {
    return {
      activeTextColor: 'navy',
      inactiveTextColor: 'black',
      backgroundColor: null,
    };
  },

  renderTabOption(name, page) {
  },

  renderTab(name, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor, textStyle, activeTextStyle } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const finalActiveTextStyle = isTabActive ? {fontWeight: 'bold', ...activeTextStyle} : {}

    return <Button
      style={{flex: 1, }}
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
    >
      <View style={[styles.tab, this.props.tabStyle, ]}>
        <Text style={[{color: textColor }, textStyle, finalActiveTextStyle]}>
          {name}
        </Text>
      </View>
    </Button>;
  },

  render() {
    const customPadding = this.props.tabBarPaddingHorizontal || 0
    const containerWidth = this.props.containerWidth - customPadding * 2;
    const numberOfTabs = this.props.tabs.length;
    const safeWidth = numberOfTabs ? containerWidth / numberOfTabs : 0;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: safeWidth,
      height: 4,
      backgroundColor: 'navy',
      bottom: 0,
    };

    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [customPadding,  safeWidth + customPadding],
    });
    return (
      <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, { paddingHorizontal: customPadding }]}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(name, page, isTabActive, this.props.goToPage);
        })}
        <Animated.View
          style={[
            tabUnderlineStyle,
            {
              transform: [
                { translateX },
              ]
            },
            this.props.tabBarUnderlineStyle,
          ]}
        />
      </View>
    );
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
});

module.exports = DefaultTabBar;

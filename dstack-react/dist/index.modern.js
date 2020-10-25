import React__default, { createContext, useReducer, useContext, forwardRef, useState, useRef, useEffect, useImperativeHandle, useMemo, memo, useCallback, Fragment, Component } from 'react';
import axios from 'axios';
import { get, isEqual, isString, debounce, unionBy } from 'lodash-es';
import cx from 'classnames';
import Highlight from 'react-highlight.js';
import { useTranslation } from 'react-i18next';
import copy from 'copy-to-clipboard';
import RcTooltip from 'rc-tooltip';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import MathJax from 'react-mathjax';
import RemarkMathPlugin from 'remark-math';
import { Portal } from 'react-portal';
import Select, { Option, OptGroup } from 'rc-select';
import Slider from 'rc-slider';
import Plot from 'react-plotly.js';
import { parse } from 'csv-string';
import { Link, Switch, Route } from 'react-router-dom';
import { v4 } from 'uuid';
import { useDrag, useDrop } from 'react-dnd';
export { DndProvider } from 'react-dnd';
import { useParams, useHistory } from 'react-router';
import useSWR from 'swr';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-r';
import 'prismjs/themes/prism.css';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _objectDestructuringEmpty(obj) {
  if (obj == null) throw new TypeError("Cannot destructure undefined");
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var actionsTypes = {
  FETCH_CURRENT_USER: 'app/user/FETCH',
  FETCH_CURRENT_USER_SUCCESS: 'app/user/FETCH_SUCCESS',
  FETCH_CURRENT_USER_FAIL: 'app/user/FETCH_FAIL',
  START_PROGRESS: 'app/START_PROGRESS',
  SET_PROGRESS: 'app/SET_PROGRESS',
  COMPLETE_PROGRESS: 'app/COMPLETE_PROGRESS',
  RESET_PROGRESS: 'app/RESET_PROGRESS'
};

var initialState = {
  currentUser: {
    loading: false,
    data: null
  },
  appProgress: {
    active: null,
    value: null
  }
};
var reducer = function reducer(state, action) {
  if (state === void 0) {
    state = initialState;
  }

  switch (action.type) {
    case actionsTypes.FETCH_CURRENT_USER:
      return _extends({}, state, {
        currentUser: _extends({}, state.currentUser, {
          loading: true
        })
      });

    case actionsTypes.FETCH_CURRENT_USER_SUCCESS:
      return _extends({}, state, {
        currentUser: _extends({}, state.currentUser, {
          data: action.payload,
          loading: false
        })
      });

    case actionsTypes.FETCH_FAIL:
      return _extends({}, state, {
        currentUser: _extends({}, state.currentUser, {
          loading: false
        })
      });

    case actionsTypes.START_PROGRESS:
      return _extends({}, state, {
        appProgress: _extends({}, state.appProgress, {
          active: true,
          value: null
        })
      });

    case actionsTypes.SET_PROGRESS:
      return _extends({}, state, {
        appProgress: _extends({}, state.appProgress, {
          value: action.payload
        })
      });

    case actionsTypes.COMPLETE_PROGRESS:
      return _extends({}, state, {
        appProgress: _extends({}, state.appProgress, {
          active: false,
          value: null
        })
      });

    case actionsTypes.RESET_PROGRESS:
      return _extends({}, state, {
        appProgress: _extends({}, state.appProgress, {
          active: null,
          value: null
        })
      });

    default:
      return state;
  }
};
var StateContext = createContext();
var AppStoreProvider = function AppStoreProvider(_ref) {
  var children = _ref.children,
      apiUrl = _ref.apiUrl;
  return /*#__PURE__*/React__default.createElement(StateContext.Provider, {
    value: useReducer(reducer, _extends({}, initialState, {
      apiUrl: apiUrl
    }))
  }, children);
};
var useAppStore = function useAppStore() {
  return useContext(StateContext);
};

var config = {
  DOCS_URL: 'http://docs.dstack.ai',
  LOGIN_URL: '/users/login',
  VERIFY_EMAIL_URL: '/users/verify',
  SUPPORT_URL: '/support/submit',
  SIGN_UP_URL: '/users/register',
  RESET_PASSWORD_URL: '/users/reset',
  UPDATE_PASSWORD_URL: '/users/update/password',
  USER_DATA_URL: '/users/remember',
  UPDATE_TOKEN_URL: '/users/update/token',
  UPDATE_SETTINGS_URL: '/users/update/settings',
  CHECK_USER: function CHECK_USER(userName) {
    return "/users/exists/" + userName;
  },
  STACKS_LIST: function STACKS_LIST(userName) {
    return "/stacks/" + userName;
  },
  DELETE_STACK: function DELETE_STACK() {
    return '/stacks/delete';
  },
  STACK_DETAILS: function STACK_DETAILS(userName, stack) {
    return "/stacks/" + userName + "/" + stack;
  },
  STACK_FRAME: function STACK_FRAME(userName, stack, frameId) {
    return "/frames/" + userName + "/" + stack + "/" + frameId;
  },
  STACK_ATTACHMENT: function STACK_ATTACHMENT(stack, frameId, id) {
    return "/attachs/" + stack + "/" + frameId + "/" + id;
  },
  STACK_UPDATE: '/stacks/update',
  STACK_PUSH: '/stacks/push',
  DASHBOARD_LIST: function DASHBOARD_LIST(userName) {
    return "/dashboards/" + userName;
  },
  DASHBOARD_DETAILS: function DASHBOARD_DETAILS(userName, id) {
    return "/dashboards/" + userName + "/" + id;
  },
  DASHBOARD_CREATE: '/dashboards/create',
  DASHBOARD_UPDATE: '/dashboards/update',
  DASHBOARD_DELETE: '/dashboards/delete',
  DASHBOARD_CARDS_INSERT: '/dashboards/cards/insert',
  DASHBOARD_CARDS_UPDATE: '/dashboards/cards/update',
  DASHBOARD_CARDS_DELETE: '/dashboards/cards/delete',
  JOB_LIST: function JOB_LIST(userName) {
    return "/jobs/" + userName;
  },
  JOB_DETAILS: function JOB_DETAILS(userName, id) {
    return "/jobs/" + userName + "/" + id;
  },
  JOB_CREATE: '/jobs/create',
  JOB_UPDATE: '/jobs/update',
  JOB_DELETE: '/jobs/delete',
  JOB_RUN: '/jobs/run',
  JOB_STOP: '/jobs/stop',
  DISCORD_URL: 'https://discord.gg/8xfhEYa',
  TWITTER_URL: 'https://twitter.com/dstackai',
  GITHUB_URL: 'https://github.com/dstackai',
  BLOG_URL: 'https://blog.dstack.ai',
  TOKEN_STORAGE_KEY: 'token'
};
var reportPlotPythonCode = "import matplotlib.pyplot as plt\nimport dstack as ds\n\nfig = plt.figure()\nplt.plot([1, 2, 3, 4], [1, 4, 9, 16])\n\nds.push_frame(\"simple\", fig, \"My first plot\")";
var installRPackageCode = 'install.packages("dstack")';
var reportPlotRCode = "library(ggplot2)\nlibrary(dstack)\n\ndf <- data.frame(x = c(1, 2, 3, 4), y = c(1, 4, 9, 16))\nimage <- ggplot(data = df, aes(x = x, y = y)) + geom_line()\n\npush_frame(\"simple\", image, \"My first plot\")";

var apiFabric = function apiFabric(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      apiUrl = _ref.apiUrl;

  var CancelToken = axios.CancelToken;
  var instance = axios.create({
    baseURL: apiUrl,
    crossDomain: true
  });
  instance.cancelToken = CancelToken;
  instance.interceptors.request.use(function (requestConfig) {
    var token = localStorage.getItem(config.TOKEN_STORAGE_KEY);
    requestConfig.headers.Authorization = token ? "Bearer " + token : '';
    return requestConfig;
  });
  instance.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (get(error, 'response.status', null) === 401) {
      return Promise.reject(error.response);
    } else if (get(error, 'response.status', null) === 400) {
      return Promise.reject(error.response);
    } else {
      return Promise.reject(error);
    }
  });
  return instance;
};

var image = require("./lock~ZBorChcU.svg");

var css = {"forbidden":"_3PN84","message":"_2i8KH"};

var AccessForbidden = function AccessForbidden(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React__default.createElement("div", {
    className: css.forbidden
  }, /*#__PURE__*/React__default.createElement("img", {
    src: image,
    alt: "",
    width: "85",
    height: "104"
  }), children && /*#__PURE__*/React__default.createElement("div", {
    className: css.message
  }, children));
};

var css$1 = {"avatar":"_3xvkT"};

var Avatar = forwardRef(function (_ref, ref) {
  var className = _ref.className,
      name = _ref.name,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'violet' : _ref$color,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'normal' : _ref$size,
      withBorder = _ref.withBorder,
      onClick = _ref.onClick;
  return /*#__PURE__*/React__default.createElement("div", {
    ref: ref,
    className: cx(css$1.avatar, className, color, size, {
      border: withBorder
    }),
    onClick: onClick
  }, name.slice(0, 2));
});

var css$2 = {"back":"_1MuhU"};

var BackButton = function BackButton(_ref) {
  var _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? 'button' : _ref$Component,
      children = _ref.children,
      className = _ref.className,
      props = _objectWithoutPropertiesLoose(_ref, ["Component", "children", "className"]);

  return /*#__PURE__*/React__default.createElement(Component, _extends({
    className: cx(css$2.back, className)
  }, props), /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-arrow-left"
  }), children);
};

var css$3 = {"button":"_2lKoS","spinner":"_31PPt"};

var css$4 = {"spinner":"_3XhrC","spinner-animation":"_2UA3s"};

var COLORS = {
  white: '#fff',
  blue: '#507CD0'
};

var Spinner = function Spinner(_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? 22 : _ref$size,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'white' : _ref$color,
      isShown = _ref.isShown,
      className = _ref.className,
      align = _ref.align;
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$4.spinner, className, align, {
      show: isShown
    })
  }, /*#__PURE__*/React__default.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 22 22",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React__default.createElement("path", {
    d: "M11.7046 18.9689C13.3618 18.8224 14.9321 18.1628 16.1969 17.0821C17.4617 16.0014 18.3581 14.5532 18.7614 12.9392C19.1647 11.3252 19.0548 9.62557 18.4469 8.07695C17.839 6.52832 16.7635 5.20773 15.37 4.29897C13.9765 3.39021 12.3343 2.9385 10.672 3.00671C9.00979 3.07491 7.41015 3.65964 6.09577 4.67951C4.78139 5.69938 3.81766 7.10365 3.33871 8.69687C2.85976 10.2901 2.88943 11.993 3.42358 13.5686L5.19569 12.9678C4.78648 11.7607 4.76375 10.4561 5.13067 9.23556C5.4976 8.01499 6.23591 6.93918 7.24286 6.15785C8.24981 5.37653 9.4753 4.92857 10.7488 4.87632C12.0222 4.82406 13.2803 5.17012 14.3478 5.86632C15.4154 6.56253 16.2394 7.57423 16.7051 8.76064C17.1708 9.94704 17.255 11.2491 16.946 12.4856C16.6371 13.7221 15.9503 14.8316 14.9814 15.6595C14.0124 16.4875 12.8094 16.9927 11.5398 17.105L11.7046 18.9689Z",
    fill: "url(#paint0_linear)"
  }), /*#__PURE__*/React__default.createElement("defs", null, /*#__PURE__*/React__default.createElement("linearGradient", {
    id: "paint0_linear",
    x1: "13.5",
    y1: "18",
    x2: "4",
    y2: "13",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React__default.createElement("stop", {
    stopColor: COLORS[color]
  }), /*#__PURE__*/React__default.createElement("stop", {
    offset: "1",
    stopColor: COLORS[color],
    stopOpacity: "0.2"
  })))));
};

var Button = forwardRef(function (_ref, ref) {
  var _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? 'button' : _ref$Component,
      children = _ref.children,
      className = _ref.className,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'normal' : _ref$size,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'default' : _ref$color,
      _ref$variant = _ref.variant,
      variant = _ref$variant === void 0 ? 'default' : _ref$variant,
      _ref$fullWidth = _ref.fullWidth,
      fullWidth = _ref$fullWidth === void 0 ? false : _ref$fullWidth,
      isShowSpinner = _ref.isShowSpinner,
      props = _objectWithoutPropertiesLoose(_ref, ["Component", "children", "className", "size", "color", "variant", "fullWidth", "isShowSpinner"]);

  return /*#__PURE__*/React__default.createElement(Component, _extends({
    ref: ref,
    className: cx(css$3.button, size, "color-" + color, "variant-" + variant, className, {
      'full-width': fullWidth
    })
  }, props), isShowSpinner && /*#__PURE__*/React__default.createElement(Spinner, {
    className: css$3.spinner,
    color: "white",
    isShown: true
  }), children);
});

var css$5 = {"checkbox":"_3lqFk","toggle-label":"_1aLAG","label":"_2PZb-","wrapper":"_2Vufp","mark":"_2Pb2f"};

var CheckboxField = function CheckboxField(_ref) {
  var className = _ref.className,
      value = _ref.value,
      disabled = _ref.disabled,
      _ref$appearance = _ref.appearance,
      appearance = _ref$appearance === void 0 ? 'checkbox' : _ref$appearance,
      _ref$align = _ref.align,
      align = _ref$align === void 0 ? 'left' : _ref$align,
      label = _ref.label,
      onLabel = _ref.onLabel,
      offLabel = _ref.offLabel,
      children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, ["className", "value", "disabled", "appearance", "align", "label", "onLabel", "offLabel", "children"]);

  return /*#__PURE__*/React__default.createElement("label", {
    className: cx(css$5.checkbox, className, appearance, align, {
      disabled: disabled
    })
  }, /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("input", _extends({
    type: "checkbox",
    checked: value
  }, props)), offLabel && /*#__PURE__*/React__default.createElement("span", {
    className: cx(css$5['toggle-label'], 'off'),
    dangerouslySetInnerHTML: {
      __html: offLabel
    }
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$5.wrapper
  }, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$5.mark, 'mdi', 'mdi-check', {
      'toggle-color': !(onLabel && offLabel)
    })
  })), onLabel && /*#__PURE__*/React__default.createElement("span", {
    className: cx(css$5['toggle-label'], 'on'),
    dangerouslySetInnerHTML: {
      __html: onLabel
    }
  }), label && /*#__PURE__*/React__default.createElement("span", {
    className: css$5.label
  }, label)), children);
};

var css$6 = {"copy":"_3J5hd","message":"_3RWnQ","button":"_2YqEb","icon":"_25GMO"};

var Copy = function Copy(_ref) {
  var children = _ref.children,
      className = _ref.className,
      copyText = _ref.copyText,
      successMessage = _ref.successMessage,
      buttonTitle = _ref.buttonTitle;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useState = useState(false),
      isShowMessage = _useState[0],
      setIsShowMessage = _useState[1];

  var onCLick = function onCLick() {
    copy(copyText);
    setIsShowMessage(true);
    setTimeout(function () {
      return setIsShowMessage(false);
    }, 3000);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$6.copy, className)
  }, children ? children({
    onClick: onCLick
  }) : /*#__PURE__*/React__default.createElement("div", {
    className: css$6.button,
    onClick: onCLick
  }, /*#__PURE__*/React__default.createElement("span", {
    className: cx(css$6.icon, 'mdi mdi-content-copy')
  }), buttonTitle ? buttonTitle : t('copy')), /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$6.message, {
      'is-show': isShowMessage
    })
  }, successMessage ? successMessage : t('copied')));
};

var css$7 = {"code":"_3gARj","copy":"_m44gX","icon":"_ZmZbg"};

var CodeViewer = function CodeViewer(_ref) {
  var className = _ref.className,
      language = _ref.language,
      children = _ref.children,
      fontSize = _ref.fontSize;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$7.code, className, fontSize && "font-size-" + fontSize)
  }, /*#__PURE__*/React__default.createElement(Highlight, {
    language: language
  }, children), /*#__PURE__*/React__default.createElement(Copy, {
    className: css$7.copy,
    copyText: children,
    successMessage: t('snippetIsCopied')
  }));
};

var css$8 = {"dropdown":"_1qRCw","button":"_fzNEm","menu":"_AJ1Y3","item":"_3lbfY"};

var Dropdown = function Dropdown(_ref) {
  var className = _ref.className,
      buttonClassName = _ref.buttonClassName,
      children = _ref.children,
      items = _ref.items;

  var _useState = useState(false),
      isShow = _useState[0],
      setIsShow = _useState[1];

  var buttonRef = useRef(null);
  var dropdownRef = useRef(null);
  useEffect(function () {
    document.body.addEventListener('click', outlineClickHandle);
    return function () {
      return document.body.removeEventListener('click', outlineClickHandle);
    };
  });

  var outlineClickHandle = function outlineClickHandle(event) {
    var targetElement = event.target;

    do {
      if (targetElement === buttonRef.current || targetElement === dropdownRef.current) return;
      targetElement = targetElement.parentNode;
    } while (targetElement);

    if (isShow) setIsShow(false);
  };

  var onCLickButton = function onCLickButton(event) {
    clickStopPropagation(event);
    setIsShow(!isShow);
  };

  var clickStopPropagation = function clickStopPropagation(event) {
    event.stopPropagation();
    event.preventDefault();
  };

  var onCLickItem = function onCLickItem(item) {
    return function () {
      setIsShow(!isShow);
      if (item.onClick) item.onClick();
    };
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$8.dropdown, className, {
      active: isShow
    })
  }, /*#__PURE__*/React__default.createElement(RcTooltip, {
    arrowContent: null,
    visible: isShow,
    placement: "bottomRight",
    destroyTooltipOnHide: true,
    align: {
      offset: [0, 0]
    },
    overlay: /*#__PURE__*/React__default.createElement("div", {
      className: cx(css$8.menu, 'show'),
      ref: dropdownRef,
      onClick: clickStopPropagation
    }, items.map(function (i, index) {
      return /*#__PURE__*/React__default.createElement("div", {
        key: index,
        className: css$8.item,
        onClick: onCLickItem(i)
      }, i.title);
    }))
  }, children ? React__default.cloneElement(children, {
    onClick: onCLickButton,
    ref: buttonRef
  }) : /*#__PURE__*/React__default.createElement("div", {
    ref: buttonRef,
    className: cx(css$8.button, buttonClassName),
    onClick: onCLickButton
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-dots-vertical"
  }))));
};

var unicodeBase64Decode = function unicodeBase64Decode(text) {
  try {
    var decodeData = window.atob(text);
    return decodeURIComponent(Array.prototype.map.call(decodeData, function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch (e) {
    return null;
  }
};

var formatBytes = function formatBytes(bytes, decimals) {
  if (bytes === 0) return '0 Bytes';
  var k = 1024;
  var dm = decimals <= 0 ? 0 : decimals || 2;
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

var parseStackParams = (function (attachments, tab) {
  var fields = {};
  if (!attachments || !attachments.length) return;
  attachments.forEach(function (i) {
    Object.keys(i.params).forEach(function (key) {
      var _i$params$tab$value, _i$params$tab$key;

      if (tab && ((_i$params$tab$value = i.params[tab.value]) === null || _i$params$tab$value === void 0 ? void 0 : _i$params$tab$value.type) !== 'tab' && ((_i$params$tab$key = i.params[tab.key]) === null || _i$params$tab$key === void 0 ? void 0 : _i$params$tab$key.title) !== tab.value) return;
      if (i.params[key] instanceof Object) return;
      if (fields[key]) fields[key].options.push(i.params[key]);else fields[key] = {
        options: [i.params[key]]
      };
    });
  });
  Object.keys(fields).forEach(function (key) {
    if (typeof fields[key].options[0] === 'string') {
      fields[key].type = 'select';
      fields[key].options = fields[key].options.filter(function (a, b) {
        return fields[key].options.indexOf(a) === b;
      }).map(function (i) {
        return {
          label: i,
          value: i
        };
      });
    }

    if (typeof fields[key].options[0] === 'boolean') {
      fields[key].type = 'checkbox';
    }

    if (typeof fields[key].options[0] === 'number') {
      var options = fields[key].options;
      fields[key].type = 'slider';
      fields[key].min = Math.min.apply(null, options);
      fields[key].max = Math.max.apply(null, options);
      fields[key].options = {};
      options.filter(function (a, b) {
        return options.indexOf(a) === b;
      }).forEach(function (i) {
        return fields[key].options[i] = i;
      });
    }
  });
  return fields;
});

var parseStackTabs = (function (attachments) {
  var tabs = [];
  if (!attachments || !attachments.length) return;
  attachments.forEach(function (i) {
    Object.keys(i.params).forEach(function (key) {
      if (i.params[key] instanceof Object && i.params[key].type === 'tab') {
        var tab = i.params[key].title || key;
        if (!tabs.find(function (i) {
          return i.value === tab;
        })) tabs.push({
          label: tab,
          value: tab,
          key: key
        });
      }
    });
  });
  return tabs;
});

var getFormattedDuration = (function (duration) {
  if (duration < 1000) return '0sec';
  var string = '';
  var momentDuration = moment.duration(duration);
  var hours = momentDuration.hours();
  var minutes = momentDuration.minutes();
  var seconds = momentDuration.seconds();
  if (hours) string += moment.duration(hours, 'hours').as('hours') + "h";
  if (minutes) string += " " + moment.duration(minutes, 'minutes').as('minutes') + "min";
  if (seconds) string += " " + moment.duration(seconds, 'seconds').asSeconds() + "sec";
  return string;
});

var fileToBase64 = function fileToBase64(file) {
  try {
    return Promise.resolve(new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function () {
        return resolve(reader.result.split(',')[1]);
      };

      reader.onerror = function (error) {
        return reject(error);
      };
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var fetcher = function fetcher(url, responseDataFormat) {
  if (responseDataFormat === void 0) {
    responseDataFormat = function responseDataFormat(data) {
      return data;
    };
  }

  try {
    var token = localStorage.getItem(config.TOKEN_STORAGE_KEY);
    return Promise.resolve(_catch(function () {
      return Promise.resolve(axios({
        url: url,
        headers: {
          Authorization: token ? "Bearer " + token : ''
        }
      })).then(function (request) {
        return responseDataFormat(request.data);
      });
    }, function (e) {
      var errorBody = null;
      var status = null;

      try {
        errorBody = JSON.parse(get(e, 'request.response'));
      } catch (e) {
        console.log(e);
      }

      try {
        status = get(e, 'request.status');
      } catch (e) {
        console.log(e);
      }

      var error = new Error('An error occurred while fetching the data.');
      error.info = errorBody;
      error.status = status;
      throw error;
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};

var isSignedIn = function isSignedIn() {
  var token = localStorage.getItem(config.TOKEN_STORAGE_KEY);
  return Boolean(token && token.length);
};

var css$9 = {"dnd":"_3uYii","fileWrapper":"_1GUx_","file":"_2LG6L","fileExtend":"_3w6--","fileSection":"_B8y5t","fileName":"_3Juxo","fileSize":"_3G6N8","fileRemove":"_16dzP","placeholder":"_Wr_Zp","button":"_14ku1","loading":"_2KndP","progressBar":"_DHbC1","progress":"_2-dth","animate-stripes":"_1Iecq"};

var FileDragnDrop = function FileDragnDrop(_ref, ref) {
  var formats = _ref.formats,
      className = _ref.className,
      loading = _ref.loading,
      _ref$progressPercent = _ref.progressPercent,
      progressPercent = _ref$progressPercent === void 0 ? null : _ref$progressPercent,
      onChange = _ref.onChange;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var inputRef = useRef(null);

  var _useState = useState(false),
      active = _useState[0],
      setActive = _useState[1];

  var _useState2 = useState(),
      selectedFile = _useState2[0],
      setSelectedFile = _useState2[1];

  var isDidMount = useRef(true);
  useImperativeHandle(ref, function () {
    return {
      clear: function clear() {
        return removeFile();
      }
    };
  });
  useEffect(function () {
    if (!isDidMount.current) {
      if (onChange) onChange(selectedFile);
    } else isDidMount.current = false;
  }, [selectedFile]);

  var onClick = function onClick(event) {
    event.preventDefault();
    if (inputRef.current) inputRef.current.click();
  };

  var preventStop = function preventStop(event) {
    event.preventDefault();
    event.stopPropagation();
  };

  var onDrop = function onDrop(event) {
    preventStop(event);
    setActive(false);
    var _event$dataTransfer$f = event.dataTransfer.files,
        file = _event$dataTransfer$f[0];
    if (file && checkAvailableExtension(file)) setSelectedFile(file);
  };

  var onDragEnter = function onDragEnter(event) {
    preventStop(event);
    setActive(true);
  };

  var onDragLeave = function onDragLeave(event) {
    preventStop(event);
    setActive(false);
  };

  var onChangeInput = function onChangeInput(event) {
    var _event$target$files = event.target.files,
        file = _event$target$files[0];
    if (file && checkAvailableExtension(file)) setSelectedFile(file);
  };

  var removeFile = function removeFile() {
    setSelectedFile(null);
  };

  var checkAvailableExtension = function checkAvailableExtension(file) {
    var ext = '.' + file.name.split('.').pop();
    var isAvailable;
    if (formats && formats.length) isAvailable = formats.some(function (format) {
      if (format === '.jpg' || format === '.jpeg') return ext === '.jpg' || ext === '.jpeg';else return format === ext;
    });else isAvailable = true;
    return isAvailable;
  };

  if (loading) return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$9.dnd, className, {
      active: active
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$9.loading
  }, t('Uploading'), "\u2026", typeof progressPercent === 'number' && progressPercent + "%"), typeof progressPercent === 'number' && /*#__PURE__*/React__default.createElement("div", {
    className: css$9.progressBar
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$9.progress,
    style: {
      width: progressPercent + "%"
    }
  })));
  if (selectedFile) return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$9.fileWrapper, className)
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$9.file
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$9.fileExtend
  }, selectedFile.name.split('.').pop()), /*#__PURE__*/React__default.createElement("div", {
    className: css$9.fileSection
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$9.fileName
  }, selectedFile.name), /*#__PURE__*/React__default.createElement("div", {
    className: css$9.fileSize
  }, formatBytes(selectedFile.size))), /*#__PURE__*/React__default.createElement("div", {
    onClick: removeFile,
    className: cx(css$9.fileRemove, 'mdi mdi-close')
  })));
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$9.dnd, className, {
      active: active
    }),
    onDrop: onDrop,
    onDragEnter: onDragEnter,
    onDragOver: onDragEnter,
    onDragLeave: onDragLeave
  }, /*#__PURE__*/React__default.createElement("input", {
    ref: inputRef,
    onChange: onChangeInput,
    type: "file"
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$9.placeholder
  }, t('dragHereAFile'), '', Boolean(formats) && "(" + formats.join(', ') + ")", ' ', t('or'), ' '), /*#__PURE__*/React__default.createElement(Button, {
    className: css$9.button,
    variant: "contained",
    color: "primary",
    size: "small",
    onClick: onClick
  }, t('chooseAFile')));
};

var FileDragnDrop$1 = forwardRef(FileDragnDrop);

var css$a = {"loader":"_18_Ho","text":"_3dZu_","stacks-pulse":"_350eA","grid":"_Uki0v","item":"_MvjKB","pic":"_Pc6fT","section":"_2EIKh"};

var Loader = function Loader(_ref) {
  _objectDestructuringEmpty(_ref);

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$a.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$a.text
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$a.grid
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$a.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$a.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$a.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$a.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$a.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$a.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$a.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$a.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$a.section
  }))));
};

var MarkdownRender = function MarkdownRender(props) {
  var newProps = _extends({}, props, {
    plugins: [RemarkMathPlugin],
    renderers: _extends({}, props.renderers, {
      math: function math(props) {
        return /*#__PURE__*/React__default.createElement(MathJax.Node, {
          formula: props.value
        });
      },
      inlineMath: function inlineMath(props) {
        return /*#__PURE__*/React__default.createElement(MathJax.Node, {
          inline: true,
          formula: props.value
        });
      }
    })
  });

  return /*#__PURE__*/React__default.createElement(MathJax.Provider, {
    input: "tex"
  }, /*#__PURE__*/React__default.createElement(ReactMarkdown, newProps));
};

var css$b = {"modal":"_3FQ59","dialog":"_268e0","close":"_1Y7yz","title":"_knxNI"};

var Modal = function Modal(_ref) {
  var title = _ref.title,
      className = _ref.className,
      dialogClassName = _ref.dialogClassName,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'big' : _ref$size,
      onClose = _ref.onClose,
      isShow = _ref.isShow,
      children = _ref.children,
      withCloseButton = _ref.withCloseButton;

  var onClickByLayer = function onClickByLayer(event) {
    if (event.currentTarget === event.target && onClose) onClose();
  };

  return /*#__PURE__*/React__default.createElement(Portal, null, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$b.modal, className, {
      show: isShow
    }),
    onClick: onClickByLayer
  }, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$b.dialog, size, dialogClassName)
  }, withCloseButton && /*#__PURE__*/React__default.createElement("span", {
    className: cx(css$b.close, 'mdi mdi-close'),
    onClick: onClose
  }), title && /*#__PURE__*/React__default.createElement("div", {
    className: css$b.title
  }, title), children)));
};

var image$1 = require("./404~FXFqzVOe.svg");

var css$c = {"not-found":"_tAZyq","message":"_3Ok1U","help":"_Aa8x8"};

var NotFound = function NotFound(_ref) {
  var children = _ref.children;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$c['not-found']
  }, /*#__PURE__*/React__default.createElement("img", {
    src: image$1,
    alt: "",
    width: "224",
    height: "77"
  }), children && /*#__PURE__*/React__default.createElement("div", {
    className: css$c.message
  }, children), /*#__PURE__*/React__default.createElement("div", {
    className: css$c.help
  }, t('needHelpWWriteToUsOn'), ' ', /*#__PURE__*/React__default.createElement("a", {
    target: "_blank",
    href: config.TWITTER_URL
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-twitter"
  }), " Twitter"), ', ', /*#__PURE__*/React__default.createElement("a", {
    target: "_blank",
    href: config.GITHUB_URL
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-github-circle"
  }), "GitHub"), ' ', t('or'), ' ', /*#__PURE__*/React__default.createElement("a", {
    target: "_blank",
    href: config.DISCORD_URL
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-discord"
  }), "Discord")));
};

var usePrevious = (function (value) {
  var ref = useRef(value);
  useEffect(function () {
    ref.current = value;
  }, [value]);
  return ref.current;
});

var css$d = {"bar":"_12oWc","progress":"_3JWjz"};

var ProgressBar = function ProgressBar(_ref) {
  var className = _ref.className,
      isActive = _ref.isActive,
      globalProgress = _ref.progress;

  var _useState = useState(0),
      progress = _useState[0],
      setProgress = _useState[1];

  var _useState2 = useState(1000),
      width = _useState2[0],
      setWidth = _useState2[1];

  var prevIsActive = usePrevious(isActive);
  var step = useRef(0.01);
  var currentProgress = useRef(0);
  var requestFrame = useRef(null);
  var isActiveRef = useRef(false);
  var ref = useRef(null);
  useEffect(function () {
    isActiveRef.current = isActive;

    if (isActive) {
      setProgress(0);
      step.current = 0.01;
      currentProgress.current = 0;
      startCalculateProgress();
    }

    if (prevIsActive === true && isActive === false) {
      setProgress(100);
      setTimeout(function () {
        return setProgress(0);
      }, 800);
    }

    if (isActive === null) {
      setProgress(0);
    }

    if (!isActive && requestFrame.current) {
      cancelAnimationFrame(requestFrame.current);
    }
  }, [isActive]);
  useEffect(function () {
    if (globalProgress !== null) setProgress(globalProgress);else {
      setProgress(0);
    }
  }, [globalProgress]);
  useEffect(function () {
    window.addEventListener('resize', onResize);
    if (ref.current) setWidth(ref.current.offsetWidth);
    return function () {
      return window.removeEventListener('resize', onResize);
    };
  }, []);

  var calculateProgress = function calculateProgress() {
    currentProgress.current += step.current;
    var progress = Math.round(Math.atan(currentProgress.current) / (Math.PI / 2) * 100 * 1000) / 1000;
    setProgress(progress);
    if (progress > 70) step.current = 0.005;
    if (progress >= 100 || !isActiveRef.current) cancelAnimationFrame(requestFrame.current);
    if (isActiveRef.current) requestFrame.current = requestAnimationFrame(calculateProgress);
  };

  var startCalculateProgress = function startCalculateProgress() {
    requestAnimationFrame(calculateProgress);
  };

  var onResize = function onResize() {
    if (ref.current) setWidth(ref.current.offsetWidth);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    ref: ref,
    className: cx(css$d.bar, className)
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$d.progress,
    style: {
      width: progress + "%",
      backgroundSize: width + "px 5px"
    }
  }));
};

var css$e = {"field":"_3WCaE","input":"_9Tk5W","label":"_1mHtq","error":"_3jOrk"};

var TextField = function TextField(_ref) {
  var label = _ref.label,
      className = _ref.className,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'normal' : _ref$size,
      _ref$errors = _ref.errors,
      errors = _ref$errors === void 0 ? [] : _ref$errors,
      props = _objectWithoutPropertiesLoose(_ref, ["label", "className", "size", "errors"]);

  var hasErrors = Boolean(errors.length);
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$e.field, className, size, {
      disabled: props.disabled
    })
  }, /*#__PURE__*/React__default.createElement("label", null, label && /*#__PURE__*/React__default.createElement("div", {
    className: css$e.label
  }, label), /*#__PURE__*/React__default.createElement("div", {
    className: css$e.input
  }, /*#__PURE__*/React__default.createElement("input", _extends({
    className: cx({
      error: hasErrors
    })
  }, props))), hasErrors && /*#__PURE__*/React__default.createElement("div", {
    className: css$e.error
  }, errors.join(', '))));
};

var css$f = {"search":"_3s1gr","field":"_17rsB","clear":"_3oKZ5","button":"_3BfRl"};

var SearchField = function SearchField(_ref) {
  var className = _ref.className,
      showEverything = _ref.showEverything,
      isDark = _ref.isDark,
      props = _objectWithoutPropertiesLoose(_ref, ["className", "showEverything", "isDark"]);

  var _useState = useState(showEverything || props.value && props.value.length),
      isShow = _useState[0],
      setIsShow = _useState[1];

  var clear = function clear() {
    if (props.onChange) props.onChange('');
    if (!showEverything) setIsShow(false);
  };

  var onChangeHandle = function onChangeHandle(event) {
    if (props.onChange) props.onChange(event.target.value);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$f.search, className, {
      'is-dark': isDark
    })
  }, isShow && /*#__PURE__*/React__default.createElement(TextField, _extends({}, props, {
    onChange: onChangeHandle,
    className: css$f.field
  })), isShow && Boolean(props.value && props.value.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$f.clear,
    onClick: clear
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-close"
  })), isShow && !Boolean(props.value && props.value.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$f.clear
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-magnify"
  })), !isShow && /*#__PURE__*/React__default.createElement("div", {
    className: css$f.button,
    onClick: function onClick() {
      return setIsShow(true);
    }
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-magnify"
  })));
};

var css$g = {"field":"_2jF9E","label":"_iehEi","rcSelectLoadingIcon":"_VtsrG","rcSelectDropdownSlideUpIn":"_27wr-","rcSelectDropdownSlideUpOut":"_1QVN6","rcSelectDropdownSlideDownIn":"_1vYLX","rcSelectDropdownSlideDownOut":"_1-lNh","select-field":"_1mUh_","select-field-selector":"_V9Ufm","select-field-arrow":"_c4k8s","mdi":"_2hNDK","select-field-selection-placeholder":"_2Vdv0","select-field-selection-search":"_3GdNa","select-field-selection-search-input":"_3BOaB","select-field-selection-item":"_2uDu7","select-field-item-option-checkbox":"_2K_G1","select-field-selection-item-remove":"_1k1IW","select-field-show-search":"_3EVnU","select-field-show-arrow":"_1xlmm","select-field-open":"__jEZ1","select-field-multiple":"_2YFSs","select-field-single":"_1n3qF","select-field-clear":"_Mg5xq","select-field-item-option-state":"_2yGkG","select-field-selection__choice-zoom":"_3NUb5","select-field-selection__choice-zoom-appear":"_ZO73y","select-field-selection__choice-zoom-leave":"_2i54q","select-field-dropdown":"_14ngc"};

var allValue = 'all';

var SelectField = function SelectField(_ref) {
  var _ref$align = _ref.align,
      align = _ref$align === void 0 ? 'left' : _ref$align,
      label = _ref.label,
      disabled = _ref.disabled,
      placeholder = _ref.placeholder,
      _ref$value = _ref.value,
      propValue = _ref$value === void 0 ? [] : _ref$value,
      className = _ref.className,
      mode = _ref.mode,
      onChange = _ref.onChange,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? [] : _ref$options,
      _ref$showSearch = _ref.showSearch,
      showSearch = _ref$showSearch === void 0 ? true : _ref$showSearch,
      props = _objectWithoutPropertiesLoose(_ref, ["align", "label", "disabled", "placeholder", "value", "className", "mode", "onChange", "options", "showSearch"]);

  var onChangeHandle = function onChangeHandle(value) {
    if (value.indexOf(allValue) >= 0) if (value.length > options.length) value = [];else value = options.map(function (o) {
      return o.value;
    });
    if (onChange) onChange(value);
  };

  var onSelect = function onSelect() {};

  var onDeselect = function onDeselect() {};

  var renderOptions = function renderOptions() {
    return options.map(function (_ref2) {
      var value = _ref2.value,
          label = _ref2.label;
      return /*#__PURE__*/React__default.createElement(Option, {
        key: value,
        value: value
      }, mode === 'multiple' && /*#__PURE__*/React__default.createElement(CheckboxField, {
        readOnly: true,
        className: "select-field-item-option-checkbox",
        value: propValue.indexOf(value) >= 0
      }), /*#__PURE__*/React__default.createElement("span", {
        className: "select-field-item-option-label"
      }, label));
    });
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$g.field, className, align, {
      disabled: disabled
    })
  }, /*#__PURE__*/React__default.createElement(Select, _extends({
    value: propValue,
    prefixCls: "select-field",
    multiple: mode === 'multiple',
    showArrow: true,
    showSearch: showSearch,
    onSelect: onSelect,
    onDeselect: onDeselect,
    placeholder: placeholder,
    onChange: onChangeHandle,
    inputIcon: /*#__PURE__*/React__default.createElement("span", {
      className: "mdi mdi-chevron-down"
    })
  }, props), options.length && mode === 'multiple' && /*#__PURE__*/React__default.createElement(Option, {
    key: allValue,
    value: allValue
  }, /*#__PURE__*/React__default.createElement(CheckboxField, {
    readOnly: true,
    className: "select-field-item-option-checkbox",
    value: propValue.length === options.length
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "select-field-item-option-label"
  }, "Select all")), mode === 'multiple' ? /*#__PURE__*/React__default.createElement(OptGroup, null, renderOptions()) : renderOptions()), label && /*#__PURE__*/React__default.createElement("label", {
    className: css$g.label
  }, label));
};

var css$h = {"field":"_2_NXc","rcSliderTooltipZoomDownIn":"_2jvao","rcSliderTooltipZoomDownOut":"_2HgMB","slider":"_31Ylv","label":"_Zo_r8","rc-slider":"_1hLjI","rc-slider-rail":"_v9bxI","rc-slider-track":"__3emJ","rc-slider-handle":"_12sQ3","rc-slider-handle-dragging":"_2u63-","rc-slider-handle-click-focused":"_7xSSR","rc-slider-mark":"_1l2Qm","rc-slider-mark-text":"_2zf2c","rc-slider-mark-text-active":"_25tuh","rc-slider-step":"_3wC_L","rc-slider-dot":"_17-SM","rc-slider-dot-active":"_1eLwY","rc-slider-dot-reverse":"_Ewb1d","rc-slider-disabled":"_1YO43","rc-slider-vertical":"_12Juq","rc-slider-tooltip-zoom-down-enter":"_2a95b","rc-slider-tooltip-zoom-down-appear":"_2wvsD","rc-slider-tooltip-zoom-down-leave":"_3jMC3","rc-slider-tooltip-zoom-down-enter-active":"_1M8Be","rc-slider-tooltip-zoom-down-appear-active":"_3tu2z","rc-slider-tooltip-zoom-down-leave-active":"_P9_lk","rc-slider-tooltip":"_1PZK2","rc-slider-tooltip-hidden":"_2CvyB","rc-slider-tooltip-placement-top":"_qzmlA","rc-slider-tooltip-inner":"_27Bp4","rc-slider-tooltip-arrow":"_35-HY"};

var CustomHandle = function CustomHandle(props) {
  var style = {
    left: props.offset + '%',
    transform: 'translateX(-50%)'
  };
  return /*#__PURE__*/React__default.createElement("div", {
    className: props.className,
    key: props.index,
    style: style,
    "data-value": props.value
  });
};

var SliderField = function SliderField(_ref) {
  var className = _ref.className,
      disabled = _ref.disabled,
      label = _ref.label,
      onChange = _ref.onChange,
      name = _ref.name,
      _ref$align = _ref.align,
      align = _ref$align === void 0 ? 'left' : _ref$align,
      props = _objectWithoutPropertiesLoose(_ref, ["className", "disabled", "label", "onChange", "name", "align"]);

  var onChangeHandle = function onChangeHandle(value) {
    if (onChange) onChange({
      target: {
        value: value,
        name: name
      }
    });
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$h.field, className, align, {
      disabled: disabled
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$h.slider
  }, /*#__PURE__*/React__default.createElement(Slider, _extends({
    onChange: onChangeHandle,
    tipFormatter: function tipFormatter(value) {
      return "$" + value;
    },
    handle: CustomHandle
  }, props))), label && /*#__PURE__*/React__default.createElement("span", {
    className: css$h.label
  }, label));
};

var css$i = {"filters":"_kiZkv","select":"_4Up3c","field":"_3_9Ku"};

var StackFilters = function StackFilters(_ref) {
  var className = _ref.className,
      fields = _ref.fields,
      form = _ref.form,
      _onChange = _ref.onChange;
  var hasSelectField = useMemo(function () {
    return Object.keys(fields).some(function (key) {
      return fields[key].type === 'select';
    });
  }, [fields]);
  if (!Object.keys(fields).length) return null;
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$i.filters, className, {
      'with-select': hasSelectField
    })
  }, Object.keys(fields).map(function (key) {
    switch (fields[key].type) {
      case 'select':
        return /*#__PURE__*/React__default.createElement(SelectField, {
          key: "select-" + key,
          align: "bottom",
          className: cx(css$i.field, css$i.select),
          onChange: function onChange(value) {
            return _onChange(key, value);
          },
          label: key,
          name: key,
          options: fields[key].options,
          value: Array.isArray(form[key]) ? form[key] : [form[key]]
        });

      case 'checkbox':
        return /*#__PURE__*/React__default.createElement(CheckboxField, {
          key: "checkbox-" + key,
          className: css$i.field,
          onChange: _onChange,
          label: key,
          name: key,
          value: form[key]
        });

      case 'slider':
        return /*#__PURE__*/React__default.createElement(SliderField, {
          key: "slider-" + key,
          className: css$i.field,
          onChange: _onChange,
          align: "right",
          label: key,
          name: key,
          value: form[key],
          step: null,
          min: fields[key].min,
          max: fields[key].max,
          marks: fields[key].options
        });

      default:
        return null;
    }
  }));
};

var css$j = {"field":"_2DYF1","hidden":"_3z5o2"};

var StretchTitleField = function StretchTitleField(_ref) {
  var propValue = _ref.value,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? '' : _ref$placeholder,
      className = _ref.className,
      onChangeProp = _ref.onChange,
      props = _objectWithoutPropertiesLoose(_ref, ["value", "placeholder", "className", "onChange"]);

  var _useState = useState(propValue),
      value = _useState[0],
      set = _useState[1];

  var onChange = function onChange(event) {
    if (onChangeProp) onChangeProp(event.target.value);
    set(event.target.value);
  };

  useEffect(function () {
    set(propValue);
  }, [propValue]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$j.field, className)
  }, /*#__PURE__*/React__default.createElement("input", _extends({
    type: "text",
    placeholder: placeholder,
    value: value,
    onChange: onChange
  }, props)), /*#__PURE__*/React__default.createElement("div", {
    className: css$j.hidden
  }, value.length ? value : placeholder));
};

var css$k = {"tabs":"_-hQvT","tab":"_2dsXN","soon":"_2_DJa"};

var Tabs = function Tabs(_ref) {
  var className = _ref.className,
      value = _ref.value,
      tabs = _ref.tabs,
      onChange = _ref.onChange;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$k.tabs, className)
  }, tabs.map(function (i, index) {
    return /*#__PURE__*/React__default.createElement("div", {
      key: index,
      className: cx(css$k.tab, {
        active: value === i.value
      }),
      onClick: function onClick() {
        return onChange(i.value);
      }
    }, i.label, i.soon && /*#__PURE__*/React__default.createElement("span", {
      className: css$k.soon
    }, t('soon')));
  }));
};

var css$l = {"field":"_3PgPN","textarea":"_2Ok_K","label":"_1qnsP","error":"_1C6bH"};

var TextAreaField = function TextAreaField(_ref) {
  var label = _ref.label,
      className = _ref.className,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'normal' : _ref$size,
      _ref$errors = _ref.errors,
      errors = _ref$errors === void 0 ? [] : _ref$errors,
      props = _objectWithoutPropertiesLoose(_ref, ["label", "className", "size", "errors"]);

  var hasErrors = Boolean(errors.length);
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$l.field, className, size, {
      disabled: props.disabled
    })
  }, /*#__PURE__*/React__default.createElement("label", null, label && /*#__PURE__*/React__default.createElement("div", {
    className: css$l.label
  }, label), /*#__PURE__*/React__default.createElement("div", {
    className: css$l.textarea
  }, /*#__PURE__*/React__default.createElement("textarea", _extends({
    className: cx({
      error: hasErrors
    })
  }, props))), hasErrors && /*#__PURE__*/React__default.createElement("div", {
    className: css$l.error
  }, errors.join(', '))));
};

var css$m = {"tooltip":"_rE8Jn"};

var Tooltip = function Tooltip(_ref) {
  var children = _ref.children,
      overlayContent = _ref.overlayContent,
      _ref$arrowContent = _ref.arrowContent,
      arrowContent = _ref$arrowContent === void 0 ? null : _ref$arrowContent,
      _ref$placement = _ref.placement,
      placement = _ref$placement === void 0 ? 'bottomLeft' : _ref$placement,
      _ref$trigger = _ref.trigger,
      trigger = _ref$trigger === void 0 ? ['hover'] : _ref$trigger,
      _ref$overlayStyle = _ref.overlayStyle,
      overlayStyle = _ref$overlayStyle === void 0 ? {
    pointerEvents: 'none'
  } : _ref$overlayStyle,
      props = _objectWithoutPropertiesLoose(_ref, ["children", "overlayContent", "arrowContent", "placement", "trigger", "overlayStyle"]);

  return /*#__PURE__*/React__default.createElement(RcTooltip, _extends({
    overlayStyle: overlayStyle,
    arrowContent: arrowContent,
    placement: placement,
    trigger: trigger,
    overlay: /*#__PURE__*/React__default.createElement("div", {
      className: css$m.tooltip
    }, overlayContent)
  }, props), children);
};

var css$n = {"switcher":"_3NMzC"};

var ViewSwitcher = function ViewSwitcher(_ref) {
  var _ref$value = _ref.value,
      value = _ref$value === void 0 ? 'grid' : _ref$value,
      onChange = _ref.onChange,
      className = _ref.className;

  var _useState = useState(value),
      stateValue = _useState[0],
      setStateValue = _useState[1];

  useEffect(function () {
    if (value !== stateValue) setStateValue(value);
  }, [value]);

  var toggleValue = function toggleValue() {
    var newValue = stateValue === 'grid' ? 'list' : 'grid';
    setStateValue(newValue);
    if (onChange) onChange(newValue);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$n.switcher, stateValue, className),
    onClick: toggleValue
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-view-grid"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-view-list"
  }));
};

var Yield = function Yield(_ref) {
  var name = _ref.name,
      className = _ref.className,
      children = _ref.children;
  if (!name) return null;

  if (children) {
    var node = document && document.getElementById(name);
    if (!node) return null;
    return /*#__PURE__*/React__default.createElement(Portal, {
      node: node
    }, children);
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: className,
    id: name
  });
};

var css$o = {"table":"_2TzH3"};

var Table = function Table(_ref) {
  var data = _ref.data;
  var captions = data[0],
      rows = data.slice(1);
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$o.table
  }, /*#__PURE__*/React__default.createElement("table", null, /*#__PURE__*/React__default.createElement("thead", null, /*#__PURE__*/React__default.createElement("tr", null, captions.map(function (caption) {
    return /*#__PURE__*/React__default.createElement("th", {
      key: caption
    }, caption);
  }))), /*#__PURE__*/React__default.createElement("tbody", null, rows.map(function (row, index) {
    return /*#__PURE__*/React__default.createElement("tr", {
      key: index
    }, row.map(function (cell, i) {
      return /*#__PURE__*/React__default.createElement("td", {
        key: i
      }, cell);
    }));
  }))));
};

var isImageType = function isImageType(type) {
  return /^image/.test(type);
};
var base64ToJSON = function base64ToJSON(base64) {
  var parsedJSON;

  try {
    parsedJSON = JSON.parse(atob(base64));
  } catch (e) {
    console.log(e);
  }

  return parsedJSON;
};

var css$p = {"view":"_1T-AH","text":"_6S5f-","message":"_1p-0w"};

var base64ImagePrefixes = {
  'image/svg+xml': 'data:image/svg+xml;charset=utf-8;',
  'image/png': 'data:image/png;charset=utf-8;',
  'image/jpeg': 'data:image/jpeg;charset=utf-8;'
};

var View = function View(_ref) {
  var frameId = _ref.frameId,
      attachment = _ref.attachment,
      fullAttachment = _ref.fullAttachment,
      isList = _ref.isList,
      className = _ref.className,
      requestStatus = _ref.requestStatus;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var viewRef = useRef();

  var _useState = useState(1),
      tableScale = _useState[0],
      setTableScale = _useState[1];

  var _useState2 = useState(0),
      viewWidth = _useState2[0],
      setVieWidth = _useState2[1];

  var _useState3 = useState(false),
      noRender = _useState3[0],
      setNoRender = _useState3[1];

  var onResizeCard = function onResizeCard() {
    if (viewRef.current) {
      var containerWidth = viewRef.current.parentElement.offsetWidth;

      var _viewWidth = viewRef.current.offsetWidth / tableScale;

      var newScale = containerWidth / _viewWidth;
      if (newScale > 1) newScale = 1;
      setTableScale(newScale);
      setVieWidth(containerWidth);
    }
  };

  useEffect(function () {
    if (window && isList) window.addEventListener('resize', onResizeCard);
    return function () {
      if (window && isList) window.removeEventListener('resize', onResizeCard);
    };
  }, []);
  useEffect(function () {
    if (noRender) setNoRender(false);
  }, [noRender]);
  useEffect(function () {
    if (attachment && attachment['application'] === 'plotly') {
      setNoRender(true);
    }

    if (attachment && attachment['application'] === 'bokeh') {
      var Bokeh;
      var json = base64ToJSON(attachment.data);
      var version = get(attachment, 'settings.bokeh_version');

      if (version && parseInt(version.split('.')[0], 10) === 2) {
        Bokeh = window.Bokeh['2.2.1'];
      } else {
        Bokeh = window.Bokeh;
      }

      if (json && document.querySelector("#bokeh-" + frameId)) Bokeh.embed.embed_item(json, "bokeh-" + frameId);
    }

    if (isList) setTimeout(function () {
      return onResizeCard();
    }, 10);
  }, [attachment]);

  var renderImage = function renderImage() {
    if (!attachment.preview) return /*#__PURE__*/React__default.createElement("img", {
      src: base64ImagePrefixes[attachment['content_type']] + "base64," + attachment.data,
      alt: ""
    });else if (fullAttachment) {
      if (fullAttachment['download_url']) {
        return /*#__PURE__*/React__default.createElement("img", {
          src: fullAttachment['download_url'],
          alt: ""
        });
      } else return /*#__PURE__*/React__default.createElement("img", {
        src: base64ImagePrefixes[attachment['content_type']] + "base64," + attachment.data,
        alt: ""
      });
    }
    return null;
  };

  var renderCSV = function renderCSV() {
    var decodeCSV = unicodeBase64Decode(attachment.data);

    if (decodeCSV) {
      var data = parse(decodeCSV);
      if (Array.isArray(data) && data.length) return /*#__PURE__*/React__default.createElement(Table, {
        data: data
      });
    }

    return /*#__PURE__*/React__default.createElement("div", {
      className: css$p.text
    }, t('notSupportedAttachment'));
  };

  var renderPlotly = function renderPlotly() {
    var json = base64ToJSON(attachment.data);
    if (!json) return null;
    json.layout.width = viewWidth;
    json.layout.margin = 0;
    json.layout.autosize = true;
    if (json.config) json.config.responsive = true;else json.config = {
      responsive: true
    };
    return /*#__PURE__*/React__default.createElement(Plot, _extends({}, json, {
      style: {
        width: '100%',
        height: '100%'
      },
      useResizeHandler: true
    }));
  };

  var renderBokeh = function renderBokeh() {
    return /*#__PURE__*/React__default.createElement("div", {
      id: "bokeh-" + frameId
    });
  };

  var renderAttachment = function renderAttachment() {
    if (noRender) return null;
    if (requestStatus === 404 && isList) return /*#__PURE__*/React__default.createElement("div", {
      className: css$p.message
    }, t('notFound'));
    if (requestStatus === 404 && !isList) return /*#__PURE__*/React__default.createElement("div", {
      className: css$p.text
    }, t('noPreview'));
    if (attachment.preview && isList && isImageType(attachment['content_type'])) return /*#__PURE__*/React__default.createElement("div", {
      className: css$p.message
    }, t('noPreview'));

    switch (true) {
      case attachment['content_type'] === 'image/svg+xml':
      case attachment['content_type'] === 'image/png':
      case attachment['content_type'] === 'image/jpeg':
        return renderImage();

      case attachment['content_type'] === 'text/csv':
        return renderCSV();

      case attachment['application'] === 'plotly':
        return renderPlotly();

      case attachment['application'] === 'bokeh':
        return renderBokeh();

      case undefined:
      case isEqual(attachment, {}):
        return null;

      default:
        return /*#__PURE__*/React__default.createElement("div", {
          className: isList ? css$p.message : css$p.text
        }, t('notSupportedAttachment'));
    }
  };

  return /*#__PURE__*/React__default.createElement("div", {
    ref: viewRef,
    className: cx(css$p.view, className, {
      'table': attachment && attachment.data && attachment['content_type'] === 'text/csv',
      'bokeh': attachment && attachment.data && attachment['application'] === 'bokeh'
    }),
    style: attachment && attachment['content_type'] === 'text/csv' ? {
      transform: "scale(" + tableScale + ")"
    } : {}
  }, renderAttachment());
};

var areEqual = function areEqual(prevProps, nextProps) {
  return isEqual(prevProps.attachment, nextProps.attachment);
};

var View$1 = memo(View, areEqual);

var useIntersectionObserver = (function (callBack, _ref, deps) {
  var _ref$rootMargin = _ref.rootMargin,
      rootMargin = _ref$rootMargin === void 0 ? '0px' : _ref$rootMargin,
      _ref$threshold = _ref.threshold,
      threshold = _ref$threshold === void 0 ? 0.01 : _ref$threshold,
      _ref$root = _ref.root,
      root = _ref$root === void 0 ? null : _ref$root;
  var ref = useRef(null);
  var intersectionCallback = useCallback(function (_ref2) {
    var target = _ref2[0];

    if (target.isIntersecting) {
      callBack();
    }
  }, deps);
  useEffect(function () {
    var options = {
      root: root,
      rootMargin: rootMargin,
      threshold: threshold
    };
    var observer = new IntersectionObserver(intersectionCallback, options);
    if (ref && ref.current) observer.observe(ref.current);
    return function () {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, intersectionCallback]);
  return [ref];
});

var actionsTypes$1 = {
  FETCH: 'stacks/attachments/FETCH',
  FETCH_SUCCESS: 'stacks/attachments/FETCH_SUCCESS',
  FETCH_FAIL: 'stacks/attachments/FETCH_FAIL'
};

var initialState$1 = {
  data: {},
  errors: {},
  requestStatus: null
};
var reducer$1 = function reducer(state, action) {
  var _extends2, _extends3, _extends4, _extends5, _extends6, _extends7;

  if (state === void 0) {
    state = initialState$1;
  }

  switch (action.type) {
    case actionsTypes$1.FETCH:
      return _extends({}, state, {
        data: _extends({}, state.data, (_extends3 = {}, _extends3[action.meta.frameId] = _extends({}, state.data[action.meta.frameId], (_extends2 = {}, _extends2[action.meta.id] = _extends({}, state.data[action.meta.frameId] ? state.data[action.meta.frameId][action.meta.id] : {}, {
          loading: true,
          requestStatus: null,
          error: null
        }), _extends2)), _extends3))
      });

    case actionsTypes$1.FETCH_SUCCESS:
      return _extends({}, state, {
        data: _extends({}, state.data, (_extends5 = {}, _extends5[action.meta.frameId] = _extends({}, state.data[action.meta.frameId], (_extends4 = {}, _extends4[action.meta.id] = _extends({}, action.payload, {
          loading: false
        }), _extends4)), _extends5))
      });

    case actionsTypes$1.FETCH_FAIL:
      return _extends({}, state, {
        data: _extends({}, state.data, (_extends7 = {}, _extends7[action.meta.frameId] = _extends({}, state.data[action.meta.frameId], (_extends6 = {}, _extends6[action.meta.id] = {
          error: action.payload.error,
          requestStatus: action.payload.requestStatus,
          loading: false
        }, _extends6)), _extends7))
      });

    default:
      return state;
  }
};
var StateContext$1 = createContext();
var StateProvider = function StateProvider(_ref) {
  var children = _ref.children,
      apiUrl = _ref.apiUrl;
  return /*#__PURE__*/React__default.createElement(StateContext$1.Provider, {
    value: useReducer(reducer$1, _extends({}, initialState$1, {
      apiUrl: apiUrl
    }))
  }, children);
};
var useStateValue = function useStateValue() {
  return useContext(StateContext$1);
};

var actions = (function () {
  var _useStateValue = useStateValue(),
      apiUrl = _useStateValue[0].apiUrl,
      dispatch = _useStateValue[1];

  var fetchAttachment = function fetchAttachment(stack, frameId, id, onSuccess) {
    try {
      var token = localStorage.getItem(config.TOKEN_STORAGE_KEY);
      dispatch({
        type: actionsTypes$1.FETCH,
        meta: {
          frameId: frameId,
          id: id
        }
      });

      var _temp2 = _catch(function () {
        return Promise.resolve(axios({
          baseURL: apiUrl,
          url: config.STACK_ATTACHMENT(stack, frameId, id),
          headers: {
            Authorization: token ? "Bearer " + token : ''
          }
        })).then(function (request) {
          dispatch({
            type: actionsTypes$1.FETCH_SUCCESS,
            meta: {
              frameId: frameId,
              id: id
            },
            payload: request.data.attachment
          });
          if (onSuccess) onSuccess();
        });
      }, function (e) {
        var error = 'Unknown error';

        try {
          error = JSON.parse(get(e, 'request.response')).message;
        } catch (e) {
          console.log(error);
        }

        dispatch({
          type: actionsTypes$1.FETCH_FAIL,
          meta: {
            frameId: frameId,
            id: id
          },
          payload: {
            error: error
          }
        });
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return {
    fetchAttachment: fetchAttachment
  };
});

var css$q = {"attachment":"_3NILI","loading-pulse":"_IhCO3","view":"_3UWqG","text":"_MOcaD"};

var Attachment = function Attachment(_ref) {
  var id = _ref.id,
      className = _ref.className,
      frameId = _ref.frameId,
      isList = _ref.isList,
      withLoader = _ref.withLoader,
      stack = _ref.stack;

  var _actions = actions(),
      fetchAttachment = _actions.fetchAttachment;

  var _useStateValue = useStateValue(),
      _useStateValue$ = _useStateValue[0],
      data = _useStateValue$.data,
      apiUrl = _useStateValue$.apiUrl;

  var attachment = get(data, frameId + "." + id, {});
  var loading = attachment.loading,
      error = attachment.error,
      requestStatus = attachment.requestStatus;

  var _useState = useState(false),
      loadingFullAttachment = _useState[0],
      setLoadingFullAttachment = _useState[1];

  var _useState2 = useState(null),
      fullAttachment = _useState2[0],
      setFullAttachment = _useState2[1];

  var prevAttachment = usePrevious(attachment);

  var fetchFullAttachment = function fetchFullAttachment() {
    try {
      var _temp3 = function _temp3() {
        setLoadingFullAttachment(false);
      };

      setLoadingFullAttachment(true);

      var _temp4 = _catch(function () {
        var url = config.STACK_ATTACHMENT(stack, frameId, id) + '?download=true';
        return Promise.resolve(axios({
          baseUrl: apiUrl,
          url: url
        })).then(function (_ref2) {
          var data = _ref2.data;
          setFullAttachment(data.attachment);
        });
      }, function (e) {
        console.log(e);
      });

      return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp3) : _temp3(_temp4));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  useEffect(function () {
    if (!isList && attachment && !isEqual(prevAttachment, attachment) && attachment.preview && isImageType(attachment['content_type'])) {
      fetchFullAttachment();
    }
  }, [data]);
  useEffect(function () {
    if (!isList && typeof id === 'number' && frameId && (!attachment.data && !error || (attachment === null || attachment === void 0 ? void 0 : attachment.index) !== id)) {
      fetchAttachment(stack, frameId, id);
    }
  }, [id, frameId]);

  var _useIntersectionObser = useIntersectionObserver(function () {
    if (isList && !loading && (!attachment.data && !error || attachment.data && attachment.index !== id)) fetchAttachment(stack, frameId, id);
  }, {}, [id, frameId, data]),
      ref = _useIntersectionObser[0];

  return /*#__PURE__*/React__default.createElement("div", {
    ref: ref,
    className: cx(css$q.attachment, className, {
      'is-list': isList,
      loading: loading && withLoader || loadingFullAttachment
    })
  }, !loading && /*#__PURE__*/React__default.createElement(View$1, {
    requestStatus: requestStatus,
    className: css$q.view,
    isList: isList,
    fullAttachment: fullAttachment,
    attachment: attachment
  }));
};

var chartIcon = require("./chart~FgFRCRzg.svg");

var css$r = {"item":"_fLtf5","name":"_147V3","delete":"_2PoaL","icon":"_3yxhI","top":"_3aJqR","date":"_2c9og"};

var Item = function Item(_ref) {
  var className = _ref.className,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? 'div' : _ref$Component,
      data = _ref.data,
      deleteAction = _ref.deleteAction,
      renderContent = _ref.renderContent,
      rest = _objectWithoutPropertiesLoose(_ref, ["className", "Component", "data", "deleteAction", "renderContent"]);

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var ref = useRef(null);

  var onClickDelete = function onClickDelete(event) {
    event.stopPropagation();
    event.preventDefault();
    deleteAction(data.name);
  };

  return /*#__PURE__*/React__default.createElement(Component, _extends({
    className: cx(css$r.item, className),
    ref: ref
  }, rest), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.icon
  }, /*#__PURE__*/React__default.createElement("img", {
    src: chartIcon,
    alt: ""
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.top
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$r.name
  }, data.name), /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-lock" + (data["private"] ? '' : '-open')
  }), renderContent && /*#__PURE__*/React__default.createElement("div", {
    className: css$r.additional
  }, renderContent(data))), data.head && /*#__PURE__*/React__default.createElement("div", {
    className: css$r.date
  }, t('updated'), " ", moment(data.head.timestamp).format('L')), deleteAction && /*#__PURE__*/React__default.createElement("span", {
    className: css$r["delete"],
    onClick: onClickDelete
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-close"
  })));
};

var routes = {
  notFound: function notFound() {
    return '/404';
  },
  auth: function auth() {
    return '/auth';
  },
  authLogin: function authLogin() {
    return '/auth/login';
  },
  verifyUser: function verifyUser() {
    return '/auth/verify';
  },
  stacks: function stacks(user) {
    if (user === void 0) {
      user = ':user';
    }

    return "/" + user;
  },
  stackDetails: function stackDetails(user, id) {
    if (user === void 0) {
      user = ':user';
    }

    if (id === void 0) {
      id = ':stack';
    }

    return "/" + user + "/" + id + (id === ':stack' ? '+' : '');
  },
  dashboards: function dashboards(user) {
    if (user === void 0) {
      user = ':user';
    }

    return "/" + user + "/d";
  },
  dashboardsDetails: function dashboardsDetails(user, id) {
    if (user === void 0) {
      user = ':user';
    }

    if (id === void 0) {
      id = ':id';
    }

    return "/" + user + "/d/" + id;
  },
  jobs: function jobs(user) {
    if (user === void 0) {
      user = ':user';
    }

    return "/" + user + "/j";
  },
  jobsDetails: function jobsDetails(user, id) {
    if (user === void 0) {
      user = ':user';
    }

    if (id === void 0) {
      id = ':id';
    }

    return "/" + user + "/j/" + id;
  },
  settings: function settings() {
    return '/settings';
  }
};

var useListViewSwitcher = (function (id, defaultValue) {
  if (defaultValue === void 0) {
    defaultValue = 'list';
  }

  var _useState = useState(null),
      value = _useState[0],
      setValue = _useState[1];

  useEffect(function () {
    var savedValue = localStorage.getItem("list-view-value-" + id);
    if (savedValue) setValue(savedValue);else setValue(defaultValue);
  }, []);

  var onChange = function onChange(value) {
    setValue(value);
    localStorage.setItem("list-view-value-" + id, value);
  };

  return [value, onChange];
});

var css$s = {"list":"_3CcWo","header":"_3MHvB","title":"_2HbVV","headerSide":"_TN8Ts","search":"_3VlZv","uploadButton":"_35PkI","controls":"_ee5au","viewSwitcher":"_1boU7","sorting":"_1S_L9","sortingButton":"_1c0ym","message":"_3XJKG","text":"_1_wO5","itemList":"_1fksy","item":"_1RHsG","loadingItem":"_1uHPv","stacks-pulse":"_1qO_N","modal":"_1BJIQ","description":"_1U-iN","buttons":"_19NkE","button":"_3jLaw"};

var List = function List(_ref) {
  var _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      loading = _ref.loading,
      deleteStack = _ref.deleteStack,
      currentUser = _ref.currentUser,
      user = _ref.user,
      _ref$renderUploadStac = _ref.renderUploadStack,
      renderUploadStack = _ref$renderUploadStac === void 0 ? function () {} : _ref$renderUploadStac,
      renderItemContent = _ref.renderItemContent;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useListViewSwitcher = useListViewSwitcher('stack-list'),
      view = _useListViewSwitcher[0],
      setView = _useListViewSwitcher[1];

  var _useState = useState(null),
      deletingStack = _useState[0],
      setDeletingStack = _useState[1];

  var _useState2 = useState(false),
      isShowWelcomeModal = _useState2[0],
      setIsShowWelcomeModal = _useState2[1];

  var _useState3 = useState(false),
      isShowUploadStackModal = _useState3[0],
      setIsShowUploadStackModal = _useState3[1];

  var _useState4 = useState(''),
      search = _useState4[0],
      setSearch = _useState4[1];

  var isInitialMount = useRef(true);

  var _useState5 = useState(null);

  var sortingItems = {
    lastSource: {
      title: t('lastChanged')
    }
  };

  var showWelcomeModal = function showWelcomeModal() {
    return setIsShowWelcomeModal(true);
  };

  var onChangeSearch = function onChangeSearch(value) {
    return setSearch(value);
  };

  var hideWelcomeModal = function hideWelcomeModal() {
    localStorage.setItem('welcome-modal-is-showing', true);
    setIsShowWelcomeModal(false);
  };

  useEffect(function () {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (!localStorage.getItem('welcome-modal-is-showing') && !loading && !data.length) showWelcomeModal();
    }
  }, [data]);

  var showUploadStackModal = function showUploadStackModal(event) {
    event.preventDefault();
    setIsShowUploadStackModal(true);
  };

  var hideUploadStackModal = function hideUploadStackModal() {
    return setIsShowUploadStackModal(false);
  };

  var deleteItem = function deleteItem() {
    deleteStack(deletingStack);
    hideDeleteConfirmation();
  };

  var showDeleteConfirmation = function showDeleteConfirmation(name) {
    setDeletingStack(name);
  };

  var hideDeleteConfirmation = function hideDeleteConfirmation() {
    return setDeletingStack(null);
  };

  var getItems = function getItems() {
    var items = [];

    if (data && data.length) {
      if (search.length) items = data.filter(function (i) {
        return i.name.indexOf(search) >= 0;
      });else items = data;
    }

    return items;
  };

  var items = getItems();
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$s.list
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$s.header
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$s.title
  }, currentUser === user ? t('stacks') : t('stacksOf', {
    name: user
  })), Boolean(data.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$s.headerSide
  }, Boolean(data.length) && /*#__PURE__*/React__default.createElement(SearchField, {
    className: css$s.search,
    showEverything: true,
    isDark: true,
    placeholder: t('findStack'),
    size: "small",
    value: search,
    onChange: onChangeSearch
  }), renderUploadStack && /*#__PURE__*/React__default.createElement(Tooltip, {
    overlayContent: t('uploadTooltip')
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$s.uploadButton,
    onClick: showUploadStackModal,
    color: "primary",
    variant: "contained",
    size: "small"
  }, t('uploadData'))))), !(!loading && !Boolean(data.length)) && /*#__PURE__*/React__default.createElement("div", {
    className: css$s.controls
  }, /*#__PURE__*/React__default.createElement(ViewSwitcher, {
    className: css$s.viewSwitcher,
    value: view,
    onChange: setView
  }), false ), loading && !Boolean(data.length) && /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$s.itemList, view)
  }, new Array(view === 'grid' ? 12 : 8).fill({}).map(function (i, index) {
    return /*#__PURE__*/React__default.createElement("div", {
      key: index,
      className: css$s.loadingItem
    });
  })), !loading && !data.length && /*#__PURE__*/React__default.createElement("div", {
    className: css$s.message
  }, user === currentUser ? t('youHaveNoStacksYet') : t('theUserHasNoStacksYetByName', {
    name: user
  })), !loading && !Boolean(data.length) && currentUser === user && renderUploadStack && renderUploadStack(), Boolean(data.length && items.length) && /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$s.itemList, view)
  }, items.map(function (item, index) {
    return /*#__PURE__*/React__default.createElement(Item, {
      className: css$s.item,
      Component: Link,
      key: index,
      data: item,
      to: routes.stackDetails(item.user, item.name),
      deleteAction: currentUser === item.user && showDeleteConfirmation,
      renderContent: renderItemContent
    });
  })), Boolean(data.length && !items.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$s.text
  }, t('noStacksAreFoundedMatchedTheSearchCriteria')), /*#__PURE__*/React__default.createElement(Modal, {
    isShow: Boolean(deletingStack),
    onClose: hideDeleteConfirmation,
    size: "confirmation",
    title: t('deleteStack'),
    className: css$s.modal
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$s.description
  }, t('areYouSureYouWantToDelete', {
    name: deletingStack
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$s.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    variant: "contained",
    color: "primary",
    onClick: hideDeleteConfirmation,
    className: css$s.button
  }, t('cancel')), /*#__PURE__*/React__default.createElement(Button, {
    color: "secondary",
    variant: "contained",
    onClick: deleteItem,
    className: css$s.button
  }, t('deleteStack')))), currentUser === user && /*#__PURE__*/React__default.createElement(Modal, {
    isShow: isShowWelcomeModal,
    onClose: hideWelcomeModal,
    size: "small",
    title: t('welcomeToDStack') + "\uD83D\uDC4B",
    className: css$s.modal
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$s.description
  }, t('yourEmailWasSuccessfullyConfirmed')), /*#__PURE__*/React__default.createElement("div", {
    className: css$s.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    variant: "contained",
    color: "primary",
    onClick: hideWelcomeModal,
    className: css$s.button
  }, t('getStarted')))), renderUploadStack && /*#__PURE__*/React__default.createElement(Modal, {
    isShow: isShowUploadStackModal,
    withCloseButton: true,
    onClose: hideUploadStackModal,
    size: "big",
    title: t('howToConnectYourDataWithDStack'),
    className: css$s.modal
  }, renderUploadStack()));
};

var css$t = {"howto":"_3e8x1","tabs":"_2M-II","description":"_1cd6d","code":"_1VE_j","footer":"_1gsjy"};

var pullPythonCode = function pullPythonCode(data) {
  var a = ["'/" + data.stack + "'"];
  var params = Object.keys(data.params);

  if (params.length > 0) {
    var p = [];
    params.forEach(function (key) {
      if (isString(data.params[key])) p.push("'" + key + "': '" + data.params[key] + "'");else p.push("'" + key + "': " + data.params[key]);
    });
    a.push('params={' + p.join(', ') + '}');
  }

  return "import pandas as pd\nimport dstack as ds\n\ndf = ds.pull(" + a.join(', ') + ")";
};
var pullRCode = function pullRCode(data) {
  var a = ["\"/" + data.stack + "\""];
  var params = Object.keys(data.params);

  if (params.length > 0) {
    params.forEach(function (key) {
      if (isString(data.params[key])) a.push("\"" + key + "\" = \"" + data.params[key] + "\"");else a.push("\"" + key + "\" = " + data.params[key]);
    });
  }

  return "library(dstack)\n\ndf <- read.csv(pull(" + a.join(', ') + "))";
};

var HowTo = function HowTo(_ref) {
  var modalMode = _ref.modalMode,
      data = _ref.data,
      configurePythonCommand = _ref.configurePythonCommand,
      configureRCommand = _ref.configureRCommand;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useState = useState(1),
      activeCodeTab = _useState[0],
      setActiveCodeTab = _useState[1];

  var _useState2 = useState(1),
      activePlatformTab = _useState2[0],
      setActivePlatformTab = _useState2[1];

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$t.howto
  }, !modalMode && /*#__PURE__*/React__default.createElement("div", {
    className: css$t.title
  }, t('howToFetchDataUsingTheAPI')), /*#__PURE__*/React__default.createElement(Tabs, {
    className: css$t.tabs,
    value: activeCodeTab,
    onChange: setActiveCodeTab,
    tabs: [{
      label: t('python'),
      value: 1
    }, {
      label: t('r'),
      value: 2
    }]
  }), activeCodeTab === 1 && /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: css$t.description
  }, t('installPipOrCondaPackage')), /*#__PURE__*/React__default.createElement(Tabs, {
    className: css$t.tabs,
    value: activePlatformTab,
    onChange: setActivePlatformTab,
    tabs: [{
      label: t('pip'),
      value: 1
    }, {
      label: t('conda'),
      value: 2
    }]
  }), activePlatformTab === 1 && /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$t.code,
    language: "bash"
  }, "pip install dstack"), activePlatformTab === 2 && /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$t.code,
    language: "bash"
  }, "conda install dstack -c dstack.ai"), /*#__PURE__*/React__default.createElement("div", {
    className: css$t.description
  }, t('configureDStack')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$t.code,
    language: "bash"
  }, configurePythonCommand), /*#__PURE__*/React__default.createElement("div", {
    className: css$t.description
  }, t('pullDatasetIntro')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$t.code,
    language: "python"
  }, pullPythonCode(data))), activeCodeTab === 2 && /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: css$t.description
  }, t('installRPackage')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$t.code,
    language: "r"
  }, "install.packages(\"dstack\")"), /*#__PURE__*/React__default.createElement("div", {
    className: css$t.description
  }, t('configureDStack')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$t.code,
    language: "r"
  }, configureRCommand), /*#__PURE__*/React__default.createElement("div", {
    className: css$t.description
  }, t('pullDatasetIntro')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$t.code,
    language: "r"
  }, pullRCode(data))), /*#__PURE__*/React__default.createElement("div", {
    className: css$t.footer,
    dangerouslySetInnerHTML: {
      __html: t('notClearCheckTheDocks_2', {
        href: config.DOCS_URL
      })
    }
  }));
};

var useOnClickOutside = (function (ref, handler) {
  useEffect(function () {
    var listener = function listener(event) {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return function () {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
});

var css$u = {"frames":"_3D3R4","frames-dropdown":"_3hapH","button":"_Tn4o_","name":"_YzOn7","label":"_Hg7hs","dropdown":"_16pcp","item":"_1q46l","mark":"_1h8Eq","info":"_2BnTD","modal":"_pk61B","description":"_2GOOp","buttons":"_3Ml-A"};

var getFrameName = function getFrameName(frame) {
  return moment(frame.timestamp).format('D MMM YYYY h:mm a');
};

var Frames = function Frames(_ref) {
  var frame = _ref.frame,
      frames = _ref.frames,
      headId = _ref.headId,
      onChange = _ref.onChange,
      onMarkAsHead = _ref.onMarkAsHead,
      className = _ref.className;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useState = useState(false),
      isShowDropdown = _useState[0],
      setIsShowDropdown = _useState[1];

  var toggleDropdown = function toggleDropdown() {
    return setIsShowDropdown(!isShowDropdown);
  };

  var _useState2 = useState(null),
      frameForMarkingAsHead = _useState2[0],
      setFrameForMarkingAsHead = _useState2[1];

  var dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, function () {
    return isShowDropdown && toggleDropdown();
  });
  if (!frames.length) return null;
  var activeFrame = frames.find(function (f) {
    return f.id === frame;
  });

  var onClickItem = function onClickItem(frameId) {
    return function () {
      toggleDropdown();
      if (frame !== frameId && onChange) onChange(frameId);
    };
  };

  var onClickMarkAsHead = function onClickMarkAsHead(frameId) {
    return function (event) {
      event.stopPropagation();
      setFrameForMarkingAsHead(frameId);
      toggleDropdown();
    };
  };

  var hideConfirmation = function hideConfirmation() {
    return setFrameForMarkingAsHead(null);
  };

  var confirmMarkFrameAsHead = function confirmMarkFrameAsHead() {
    if (onMarkAsHead) onMarkAsHead(frameForMarkingAsHead.id);
    setFrameForMarkingAsHead(null);
  };

  if (!activeFrame) {
    return null;
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$u.frames, className),
    ref: dropdownRef
  }, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$u['frames-dropdown']),
    ref: dropdownRef
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$u.button,
    onClick: toggleDropdown
  }, /*#__PURE__*/React__default.createElement("span", {
    className: css$u.name
  }, getFrameName(activeFrame)), headId === activeFrame.id && /*#__PURE__*/React__default.createElement("span", {
    className: css$u.label
  }, t('head')), /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-chevron-down"
  })), /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$u.dropdown, {
      show: isShowDropdown
    })
  }, frames.map(function (f) {
    return /*#__PURE__*/React__default.createElement(Tooltip, {
      key: f.id,
      placement: "rightTop",
      trigger: Boolean(f.description) ? ['hover'] : [],
      align: {
        offset: [-20, -20]
      },
      onClick: onClickItem(f.id),
      overlayContent: f.description
    }, /*#__PURE__*/React__default.createElement("div", {
      className: css$u.item
    }, /*#__PURE__*/React__default.createElement("span", {
      className: css$u.name
    }, getFrameName(f)), headId === f.id && /*#__PURE__*/React__default.createElement("span", {
      className: css$u.label
    }, t('head')), headId !== f.id && /*#__PURE__*/React__default.createElement("div", {
      className: css$u.mark,
      onClick: onClickMarkAsHead(f)
    }, t('markAsHead'))));
  }))), activeFrame && activeFrame.description && /*#__PURE__*/React__default.createElement(Tooltip, {
    overlayContent: activeFrame.description
  }, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$u.info)
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-information-variant"
  }))), /*#__PURE__*/React__default.createElement(Modal, {
    isShow: Boolean(frameForMarkingAsHead),
    onClose: hideConfirmation,
    size: "confirmation",
    title: t('changeHeadRevision'),
    className: css$u.modal
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$u.description
  }, t('areYouSureYouWantToChangeTheCurrentHeadRevisionToByName', {
    frame: frameForMarkingAsHead && getFrameName(frameForMarkingAsHead)
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$u.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    variant: "contained",
    color: "primary",
    onClick: confirmMarkFrameAsHead,
    className: css$u.button
  }, t('yesChangeHead')), /*#__PURE__*/React__default.createElement(Button, {
    color: "secondary",
    variant: "contained",
    onClick: hideConfirmation,
    className: css$u.button
  }, t('cancel')))));
};

var css$v = {"loader":"_2wNmt","title":"_1Ms-2","stacks-pulse":"_FjfKI","label":"_1rFaq","description":"_1Rg_O","diagram":"_2Aj7C"};

var Loader$1 = function Loader(_ref) {
  _objectDestructuringEmpty(_ref);

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$v.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$v.title
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$v.label
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$v.description
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$v.diagram
  }));
};

var css$w = {"tabs":"_gaP0O","tab":"_vQ7S6"};

var Tabs$1 = function Tabs(_ref) {
  var className = _ref.className,
      value = _ref.value,
      items = _ref.items,
      onChange = _ref.onChange;
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$w.tabs, className)
  }, items.map(function (i, index) {
    return /*#__PURE__*/React__default.createElement("div", {
      key: index,
      className: cx(css$w.tab, {
        active: value === i.value
      }),
      onClick: function onClick() {
        return onChange(i.value);
      }
    }, i.label);
  }));
};

var isEmail = function isEmail(value) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
};
var isRequired = function isRequired(value) {
  return !(value === null || value === undefined || value === '');
};
var noSpaces = function noSpaces(value) {
  return /^[\S]*$/.test(value);
};
var isValidStackName = function isValidStackName(value) {
  return /^[^\/]/.test(value) && /^[a-zA-Z0-9\/_]+$/.test(value);
};

var validationMap = {
  required: isRequired,
  email: isEmail,
  'no-spaces-stack': noSpaces,
  'stack-name': isValidStackName
};

var getValidationFunction = function getValidationFunction(validator) {
  if (typeof validator === 'string' && validationMap[validator]) return validationMap[validator];
  if (typeof validator === 'function') return validator;
  return function () {
    return true;
  };
};

var useForm = (function (initialFormState, fieldsValidators) {
  if (fieldsValidators === void 0) {
    fieldsValidators = {};
  }

  var _useState = useState(initialFormState),
      form = _useState[0],
      setForm = _useState[1];

  var _useState2 = useState({}),
      formErrors = _useState2[0],
      setFormErrors = _useState2[1];

  var onChange = function onChange(eventOrName, value) {
    var _extends2, _extends3;

    var name;
    var fieldValue;

    if (eventOrName.target) {
      var event = eventOrName;
      fieldValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
      name = event.target.name;
    } else {
      name = eventOrName;
      fieldValue = value;
    }

    setForm(_extends({}, form, (_extends2 = {}, _extends2[name] = fieldValue, _extends2)));
    setFormErrors(_extends({}, formErrors, (_extends3 = {}, _extends3[name] = [], _extends3)));
  };

  var resetForm = function resetForm() {
    setForm(initialFormState);
    setFormErrors({});
  };

  var getFieldErrors = function getFieldErrors(fieldName) {
    var errors = [];
    if (Array.isArray(fieldsValidators[fieldName])) fieldsValidators[fieldName].forEach(function (validator) {
      var isValid = getValidationFunction(validator);
      if (!isValid(form[fieldName])) errors.push(validator);
    });

    if (typeof fieldsValidators[fieldName] === 'string') {
      var isValid = getValidationFunction(fieldsValidators[fieldName]);
      if (!isValid(form[fieldName])) errors.push(fieldsValidators[fieldName]);
    }

    return errors;
  };

  var checkValidForm = function checkValidForm() {
    var isValid = true;
    var newFormErrors = {};
    Object.keys(fieldsValidators).forEach(function (fieldName) {
      var errors = getFieldErrors(fieldName);
      newFormErrors[fieldName] = errors;
      isValid = isValid && !errors.length;
    });
    setFormErrors(newFormErrors);
    return isValid;
  };

  return {
    form: form,
    setForm: setForm,
    formErrors: formErrors,
    setFormErrors: setFormErrors,
    resetForm: resetForm,
    onChange: onChange,
    checkValidForm: checkValidForm
  };
});

var css$x = {"details":"_3iAZb","header":"_2kekg","title":"_1zGvd","sideHeader":"_1FUDu","dropdown":"_3axDI","description":"_Y6gJz","label":"_2FemD","label-tooltip":"_2Oe5S","actions":"_sZkKa","size":"_Ja107","revisions":"_bLqAO","tabs":"_3mpfk","container":"_3_I7R","filters":"_1-hdZ","attachment-head":"_282UU","attachment":"_3IGZo","modal":"_2TdJX","buttons":"_RhHmq","button":"_26mqa"};

var Details = function Details(_ref) {
  var currentFrameId = _ref.currentFrameId,
      headId = _ref.headId,
      onChangeHeadFrame = _ref.onChangeHeadFrame,
      attachmentIndex = _ref.attachmentIndex,
      onChangeAttachmentIndex = _ref.onChangeAttachmentIndex,
      downloadAttachment = _ref.downloadAttachment,
      onChangeFrame = _ref.onChangeFrame,
      data = _ref.data,
      frame = _ref.frame,
      loading = _ref.loading,
      currentUser = _ref.currentUser,
      toggleUpload = _ref.toggleUpload,
      backUrl = _ref.backUrl,
      user = _ref.user,
      stack = _ref.stack,
      renderHeader = _ref.renderHeader,
      renderSideHeader = _ref.renderSideHeader,
      renderSidebar = _ref.renderSidebar,
      configurePythonCommand = _ref.configurePythonCommand,
      configureRCommand = _ref.configureRCommand;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var didMountRef = useRef(false);

  var _useForm = useForm({}),
      form = _useForm.form,
      setForm = _useForm.setForm,
      onChange = _useForm.onChange;

  var _useState = useState(),
      activeTab = _useState[0],
      setActiveTab = _useState[1];

  var _useState2 = useState({}),
      fields = _useState2[0],
      setFields = _useState2[1];

  var _useState3 = useState([]),
      tabs = _useState3[0],
      setTabs = _useState3[1];

  var prevFrame = usePrevious(frame);

  var _useState4 = useState(false),
      isShowHowToModal = _useState4[0],
      setIsShowHowToModal = _useState4[1];

  var showHowToModal = function showHowToModal(event) {
    event.preventDefault();
    setIsShowHowToModal(true);
  };

  var hideHowToModal = function hideHowToModal() {
    return setIsShowHowToModal(false);
  };

  useEffect(function () {
    if ((!isEqual(prevFrame, frame) || !didMountRef.current) && frame) parseTabs();
  }, [frame]);
  var findAttach = useCallback(function (form, tabName, attachmentIndex) {
    var attachments = get(frame, 'attachments');
    var fields = Object.keys(form);
    var tab = tabs.find(function (t) {
      return t.value === tabName;
    });
    if (!attachments) return;

    if (fields.length || tabs.length) {
      attachments.some(function (attach, index) {
        var _attach$params$tab$va, _attach$params$tab$ke;

        var valid = true;
        if (tab && ((_attach$params$tab$va = attach.params[tab.value]) === null || _attach$params$tab$va === void 0 ? void 0 : _attach$params$tab$va.type) !== 'tab' && ((_attach$params$tab$ke = attach.params[tab.key]) === null || _attach$params$tab$ke === void 0 ? void 0 : _attach$params$tab$ke.title) !== tab.value) return false;
        fields.forEach(function (key) {
          if (!attach.params || !isEqual(attach.params[key], form[key])) valid = false;
        });
        if (valid && !(attachmentIndex === undefined && index === 0)) onChangeAttachmentIndex(index);
        return valid;
      });
    }
  }, [tabs]);
  var findAttachDebounce = useCallback(debounce(findAttach, 300), [data, frame, findAttach]);
  useEffect(function () {
    if (didMountRef.current) findAttachDebounce(form, activeTab, attachmentIndex);
  }, [form]);
  useEffect(function () {
    if (didMountRef.current) parseParams();
  }, [activeTab]);
  useEffect(function () {
    if (!didMountRef.current) didMountRef.current = true;
  }, []);

  var getCurrentAttachment = function getCurrentAttachment(selectedTab) {
    var attachments = get(frame, 'attachments');
    var attachment;

    if (selectedTab) {
      attachment = attachments.find(function (attach) {
        var _attach$params$select, _attach$params$select2;

        return ((_attach$params$select = attach.params[selectedTab.value]) === null || _attach$params$select === void 0 ? void 0 : _attach$params$select.type) === 'tab' || ((_attach$params$select2 = attach.params[selectedTab.key]) === null || _attach$params$select2 === void 0 ? void 0 : _attach$params$select2.title) === selectedTab.value;
      });
    } else if (attachmentIndex !== undefined) {
      if (attachments[attachmentIndex]) {
        attachment = attachments[attachmentIndex];
      }
    } else {
      attachment = attachments[0];
    }

    return attachment;
  };

  var parseTabs = function parseTabs() {
    var attachments = get(frame, 'attachments');
    if (!attachments || !attachments.length) return;
    var tabs = parseStackTabs(attachments);
    var attachment = getCurrentAttachment();
    setTabs(tabs);

    if (attachment) {
      var _params$tab;

      var params = _extends({}, attachment.params);

      var tab = Object.keys(params).find(function (key) {
        var _params$key;

        return ((_params$key = params[key]) === null || _params$key === void 0 ? void 0 : _params$key.type) === 'tab';
      });
      setActiveTab(((_params$tab = params[tab]) === null || _params$tab === void 0 ? void 0 : _params$tab.title) || tab || null);
    }
  };

  var parseParams = function parseParams() {
    var attachments = get(frame, 'attachments');
    var tab = tabs.find(function (t) {
      return t.value === activeTab;
    });
    var attachment = getCurrentAttachment(tab);
    var fields = parseStackParams(attachments, tab);
    setFields(fields);

    if (attachment) {
      var params = _extends({}, attachment.params);

      var _tab = Object.keys(params).find(function (key) {
        var _params$key2;

        return ((_params$key2 = params[key]) === null || _params$key2 === void 0 ? void 0 : _params$key2.type) === 'tab';
      });

      delete params[_tab];
      setForm(params);
    }
  };

  var onClickDownloadAttachment = function onClickDownloadAttachment(event) {
    event.preventDefault();
    downloadAttachment();
  };

  var onChangeTab = function onChangeTab(tabName) {
    findAttachDebounce(form, tabName, attachmentIndex);
    setActiveTab(tabName);
  };

  var attachment = get(frame, "attachments[" + attachmentIndex + "]");
  if (loading) return /*#__PURE__*/React__default.createElement(Loader$1, null);
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$x.details, {
      'with-sidebar': Boolean(renderSidebar)
    })
  }, /*#__PURE__*/React__default.createElement(Yield, {
    name: "header-yield"
  }, /*#__PURE__*/React__default.createElement(BackButton, {
    Component: Link,
    to: backUrl
  }, currentUser === user ? t('backToMyStacks') : t('backToStacksOF', {
    name: user
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: css$x.header
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$x.title
  }, data.name, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-lock" + (data["private"] ? '' : '-open')
  })), renderHeader && renderHeader(), /*#__PURE__*/React__default.createElement("div", {
    className: css$x.sideHeader
  }, renderSideHeader && renderSideHeader(), data && data.user === currentUser && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$x.dropdown,
    items: [{
      title: t('upload'),
      onClick: toggleUpload
    }]
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$x['dropdown-button'],
    color: "secondary"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-dots-horizontal"
  }))))), /*#__PURE__*/React__default.createElement(Frames, {
    frames: get(data, 'frames', []),
    frame: currentFrameId,
    headId: headId,
    onMarkAsHead: onChangeHeadFrame,
    onChange: onChangeFrame,
    className: css$x.revisions
  }), Boolean(tabs.length) && /*#__PURE__*/React__default.createElement(Tabs$1, {
    className: css$x.tabs,
    onChange: onChangeTab,
    value: activeTab,
    items: tabs
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$x.container
  }, /*#__PURE__*/React__default.createElement(StackFilters, {
    fields: fields,
    form: form,
    onChange: onChange,
    className: cx(css$x.filters)
  }), attachment && /*#__PURE__*/React__default.createElement("div", {
    className: css$x['attachment-head']
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$x.description
  }, attachment.description && /*#__PURE__*/React__default.createElement(MarkdownRender, {
    source: attachment.description
  })), attachment['content_type'] === 'text/csv' && /*#__PURE__*/React__default.createElement("div", {
    className: css$x.actions
  }, attachment.preview && /*#__PURE__*/React__default.createElement("div", {
    className: css$x.label
  }, t('preview'), /*#__PURE__*/React__default.createElement("div", {
    className: css$x['label-tooltip']
  }, t('theTableBelowShowsOnlyAPreview'))), /*#__PURE__*/React__default.createElement("a", {
    href: "#",
    onClick: showHowToModal
  }, t('useThisStackViaAPI')), /*#__PURE__*/React__default.createElement("span", null, t('or')), /*#__PURE__*/React__default.createElement("a", {
    href: "#",
    onClick: onClickDownloadAttachment
  }, t('download')), attachment.length && /*#__PURE__*/React__default.createElement("span", {
    className: css$x.size
  }, "(", formatBytes(attachment.length), ")"))), frame && /*#__PURE__*/React__default.createElement(Attachment, {
    className: css$x.attachment,
    withLoader: true,
    stack: user + "/" + stack,
    frameId: frame.id,
    id: attachmentIndex || 0
  })), /*#__PURE__*/React__default.createElement(Modal, {
    isShow: isShowHowToModal,
    withCloseButton: true,
    onClose: hideHowToModal,
    size: "big",
    title: t('howToFetchDataUsingTheAPI'),
    className: css$x.modal
  }, /*#__PURE__*/React__default.createElement(HowTo, {
    configurePythonCommand: configurePythonCommand,
    configureRCommand: configureRCommand,
    data: {
      stack: user + "/" + stack,
      params: form
    },
    modalMode: true
  })));
};

var useDebounce = (function (callback, depsOrDelay, deps) {
  var delay = 300;
  if (typeof depsOrDelay === 'number') delay = depsOrDelay;else deps = depsOrDelay;
  return useCallback(debounce(callback, delay), deps);
});

var css$y = {"upload":"_1HGtr","content":"_zyXjr","subtitle":"_2QLXi","field":"_2kyid","dragndrop":"_1_81H","buttons":"_1PXB0","button":"_1nx-b"};

var MB = 1048576;

var Upload = function Upload(_ref) {
  var stack = _ref.stack,
      className = _ref.className,
      isShow = _ref.isShow,
      onClose = _ref.onClose,
      refresh = _ref.refresh,
      withButton = _ref.withButton,
      apiUrl = _ref.apiUrl,
      user = _ref.user;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useState = useState(false),
      isShowModal = _useState[0],
      setIsShowModal = _useState[1];

  var _useState2 = useState(null),
      uploading = _useState2[0],
      setUploading = _useState2[1];

  var _useState3 = useState(null),
      progress = _useState3[0],
      setProgress = _useState3[1];

  var _useState4 = useState(null),
      file = _useState4[0],
      setFile = _useState4[1];

  var isDidMount = useRef(true);

  var _useForm = useForm({
    stack: stack || ''
  }, {
    stack: ['required', 'no-spaces-stack', 'stack-name']
  }),
      form = _useForm.form,
      onChange = _useForm.onChange,
      formErrors = _useForm.formErrors,
      checkValidForm = _useForm.checkValidForm;

  var runValidation = useDebounce(checkValidForm);
  useEffect(function () {
    if (!isDidMount.current) runValidation();else isDidMount.current = false;
  }, [form.stack]);
  useEffect(function () {
    if (isShow !== undefined) setIsShowModal(isShow);
  }, [isShow]);

  var toggleModal = function toggleModal() {
    return setIsShowModal(!isShowModal);
  };

  var closeHandle = function closeHandle() {
    if (onClose) onClose();else setIsShowModal(false);
  };

  var getErrorsText = function getErrorsText(fieldName) {
    if (formErrors[fieldName] && formErrors[fieldName].length) return [t("formErrors." + formErrors[fieldName][0])];
  };

  var submit = function submit() {
    try {
      var _temp7 = function _temp7() {
        var _temp4 = _catch(function () {
          var token = localStorage.getItem(config.TOKEN_STORAGE_KEY);
          return Promise.resolve(axios({
            method: 'post',
            headers: {
              Authorization: token ? "Bearer " + token : ''
            },
            baseURL: apiUrl,
            url: config.STACK_PUSH,
            data: params
          })).then(function (_ref2) {
            var data = _ref2.data;

            function _temp3() {
              setUploading(false);
              closeHandle();
              if (refresh) refresh();
            }

            var _temp2 = function () {
              if (data.attachments && data.attachments.length) {
                var _data$attachments = data.attachments,
                    attachment = _data$attachments[0];

                var _temp9 = function () {
                  if (attachment['upload_url']) {
                    return Promise.resolve(axios.put(attachment['upload_url'], file, {
                      headers: {
                        'Content-Type': 'application/octet-stream'
                      },
                      onUploadProgress: function onUploadProgress(progressEvent) {
                        var percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
                        setProgress(percentCompleted);
                      }
                    })).then(function () {});
                  }
                }();

                if (_temp9 && _temp9.then) return _temp9.then(function () {});
              }
            }();

            return _temp2 && _temp2.then ? _temp2.then(_temp3) : _temp3(_temp2);
          });
        }, function () {
          closeHandle();
        });

        if (_temp4 && _temp4.then) return _temp4.then(function () {});
      };

      setProgress(null);
      setUploading(true);
      var params = {
        type: file.type,
        timestamp: Date.now(),
        id: v4(),
        stack: user + "/" + form.stack,
        size: file.size
      };

      var _temp8 = function () {
        if (file.size > MB) params.attachments = [{
          length: file.size
        }];else return Promise.resolve(fileToBase64(file)).then(function (_fileToBaseTo) {
          params.attachments = [{
            data: _fileToBaseTo
          }];
        });
      }();

      return Promise.resolve(_temp8 && _temp8.then ? _temp8.then(_temp7) : _temp7(_temp8));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return /*#__PURE__*/React__default.createElement(Fragment, null, withButton && /*#__PURE__*/React__default.createElement(Tooltip, {
    overlayContent: t('uploadTooltip')
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: cx(css$y.upload, className),
    size: "small",
    color: "secondary",
    onClick: toggleModal
  }, t('upload'))), /*#__PURE__*/React__default.createElement(Modal, {
    title: t('uploadFile'),
    isShow: isShowModal,
    size: "small"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$y.content
  }, !stack && /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: css$y.subtitle
  }, t('theUploadedFileWouldBeSavedAsANewStack')), /*#__PURE__*/React__default.createElement(TextField, {
    size: "middle",
    className: css$y.field,
    name: "stack",
    onChange: onChange,
    value: form.value,
    maxLength: 30,
    placeholder: t('stackName') + ", " + t('noSpaces') + ", " + t('maxSymbol', {
      count: 30
    }),
    errors: getErrorsText('stack')
  })), stack && file && /*#__PURE__*/React__default.createElement("div", {
    className: css$y.subtitle
  }, t('theUploadedFileWouldBeSavedAsANewRevisionOfTheStack')), /*#__PURE__*/React__default.createElement(FileDragnDrop$1, {
    className: css$y.dragndrop,
    formats: ['.csv', '.png', '.svg', '.jpg'],
    onChange: setFile,
    loading: uploading,
    progressPercent: progress
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$y.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$y.button,
    variant: "contained",
    color: "primary",
    disabled: !file || !form.stack.length || uploading,
    onClick: submit
  }, t('save')), /*#__PURE__*/React__default.createElement(Button, {
    onClick: closeHandle,
    className: css$y.button,
    variant: "contained",
    color: "secondary",
    disabled: uploading
  }, t('cancel')))));
};

var css$z = {"upload":"_2UOiz","content":"_22x3Q","subtitle":"_2sXDC","field":"_3icVJ","dragndrop":"_30Hxh","buttons":"_3VDuj","button":"_2bzId"};

var MB$1 = 1048576;

var Upload$1 = function Upload(_ref) {
  var stack = _ref.stack,
      className = _ref.className,
      refresh = _ref.refresh,
      apiUrl = _ref.apiUrl,
      user = _ref.user;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useState = useState(null),
      uploading = _useState[0],
      setUploading = _useState[1];

  var _useState2 = useState(null),
      progress = _useState2[0],
      setProgress = _useState2[1];

  var _useState3 = useState(null),
      file = _useState3[0],
      setFile = _useState3[1];

  var isDidMount = useRef(true);
  var fileFieldRef = useRef(null);

  var _useForm = useForm({
    stack: stack || ''
  }, {
    stack: ['required', 'no-spaces-stack', 'stack-name']
  }),
      form = _useForm.form,
      onChange = _useForm.onChange,
      setForm = _useForm.setForm,
      formErrors = _useForm.formErrors,
      checkValidForm = _useForm.checkValidForm;

  var runValidation = useDebounce(checkValidForm);
  useEffect(function () {
    if (!isDidMount.current) runValidation();else isDidMount.current = false;
  }, [form.stack]);

  var clearForm = function clearForm() {
    setFile(null);
    setForm({
      stack: ''
    });
    if (fileFieldRef.current) fileFieldRef.current.clear();
  };

  var getErrorsText = function getErrorsText(fieldName) {
    if (formErrors[fieldName] && formErrors[fieldName].length) return [t("formErrors." + formErrors[fieldName][0])];
  };

  var submit = function submit() {
    try {
      var _temp7 = function _temp7() {
        var _temp4 = _catch(function () {
          var token = localStorage.getItem(config.TOKEN_STORAGE_KEY);
          return Promise.resolve(axios({
            method: 'post',
            headers: {
              Authorization: token ? "Bearer " + token : ''
            },
            baseURL: apiUrl,
            url: config.STACK_PUSH,
            data: params
          })).then(function (_ref2) {
            var data = _ref2.data;

            function _temp3() {
              setUploading(false);
              if (refresh) refresh();
              clearForm();
            }

            var _temp2 = function () {
              if (data.attachments && data.attachments.length) {
                var _data$attachments = data.attachments,
                    attachment = _data$attachments[0];

                var _temp9 = function () {
                  if (attachment['upload_url']) {
                    return Promise.resolve(axios.put(attachment['upload_url'], file, {
                      headers: {
                        'Content-Type': 'application/octet-stream'
                      },
                      onUploadProgress: function onUploadProgress(progressEvent) {
                        var percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
                        setProgress(percentCompleted);
                      }
                    })).then(function () {});
                  }
                }();

                if (_temp9 && _temp9.then) return _temp9.then(function () {});
              }
            }();

            return _temp2 && _temp2.then ? _temp2.then(_temp3) : _temp3(_temp2);
          });
        }, function (e) {
          console.log(e);
          clearForm();
        });

        if (_temp4 && _temp4.then) return _temp4.then(function () {});
      };

      setProgress(null);
      setUploading(true);
      var params = {
        type: file.type,
        timestamp: Date.now(),
        id: v4(),
        stack: user + "/" + form.stack,
        size: file.size
      };

      var _temp8 = function () {
        if (file.size > MB$1) params.attachments = [{
          length: file.size
        }];else return Promise.resolve(fileToBase64(file)).then(function (_fileToBaseTo) {
          params.attachments = [{
            data: _fileToBaseTo
          }];
        });
      }();

      return Promise.resolve(_temp8 && _temp8.then ? _temp8.then(_temp7) : _temp7(_temp8));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$z.upload, className)
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$z.content
  }, !stack && /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: css$z.subtitle
  }, t('stackName')), /*#__PURE__*/React__default.createElement(TextField, {
    size: "middle",
    className: css$z.field,
    name: "stack",
    onChange: onChange,
    value: form.value,
    maxLength: 30,
    placeholder: t('stackName') + ", " + t('noSpaces') + ", " + t('maxSymbol', {
      count: 30
    }),
    errors: getErrorsText('stack')
  })), stack && file && /*#__PURE__*/React__default.createElement("div", {
    className: css$z.subtitle
  }, t('theUploadedFileWouldBeSavedAsANewRevisionOfTheStack')), /*#__PURE__*/React__default.createElement(FileDragnDrop$1, {
    ref: fileFieldRef,
    className: css$z.dragndrop,
    formats: ['.csv', '.png', '.svg', '.jpg'],
    onChange: setFile,
    loading: uploading,
    progressPercent: progress
  })), file && /*#__PURE__*/React__default.createElement("div", {
    className: css$z.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$z.button,
    variant: "contained",
    color: "primary",
    disabled: !file || !form.stack.length || uploading,
    onClick: submit
  }, t('save')), /*#__PURE__*/React__default.createElement(Button, {
    onClick: clearForm,
    className: css$z.button,
    variant: "contained",
    color: "secondary",
    disabled: uploading
  }, t('cancel'))));
};

var css$A = {"howto":"_362z-","tabs":"_h6zun","description":"_SODNv","code":"_WU2Z-","footer":"_1DRv-"};

var UploadStack = function UploadStack(_ref) {
  var user = _ref.user,
      refresh = _ref.refresh,
      apiUrl = _ref.apiUrl,
      configurePythonCommand = _ref.configurePythonCommand,
      configureRCommand = _ref.configureRCommand,
      withFileUpload = _ref.withFileUpload;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useState = useState(1),
      activeCodeTab = _useState[0],
      setActiveCodeTab = _useState[1];

  var _useState2 = useState(1),
      activePlatformTab = _useState2[0],
      setActivePlatformTab = _useState2[1];

  var tabs = [{
    label: t('python'),
    value: 1
  }, {
    label: t('r'),
    value: 2
  }];
  if (withFileUpload) tabs.push({
    label: t('upload'),
    value: 3
  });
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$A.howto
  }, /*#__PURE__*/React__default.createElement(Tabs, {
    className: css$A.tabs,
    value: activeCodeTab,
    onChange: setActiveCodeTab,
    tabs: tabs
  }), activeCodeTab === 1 && /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: css$A.description
  }, t('installPipOrCondaPackage')), /*#__PURE__*/React__default.createElement(Tabs, {
    className: css$A.tabs,
    value: activePlatformTab,
    onChange: setActivePlatformTab,
    tabs: [{
      label: t('pip'),
      value: 1
    }, {
      label: t('conda'),
      value: 2
    }]
  }), activePlatformTab === 1 && /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$A.code,
    language: "bash"
  }, "pip install dstack"), activePlatformTab === 2 && /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$A.code,
    language: "bash"
  }, "conda install dstack -c dstack.ai"), /*#__PURE__*/React__default.createElement("div", {
    className: css$A.description
  }, t('configureDStack')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$A.code,
    language: "bash"
  }, configurePythonCommand), /*#__PURE__*/React__default.createElement("div", {
    className: css$A.description
  }, t('reportPlotIntro')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$A.code,
    language: "python"
  }, reportPlotPythonCode)), activeCodeTab === 2 && /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: css$A.description
  }, t('installRPackage')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$A.code,
    language: "r"
  }, installRPackageCode), /*#__PURE__*/React__default.createElement("div", {
    className: css$A.description
  }, t('configureDStack')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$A.code,
    language: "r"
  }, configureRCommand), /*#__PURE__*/React__default.createElement("div", {
    className: css$A.description
  }, t('reportPlotIntro')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$A.code,
    language: "r"
  }, reportPlotRCode)), activeCodeTab === 3 && /*#__PURE__*/React__default.createElement(Upload$1, {
    user: user,
    refresh: refresh,
    apiUrl: apiUrl
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$A.footer,
    dangerouslySetInnerHTML: {
      __html: t('notClearCheckTheDocks', {
        href: config.DOCS_URL
      })
    }
  }));
};

function move(array, oldIndex, newIndex) {
  if (newIndex >= array.length) {
    newIndex = array.length - 1;
  }

  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array;
}

function moveElement(array, index, offset) {
  var newIndex = index + offset;
  return move(array, index, newIndex);
}

var GridContext = createContext({
  items: []
});
var GridProvider = /*#__PURE__*/function (_Component) {
  _inheritsLoose(GridProvider, _Component);

  function GridProvider(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _this.setItems = function (items) {
      return _this.setState({
        items: items
      });
    };

    _this.moveItem = function (sourceId, destinationId) {
      var sourceIndex = _this.state.items.findIndex(function (item) {
        return item.id === sourceId;
      });

      var destinationIndex = _this.state.items.findIndex(function (item) {
        return item.id === destinationId;
      });

      if (sourceId === -1 || destinationId === -1) {
        return;
      }

      var offset = destinationIndex - sourceIndex;

      _this.setState(function (state) {
        return {
          items: moveElement(state.items, sourceIndex, offset)
        };
      });
    };

    _this.state = {
      items: [],
      moveItem: _this.moveItem,
      setItems: _this.setItems
    };
    return _this;
  }

  var _proto = GridProvider.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/React__default.createElement(GridContext.Provider, {
      value: this.state
    }, this.props.children);
  };

  return GridProvider;
}(Component);

var DnDItem = memo(function (_ref) {
  var id = _ref.id,
      onMoveItem = _ref.onMoveItem,
      children = _ref.children;
  var ref = useRef(null);

  var _useDrag = useDrag({
    item: {
      id: id,
      type: 'IMG'
    },
    collect: function collect(monitor) {
      return {
        isDragging: monitor.isDragging()
      };
    }
  }),
      connectDrag = _useDrag[1];

  var _useDrop = useDrop({
    accept: 'IMG',
    drop: function drop(hoveredOverItem) {
      if (hoveredOverItem.id !== id) {
        onMoveItem(hoveredOverItem.id, id);
      }
    }
  }),
      connectDrop = _useDrop[1];

  connectDrag(ref);
  connectDrop(ref);
  return React__default.Children.map(children, function (child) {
    return React__default.cloneElement(child, {
      forwardedRef: ref
    });
  });
});

var css$B = {"loader":"_2RpBO","text":"_3gk1Z","dashboards-details-pulse":"_3HZ82","filters":"_3ZZJL","grid":"_ZafPr","item":"_LIYeR"};

var Loader$2 = function Loader(_ref) {
  _objectDestructuringEmpty(_ref);

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$B.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$B.text
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$B.filters
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$B.grid
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$B.item
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$B.item
  })));
};

var css$C = {"card":"_17jo7","inner":"_YLuSm","head":"_2dKop","name":"_1blF_","nameEdit":"_3omHN","nameValue":"_wx2sM","info":"_1Tbhc","dropdown":"_1NvWp","button":"_d6fLT","move":"_312qk","link":"_NfDp4","infoTime":"_2QMrW","emptyMessage":"_7aBhX","attachment":"_2ajkc"};

var Card = memo(function (_ref) {
  var data = _ref.data,
      className = _ref.className,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'grid' : _ref$type,
      deleteCard = _ref.deleteCard,
      updateCardTitle = _ref.updateCardTitle,
      filters = _ref.filters,
      forwardedRef = _ref.forwardedRef,
      moveAvailable = _ref.moveAvailable;

  var _useState = useState(data.title),
      title = _useState[0],
      setTitle = _useState[1];

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var headId = get(data, 'head.id');
  var stackOwner = data.stack.split('/')[0];

  var _useState2 = useState(0),
      attachmentIndex = _useState2[0],
      setAttachmentIndex = _useState2[1];

  var _useState3 = useState([]),
      cardParams = _useState3[0],
      setCardParams = _useState3[1];

  useEffect(function () {
    var params = parseStackParams(get(data, 'head.attachments', []));
    if (params) setCardParams(Object.keys(params));
  }, [data]);
  useEffect(function () {
    findAttach();
  }, [filters]);

  var findAttach = function findAttach() {
    var attachments = get(data, 'head.attachments');
    var fields = Object.keys(filters).filter(function (f) {
      return cardParams.indexOf(f) >= 0;
    });
    if (!attachments) return;

    if (fields.length) {
      attachments.some(function (attach, index) {
        var valid = true;
        fields.forEach(function (key) {
          if (!attach.params || !isEqual(attach.params[key], filters[key])) valid = false;
        });
        if (valid) setAttachmentIndex(index);
        return valid;
      });
    } else setAttachmentIndex(0);
  };

  var onUpdate = updateCardTitle ? useDebounce(updateCardTitle, []) : function () {};

  var onChangeTitle = function onChangeTitle(event) {
    setTitle(event.target.value);
    onUpdate(event.target.value);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$C.card, "type-" + type, className),
    ref: forwardedRef
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$C.inner
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$C.head
  }, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$C.name, {
      readonly: !updateCardTitle
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$C.nameValue
  }, title.length ? title : t('title')), /*#__PURE__*/React__default.createElement("input", {
    value: title,
    type: "text",
    placeholder: t('title'),
    onChange: onChangeTitle,
    className: cx(css$C.nameEdit, {
      active: !title.length
    })
  })), /*#__PURE__*/React__default.createElement(Tooltip, {
    overlayContent: /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement("div", null, t('updatedByName', {
      name: stackOwner
    })), data.head && /*#__PURE__*/React__default.createElement("div", {
      className: css$C.infoTime
    }, moment(data.head.timestamp).format('D MMM YYYY')))
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$C.info
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-information-outline"
  }))), /*#__PURE__*/React__default.createElement(Button, {
    className: cx(css$C.button, css$C.link),
    color: "secondary",
    Component: Link,
    to: "/" + data.stack
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-open-in-new"
  })), Boolean(deleteCard) && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$C.dropdown,
    items: [].concat(deleteCard ? [{
      title: t('delete'),
      onClick: deleteCard
    }] : [])
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$C.button,
    color: "secondary"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-dots-horizontal"
  }))), moveAvailable && /*#__PURE__*/React__default.createElement(Button, {
    className: cx(css$C.button, css$C.move),
    color: "secondary"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-cursor-move"
  }))), headId ? /*#__PURE__*/React__default.createElement(Attachment, {
    className: css$C.attachment,
    isList: true,
    withLoader: true,
    stack: data.stack,
    frameId: headId,
    id: attachmentIndex
  }) : /*#__PURE__*/React__default.createElement("div", {
    className: css$C.emptyMessage
  }, t('emptyDashboard'))));
});

var css$D = {"details":"_2U9YD","header":"_2Lioj","title":"_353_b","edit":"_14H-Y","sideHeader":"_3zX4a","dropdown":"_1OYBD","section":"_3ZM3A","cards":"_2idlU","fields":"_3zxn3","filters":"_QjWiF","controls":"_9DqNJ","addButton":"_ezy69","viewSwitcher":"_2LheQ","empty":"_j9SPi"};

var Details$1 = function Details(_ref) {
  var addCards = _ref.addCards,
      backUrl = _ref.backUrl,
      cards = _ref.cards,
      currentUser = _ref.currentUser,
      data = _ref.data,
      deleteCard = _ref.deleteCard,
      deleteDashboard = _ref.deleteDashboard,
      loading = _ref.loading,
      _ref$onChangeTitle = _ref.onChangeTitle,
      onChangeTitle = _ref$onChangeTitle === void 0 ? function () {} : _ref$onChangeTitle,
      updateCard = _ref.updateCard,
      user = _ref.user,
      withSorting = _ref.withSorting,
      renderHeader = _ref.renderHeader,
      renderSideHeader = _ref.renderSideHeader;

  var _useContext = useContext(GridContext),
      items = _useContext.items,
      moveItem = _useContext.moveItem,
      setItems = _useContext.setItems;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useState = useState('grid'),
      view = _useState[0],
      setView = _useState[1];

  var _useForm = useForm({}),
      form = _useForm.form,
      setForm = _useForm.setForm,
      onChange = _useForm.onChange;

  var _useState2 = useState({}),
      fields = _useState2[0],
      setFields = _useState2[1];

  var prevData = usePrevious(data);
  var isDidMount = useRef(true);
  var onChangeTitleDebounce = useCallback(debounce(onChangeTitle, 300), []);

  var setGridItems = function setGridItems(cardsItems) {
    return setItems(cardsItems.map(function (card) {
      return {
        id: card.index,
        card: card
      };
    }));
  };

  useEffect(function () {
    if (window) window.dispatchEvent(new Event('resize'));
  }, [view]);
  useEffect(function () {
    if (cards) setGridItems(cards);
    return function () {
      return setGridItems([]);
    };
  }, [cards]);
  useEffect(function () {
    if ((!isEqual(prevData, data) || isDidMount.current) && data) parseParams();
    if (isDidMount.current) isDidMount.current = false;
  }, [data]);

  var moveCard = function moveCard(indexFrom, indexTo) {
    if (indexTo < 0 || indexFrom < 0) return;
    var stack = items[indexFrom].card.stack;
    if (updateCard) updateCard({
      stack: stack,
      index: indexTo
    });
    moveItem(indexFrom, indexTo);
  };

  var getDeleteCardAction = function getDeleteCardAction(stack) {
    if (deleteCard) {
      return function () {
        deleteCard(stack);
      };
    }
  };

  var getUpdateCardTitleAction = function getUpdateCardTitleAction(stack) {
    if (updateCard) return function (title) {
      updateCard({
        stack: stack,
        title: title
      });
    };
  };

  var parseParams = function parseParams() {
    if (!cards) return;
    var fields = cards.reduce(function (result, card) {
      var cardFields = parseStackParams(get(card, 'head.attachments', [])) || {};
      Object.keys(cardFields).forEach(function (fieldName) {
        if (result[fieldName]) {
          if (cardFields[fieldName].type === 'select') {
            result[fieldName].options = unionBy(result[fieldName].options, cardFields[fieldName].options, 'value');
          }

          if (cardFields[fieldName].type === 'slider') {
            result[fieldName].options = _extends({}, result[fieldName].options, cardFields[fieldName].options);
            result[fieldName].min = Math.min(result[fieldName].min, cardFields[fieldName].min);
            result[fieldName].max = Math.max(result[fieldName].max, cardFields[fieldName].max);
          }
        } else {
          result[fieldName] = cardFields[fieldName];
        }
      });
      return result;
    }, {});
    var defaultFilterValues = Object.keys(fields).reduce(function (result, fieldName) {
      if (fields[fieldName].type === 'select') result[fieldName] = fields[fieldName].options[0].value;
      if (fields[fieldName].type === 'slider') result[fieldName] = fields[fieldName].options[0];
      if (fields[fieldName].type === 'checkbox') result[fieldName] = false;
      return result;
    }, {});
    setForm(defaultFilterValues);
    setFields(fields);
  };

  var renderFilters = function renderFilters() {
    if (!Object.keys(fields).length) return null;
    var hasSelectField = Object.keys(fields).some(function (key) {
      return fields[key].type === 'select';
    });
    return /*#__PURE__*/React__default.createElement(StackFilters, {
      fields: fields,
      form: form,
      onChange: onChange,
      className: cx(css$D.filters, {
        'with-select': hasSelectField
      })
    });
  };

  var getAddClickAction = function getAddClickAction() {
    if (addCards) return function (event) {
      event.preventDefault();
      addCards();
    };
  };

  if (loading) return /*#__PURE__*/React__default.createElement(Loader$2, null);
  if (!data) return null;
  var CardWrapComponent = withSorting ? DnDItem : Fragment;
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$D.details
  }, /*#__PURE__*/React__default.createElement(Yield, {
    name: "header-yield"
  }, /*#__PURE__*/React__default.createElement(BackButton, {
    Component: Link,
    to: backUrl
  }, currentUser === user ? t('backToDashboards') : t('backToDashboardsOf', {
    name: user
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: css$D.header
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$D.title
  }, /*#__PURE__*/React__default.createElement(StretchTitleField, {
    className: css$D.edit,
    value: data === null || data === void 0 ? void 0 : data.title,
    onChange: onChangeTitleDebounce,
    readOnly: currentUser !== data.user,
    placeholder: t('newDashboard')
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-lock" + (data["private"] ? '' : '-open')
  })), renderHeader && renderHeader(), /*#__PURE__*/React__default.createElement("div", {
    className: css$D.sideHeader
  }, renderSideHeader && renderSideHeader(), Boolean(deleteDashboard) && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$D.dropdown,
    items: [].concat(Boolean(deleteDashboard) ? [{
      title: t('delete'),
      onClick: deleteDashboard
    }] : [])
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$D['dropdown-button'],
    color: "secondary"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-dots-horizontal"
  }))))), Boolean(items.length) && /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: css$D.section
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$D.fields
  }, renderFilters()), /*#__PURE__*/React__default.createElement("div", {
    className: css$D.controls
  }, getAddClickAction() && /*#__PURE__*/React__default.createElement("a", {
    className: css$D.addButton,
    onClick: getAddClickAction(),
    href: "#"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-plus"
  }), t('addStack')), /*#__PURE__*/React__default.createElement(ViewSwitcher, {
    value: view,
    className: css$D.viewSwitcher,
    onChange: function onChange(view) {
      return setView(view);
    }
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$D.cards, view)
  }, items.map(function (item) {
    return /*#__PURE__*/React__default.createElement(CardWrapComponent, _extends({
      key: item.card.stack
    }, withSorting ? {
      id: item.id,
      onMoveItem: moveCard
    } : {}), /*#__PURE__*/React__default.createElement(Card, {
      filters: form,
      deleteCard: getDeleteCardAction(item.card.stack),
      data: item.card,
      type: view,
      updateCardTitle: getUpdateCardTitleAction(item.card.stack),
      moveAvailable: withSorting
    }));
  }))), !items.length && /*#__PURE__*/React__default.createElement("div", {
    className: css$D.empty
  }, t('thereAreNoStacksYet'), " ", /*#__PURE__*/React__default.createElement("br", null), t('youCanSendStacksYouWantToBeHereLaterOrAddItRightNow'), getAddClickAction() && /*#__PURE__*/React__default.createElement(Fragment, null, ' ', /*#__PURE__*/React__default.createElement("a", {
    className: css$D.addButton,
    onClick: getAddClickAction(),
    href: "#"
  }, t('addStack')), ".")));
};

var css$E = {"item":"_3urCL","preview":"_cxR4e","label":"_tCzQe","previewWrap":"_15fuU","emptyMessage":"_2pDKf","attachment":"_35KB8","section":"_LeHWu","content":"_Bgbe4","name":"_2PrtI","by":"_1_qsJ","permissions":"_3ZdE1","dropdown":"_vK4SD","preview-stack-pulse":"_3NFJT"};

var Item$1 = function Item(_ref) {
  var dashboard = _ref.dashboard,
      deleteDashboard = _ref.deleteDashboard,
      user = _ref.user,
      renderContent = _ref.renderContent;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var ref = useRef(null);
  var hasStacks = dashboard.cards && Boolean(dashboard.cards.length);
  var card = dashboard.cards.find(function (c) {
    return get(c, 'head.id');
  });

  var onClickDelete = function onClickDelete() {
    deleteDashboard({
      user: user,
      id: dashboard.id
    });
  };

  var isShowDropdown = Boolean(deleteDashboard);
  return /*#__PURE__*/React__default.createElement(Link, {
    to: "/" + user + "/d/" + dashboard.id,
    className: css$E.item,
    ref: ref
  }, Boolean(dashboard.cards.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$E.label
  }, t('stacksWithCount', {
    count: dashboard.cards.length
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$E.previewWrap
  }, hasStacks ? /*#__PURE__*/React__default.createElement(Attachment, {
    className: css$E.attachment,
    isList: true,
    withLoader: true,
    frameId: card.head.id,
    stack: card.stack,
    id: 0
  }) : /*#__PURE__*/React__default.createElement("div", {
    className: css$E.emptyMessage
  }, t('emptyDashboard'))), /*#__PURE__*/React__default.createElement("div", {
    className: css$E.section
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$E.content
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$E.name
  }, dashboard.title, ' ', /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-lock" + (dashboard["private"] ? '' : '-open')
  })), user !== dashboard.user && /*#__PURE__*/React__default.createElement("div", {
    className: css$E.by
  }, t('by'), " ", dashboard.user), renderContent && renderContent(dashboard)), isShowDropdown && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$E.dropdown,
    items: [{
      title: t('delete'),
      onClick: onClickDelete
    }]
  })));
};

var css$F = {"loader":"_PK0JP","text":"_1F-rx","dashboards-pulse":"_29IbF","grid":"_ef-jq","item":"_1HBd8","pic":"_1z0LR","section":"_14O5G"};

var Loader$3 = function Loader(_ref) {
  _objectDestructuringEmpty(_ref);

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$F.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$F.text
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$F.grid
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$F.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$F.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$F.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$F.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$F.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$F.section
  }))));
};

var css$G = {"list":"_2tGd9","title":"_lNufF","search":"_3Vnt-","mobileSearch":"_28J_R","text":"_2QiEZ","grid":"_31LQw","add":"_1VMC5","caption":"_pTzl3"};

var List$1 = function List(_ref) {
  var addDashboard = _ref.addDashboard,
      addDashboardDisable = _ref.addDashboardDisable,
      currentUser = _ref.currentUser,
      data = _ref.data,
      deleteDashboard = _ref.deleteDashboard,
      loading = _ref.loading,
      user = _ref.user,
      renderItemContent = _ref.renderItemContent;

  var _useState = useState(''),
      search = _useState[0],
      setSearch = _useState[1];

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var onChangeSearch = function onChangeSearch(value) {
    return setSearch(value);
  };

  var getItems = function getItems() {
    var items = [];

    if (data && data.length) {
      if (search.length) items = data.filter(function (i) {
        return i.title.indexOf(search) >= 0;
      });else items = data;
    }

    return items;
  };

  var items = getItems();
  if (loading) return /*#__PURE__*/React__default.createElement(Loader$3, null);
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$G.list
  }, /*#__PURE__*/React__default.createElement(Yield, {
    name: "header-yield"
  }, /*#__PURE__*/React__default.createElement(SearchField, {
    showEverything: true,
    isDark: true,
    className: css$G.search,
    placeholder: t('findDashboard'),
    size: "small",
    value: search,
    onChange: onChangeSearch
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$G.title
  }, currentUser === user ? t('myDashboards') : t('dashboardsOf', {
    name: user
  }), data && Boolean(data.length) && /*#__PURE__*/React__default.createElement("span", null, data.length)), data && Boolean(data.length) && /*#__PURE__*/React__default.createElement(SearchField, {
    placeholder: t('search'),
    className: css$G.mobileSearch,
    showEverything: true,
    size: "small",
    value: search,
    onChange: onChangeSearch
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$G.grid
  }, currentUser === user && /*#__PURE__*/React__default.createElement("div", {
    onClick: addDashboard,
    className: cx(css$G.add, {
      disabled: addDashboardDisable
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$G.caption
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-plus"
  }), t('newDashboard'))), items.map(function (item, index) {
    return /*#__PURE__*/React__default.createElement(Item$1, {
      key: index,
      user: user,
      dashboard: item,
      deleteDashboard: currentUser === item.user && deleteDashboard,
      renderContent: renderItemContent
    });
  })));
};

var css$H = {"loader":"_FMgKh","text":"_3kMB4","stacks-pulse":"_2uZ4b","grid":"_1i-Vy","item":"_3Q6le","pic":"_2gd5L","section":"_BzTYi"};

var Loader$4 = function Loader(_ref) {
  _objectDestructuringEmpty(_ref);

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$H.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$H.text
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$H.grid
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$H.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$H.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$H.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$H.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$H.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$H.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$H.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$H.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$H.section
  }))));
};

var css$I = {"stacks":"_1YlOe","grid":"_2Xblj","search":"_2JDJR","message":"_30aty","text":"_1qJHA","item":"_1AIvq","checkbox":"_I8MzQ","buttons":"_3uEfC","button":"_22J0P"};

var AddStacksModal = function AddStacksModal(_ref) {
  var _ref$stacks = _ref.stacks,
      stacks = _ref$stacks === void 0 ? [] : _ref$stacks,
      loading = _ref.loading,
      isShow = _ref.isShow,
      onClose = _ref.onClose,
      onAddStacks = _ref.onAddStacks,
      currentUser = _ref.currentUser,
      user = _ref.user;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var params = useParams();

  var _useState = useState(''),
      searchQuery = _useState[0],
      setSearchQuery = _useState[1];

  var _useState2 = useState([]),
      selected = _useState2[0],
      setSelected = _useState2[1];

  useEffect(function () {
    if (!isShow) {
      setSelected([]);
      setSearchQuery('');
    }
  }, [isShow]);

  var getItems = function getItems() {
    var items = [];

    if (stacks && stacks.length) {
      if (searchQuery.length) items = stacks.filter(function (i) {
        return i.name.indexOf(searchQuery) >= 0;
      });else items = stacks;
    }

    return items;
  };

  var items = getItems();

  var onChangeSearch = function onChangeSearch(value) {
    return setSearchQuery(value);
  };

  var getFullStackName = function getFullStackName(stack) {
    return stack.user + "/" + stack.name;
  };

  var isChecked = function isChecked(stack) {
    var stackName = getFullStackName(stack);
    return selected.findIndex(function (i) {
      return i === stackName;
    }) >= 0;
  };

  var getOnClickStack = function getOnClickStack(stack) {
    return function () {
      var stackName = getFullStackName(stack);

      if (isChecked(stack)) {
        var filtered = selected.filter(function (i) {
          return i !== stackName;
        });
        setSelected(filtered);
      } else {
        setSelected([].concat(selected, [stackName]));
      }
    };
  };

  var submit = function submit() {
    if (onAddStacks) onAddStacks(selected);
    onClose();
  };

  return /*#__PURE__*/React__default.createElement(Modal, {
    dialogClassName: css$I.stacks,
    isShow: isShow,
    title: t('selectStacks'),
    onClose: onClose,
    withCloseButton: true
  }, !loading && Boolean(stacks.length) && /*#__PURE__*/React__default.createElement(SearchField, {
    className: css$I.search,
    isDark: true,
    size: "middle",
    showEverything: true,
    placeholder: t('findStack'),
    value: searchQuery,
    onChange: onChangeSearch
  }), loading && /*#__PURE__*/React__default.createElement(Loader$4, null), !loading && !stacks.length && /*#__PURE__*/React__default.createElement("div", {
    className: css$I.message
  }, user === currentUser ? t('youHaveNoStacksYet') : t('theUserHasNoStacksYetByName', {
    name: params.user
  })), !loading && Boolean(stacks.length && !items.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$I.text
  }, t('noStacksAreFoundedMatchedTheSearchCriteria')), !loading && Boolean(stacks.length && items.length) && /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: css$I.grid
  }, items.map(function (item, index) {
    return /*#__PURE__*/React__default.createElement("div", {
      className: css$I.item,
      key: index,
      onClick: getOnClickStack(item)
    }, /*#__PURE__*/React__default.createElement(CheckboxField, {
      className: css$I.checkbox,
      value: isChecked(item),
      readOnly: true
    }), /*#__PURE__*/React__default.createElement(Item, {
      data: item,
      otherOwner: params.user !== item.user
    }));
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$I.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$I.button,
    color: "primary",
    variant: "contained",
    disabled: !selected.length,
    onClick: submit
  }, t('addSelectedStacks')), /*#__PURE__*/React__default.createElement(Button, {
    className: css$I.button,
    color: "secondary",
    variant: "contained",
    onClick: onClose
  }, t('cancel')))));
};

var api = apiFabric();
var useActions = (function () {
  var _useAppStore = useAppStore(),
      apiUrl = _useAppStore[0].apiUrl;

  var fetchJob = function fetchJob(_ref) {
    var user = _ref.user,
        id = _ref.id;
    return new Promise(function (resolve) {
      try {
        var _temp2 = _catch(function () {
          return Promise.resolve(api.get(apiUrl + config.JOB_DETAILS(user, id))).then(function (request) {
            resolve(request.data);
          });
        }, function () {
          resolve({});
        });

        return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    });
  };

  var runJob = function runJob(params) {
    return new Promise(function (resolve) {
      try {
        var _temp4 = _catch(function () {
          return Promise.resolve(api.post(apiUrl + config.JOB_RUN, params)).then(function (request) {
            resolve(request.data);
          });
        }, function () {
          resolve({});
        });

        return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    });
  };

  var stopJob = function stopJob(params) {
    return new Promise(function (resolve) {
      try {
        var _temp6 = _catch(function () {
          return Promise.resolve(api.post(apiUrl + config.JOB_STOP, params)).then(function (request) {
            resolve(request.data);
          });
        }, function () {
          resolve({});
        });

        return Promise.resolve(_temp6 && _temp6.then ? _temp6.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    });
  };

  var createJob = function createJob(params) {
    return new Promise(function (resolve) {
      try {
        var _temp8 = _catch(function () {
          return Promise.resolve(api.post(apiUrl + config.JOB_CREATE, params)).then(function (request) {
            resolve(request.data);
          });
        }, function () {
          resolve({});
        });

        return Promise.resolve(_temp8 && _temp8.then ? _temp8.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    });
  };

  var updateJob = function updateJob(params) {
    return new Promise(function (resolve) {
      try {
        var _temp10 = _catch(function () {
          return Promise.resolve(api.post(apiUrl + config.JOB_UPDATE, params)).then(function (request) {
            resolve(request.data);
          });
        }, function () {
          resolve({});
        });

        return Promise.resolve(_temp10 && _temp10.then ? _temp10.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    });
  };

  var removeJob = function removeJob(params) {
    return new Promise(function (resolve) {
      try {
        var _temp12 = _catch(function () {
          return Promise.resolve(api.post(apiUrl + config.JOB_DELETE, params)).then(function (request) {
            resolve(request.data);
          });
        }, function () {
          resolve({});
        });

        return Promise.resolve(_temp12 && _temp12.then ? _temp12.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    });
  };

  return {
    fetchJob: fetchJob,
    runJob: runJob,
    stopJob: stopJob,
    createJob: createJob,
    updateJob: updateJob,
    removeJob: removeJob
  };
});

var css$J = {"loader":"_DHDDF","title":"_3eHle","loader-pulsee":"_3Q4hE","text":"_2QdBi","table":"_3c_Ia","item":"_2_9nD"};

var Loader$5 = function Loader(_ref) {
  _objectDestructuringEmpty(_ref);

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$J.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$J.title
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$J.text
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$J.table
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$J.item
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$J.item
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$J.item
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$J.item
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$J.item
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$J.item
  })));
};

var JOB_DEFAULT_ESTIMATED_DURATION = 600000;
var calculateJobProgress = function calculateJobProgress(job) {
  var estimatedDuration = job['estimated_duration'] || JOB_DEFAULT_ESTIMATED_DURATION;
  var currentDuration = Date.now() - job.started;
  var leftDuration = estimatedDuration - currentDuration;
  var progress = Math.min(currentDuration / estimatedDuration * 100, 100).toFixed();
  return [progress, leftDuration];
};

var css$K = {"section":"_3RnYw","progressBar":"_3xjSa","progress":"_3eEzL","time":"_1q33r"};

var Progress = function Progress(_ref) {
  var data = _ref.data,
      className = _ref.className,
      onlyDuration = _ref.onlyDuration;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var progressTimer = useRef(null);

  var _useState = useState(null),
      set = _useState[1];

  useEffect(function () {
    if (data.status === 'RUNNING') {
      clearInterval(progressTimer.current);
      progressTimer.current = setInterval(function () {
        set(Date.now());
      }, 50);
    } else {
      clearInterval(progressTimer.current);
    }

    return function () {
      return clearInterval(progressTimer.current);
    };
  }, [data]);
  if (!data.started) return null;

  var _calculateJobProgress = calculateJobProgress(data),
      progress = _calculateJobProgress[0],
      leftDuration = _calculateJobProgress[1];

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$K.section, className)
  }, !onlyDuration && /*#__PURE__*/React__default.createElement("div", {
    className: css$K.progressBar
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$K.progress,
    style: {
      width: progress + "%"
    }
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$K.time
  }, getFormattedDuration(leftDuration), " ", t('left')));
};

var css$L = {"row":"_2f7FO","dropdown":"_2hTQP","cell":"_3ntzL","status":"_2MUSr","progress":"_1J2il"};

var REFRESH_TIMEOUT = 2000;

var dataFormat = function dataFormat(data) {
  return data.job;
};

var TableRow = memo(function (_ref) {
  var _currentUser$data;

  var data = _ref.data,
      onClickRow = _ref.onClickRow,
      onEdit = _ref.onEdit,
      onDelete = _ref.onDelete;

  var _useActions = useActions(),
      runJob = _useActions.runJob,
      stopJob = _useActions.stopJob;

  var _useAppStore = useAppStore(),
      _useAppStore$ = _useAppStore[0],
      currentUser = _useAppStore$.currentUser,
      apiUrl = _useAppStore$.apiUrl;

  var currentUserName = (_currentUser$data = currentUser.data) === null || _currentUser$data === void 0 ? void 0 : _currentUser$data.user;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useParams = useParams(),
      user = _useParams.user;

  var _useState = useState(0),
      refreshInterval = _useState[0],
      setRefreshInterval = _useState[1];

  var _useSWR = useSWR([apiUrl + config.JOB_DETAILS(user, data.id), dataFormat], fetcher, {
    refreshInterval: refreshInterval,
    initialData: data,
    revalidateOnFocus: false
  }),
      jobData = _useSWR.data,
      mutate = _useSWR.mutate;

  var rowClick = function rowClick() {
    if (onClickRow) onClickRow(jobData);
  };

  useEffect(function () {
    if (['RUNNING', 'SCHEDULED'].indexOf(jobData === null || jobData === void 0 ? void 0 : jobData.status) >= 0) {
      if (!refreshInterval) setRefreshInterval(REFRESH_TIMEOUT);
    } else if (refreshInterval) {
      setRefreshInterval(0);
    }
  }, [jobData]);

  var onRun = function onRun() {
    try {
      return Promise.resolve(runJob({
        user: user,
        id: jobData.id
      })).then(function (_ref2) {
        var job = _ref2.job;
        if (job) mutate(_extends({}, jobData, job));
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var onStop = function onStop() {
    try {
      return Promise.resolve(stopJob({
        user: user,
        id: jobData.id
      })).then(function (_ref3) {
        var job = _ref3.job;
        if (job) mutate(_extends({}, jobData, job));
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var getTitle = function getTitle() {
    if (jobData.title && jobData.title.length) return jobData.title;else return /*#__PURE__*/React__default.createElement("span", null, "New job");
  };

  var renderStatus = function renderStatus() {
    switch (jobData.status) {
      case 'SCHEDULED':
        return /*#__PURE__*/React__default.createElement("div", {
          className: css$L.status
        }, t('inProgress'), "\u2026");

      case 'RUNNING':
        return /*#__PURE__*/React__default.createElement("div", {
          className: css$L.status
        }, t('inProgress'), "\u2026", /*#__PURE__*/React__default.createElement(Progress, {
          className: css$L.progress,
          data: jobData
        }));

      case 'TIMEOUT':
        return /*#__PURE__*/React__default.createElement("div", {
          className: cx(css$L.status, 'fail')
        }, "\u26D4\uFE0F ", t('failedDueToTimeout'));

      case 'FAILED':
        return /*#__PURE__*/React__default.createElement("div", {
          className: cx(css$L.status, 'fail')
        }, "\u26D4\uFE0F ", t('failed'));

      case 'FINISHED':
        return /*#__PURE__*/React__default.createElement("div", {
          className: cx(css$L.status, 'success')
        }, "\u2705 ", t('completed'));

      case 'CREATED':
        return /*#__PURE__*/React__default.createElement("div", {
          className: css$L.status
        }, t('neverRun'));

      default:
        return /*#__PURE__*/React__default.createElement("div", {
          className: css$L.status
        }, t(jobData.status.toLowerCase()));
    }
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$L.row, {
      red: ['TIMEOUT', 'FAILED'].indexOf(jobData.status) > -1
    }),
    onClick: rowClick
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$L.cell
  }, getTitle()), /*#__PURE__*/React__default.createElement("div", {
    className: css$L.cell
  }, t(jobData.runtime)), /*#__PURE__*/React__default.createElement("div", {
    className: css$L.cell
  }, moment(jobData.started).format('MM-DD-YYYY [at] HH:mm')), /*#__PURE__*/React__default.createElement("div", {
    className: css$L.cell
  }, getFormattedDuration(jobData.finished - jobData.started)), /*#__PURE__*/React__default.createElement("div", {
    className: css$L.cell
  }, renderStatus(), currentUserName === user && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$L.dropdown,
    items: [].concat(['RUNNING', 'SCHEDULED', 'STOPPING'].indexOf(jobData.status) >= 0 ? [{
      title: t('stop'),
      onClick: onStop
    }] : [{
      title: t('run'),
      onClick: onRun
    }], [{
      title: t('edit'),
      onClick: onEdit
    }, {
      title: t('delete'),
      onClick: onDelete
    }])
  })));
});

var css$M = {"list":"_VXs44","title":"_r4zAA","button":"_21dbT","search":"_1mylL","mobileSearch":"_3Oub0","text":"_Ra7UV","tableWrap":"_2CYWc","table":"_2iL6k","tableCaptions":"_2YOUS","tableCell":"_3tQ5e"};

var dataFormat$1 = function dataFormat(data) {
  return data.jobs;
};

var List$2 = function List() {
  var _currentUser$data;

  var _useActions = useActions(),
      createJob = _useActions.createJob,
      removeJob = _useActions.removeJob;

  var _useAppStore = useAppStore(),
      _useAppStore$ = _useAppStore[0],
      currentUser = _useAppStore$.currentUser,
      apiUrl = _useAppStore$.apiUrl;

  var currentUserName = (_currentUser$data = currentUser.data) === null || _currentUser$data === void 0 ? void 0 : _currentUser$data.user;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useState = useState(''),
      search = _useState[0],
      setSearch = _useState[1];

  var _useParams = useParams(),
      user = _useParams.user;

  var _useHistory = useHistory(),
      push = _useHistory.push;

  var _useSWR = useSWR([apiUrl + config.JOB_LIST(user), dataFormat$1], fetcher),
      data = _useSWR.data,
      mutate = _useSWR.mutate;

  var onChangeSearch = function onChangeSearch(value) {
    return setSearch(value);
  };

  var getItems = function getItems() {
    var items = [];

    if (data && data.length) {
      if (search.length) items = data.filter(function (i) {
        return i.title.indexOf(search) >= 0;
      });else items = data;
    }

    return items;
  };

  var items = getItems();

  var onAdd = function onAdd() {
    try {
      var lastRuntime = localStorage.getItem('lastRuntime') || 'python';
      return Promise.resolve(createJob({
        user: user,
        runtime: lastRuntime
      })).then(function (data) {
        push(routes.jobsDetails(user, data.job.id));
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var getOnRemove = function getOnRemove(job) {
    return function () {
      try {
        return Promise.resolve(removeJob({
          user: user,
          id: job.id
        })).then(function () {
          mutate(data.filter(function (j) {
            return j.id !== job.id;
          }));
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };
  };

  if (!data) return /*#__PURE__*/React__default.createElement(Loader$5, null);
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$M.list
  }, /*#__PURE__*/React__default.createElement(Yield, {
    name: "header-yield"
  }, /*#__PURE__*/React__default.createElement(SearchField, {
    showEverything: true,
    isDark: true,
    placeholder: t('findJob'),
    size: "small",
    value: search,
    className: css$M.search,
    onChange: onChangeSearch
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$M.title
  }, currentUserName === user ? t('myJobs') : t('jobsOf', {
    name: user
  }), /*#__PURE__*/React__default.createElement(Button, {
    className: css$M.button,
    variant: "contained",
    color: "primary",
    size: "small",
    onClick: onAdd
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-plus"
  }), " ", t('newJob'))), /*#__PURE__*/React__default.createElement("div", {
    className: css$M.text
  }, t('youHaveJobs', {
    count: data.length
  }), ' ', /*#__PURE__*/React__default.createElement("a", {
    href: config.DOCS_URL + '/jobs',
    target: "_blank"
  }, t('documentation'), /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-open-in-new"
  })), "."), data && Boolean(data.length) && /*#__PURE__*/React__default.createElement(SearchField, {
    placeholder: t('findJob'),
    className: css$M.mobileSearch,
    showEverything: true,
    size: "small",
    value: search,
    onChange: onChangeSearch
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$M.tableWrap
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$M.table
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$M.tableCaptions
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$M.tableCell
  }, t('job')), /*#__PURE__*/React__default.createElement("div", {
    className: css$M.tableCell
  }, t('runtime')), /*#__PURE__*/React__default.createElement("div", {
    className: css$M.tableCell
  }, t('lastRun')), /*#__PURE__*/React__default.createElement("div", {
    className: css$M.tableCell
  }, t('timeSpent')), /*#__PURE__*/React__default.createElement("div", {
    className: css$M.tableCell
  }, t('status'))), items.map(function (item) {
    return /*#__PURE__*/React__default.createElement(TableRow, {
      data: item,
      key: item.id,
      onClickRow: function onClickRow() {
        return push(routes.jobsDetails(user, item.id));
      },
      onEdit: function onEdit() {
        return push(routes.jobsDetails(user, item.id));
      },
      onDelete: getOnRemove(item)
    });
  }))));
};

var useAppProgress = (function () {
  var _useAppStore = useAppStore(),
      dispatch = _useAppStore[1];

  var startAppProgress = function startAppProgress() {
    dispatch({
      type: actionsTypes.START_PROGRESS
    });
  };

  var setAppProgress = function setAppProgress(progress) {
    dispatch({
      type: actionsTypes.SET_PROGRESS,
      payload: progress
    });
  };

  var completeAppProgress = function completeAppProgress() {
    dispatch({
      type: actionsTypes.COMPLETE_PROGRESS
    });
  };

  var resetAppProgress = function resetAppProgress() {
    dispatch({
      type: actionsTypes.RESET_PROGRESS
    });
  };

  return {
    startAppProgress: startAppProgress,
    setAppProgress: setAppProgress,
    completeAppProgress: completeAppProgress,
    resetAppProgress: resetAppProgress
  };
});

var css$N = {"schedule":"_YoEcM","dropdown":"_3RJdh","runtime":"_2h8GE","dropdownButton":"_3fdRe","message":"_1byIj"};

var timeout = null;

var ScheduleSettings = function ScheduleSettings(_ref) {
  var data = _ref.data,
      className = _ref.className,
      onChange = _ref.onChange,
      onChangeRuntime = _ref.onChangeRuntime;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var messageRef = useRef();

  var _useState = useState(data ? data.schedule.split('/')[0] : ''),
      scheduleType = _useState[0],
      setScheduleType = _useState[1];

  var _useState2 = useState(data ? data.schedule.split('/')[1] : null),
      scheduleTime = _useState2[0],
      setScheduleTime = _useState2[1];

  var _useState3 = useState(0),
      nextRunDelay = _useState3[0],
      setNextRunDelay = _useState3[1];

  var isDidMount = useRef(true);

  var runtimeChange = function runtimeChange(runtime) {
    return function () {
      onChangeRuntime(runtime);
      localStorage.setItem('lastRuntime', runtime);
    };
  };

  var scheduleTypeChange = function scheduleTypeChange(type) {
    return function () {
      setScheduleType(type);
      if (!scheduleTime) setScheduleTime('12:00');
      if (type === 'daily') type += "/" + (scheduleTime ? scheduleTime : '12:00');
      onChange(type);
    };
  };

  var scheduleTimeChange = function scheduleTimeChange(time) {
    return function () {
      setScheduleTime(time);
      onChange(scheduleType + "/" + time);
      var runTime = moment(time, 'HH:mm');
      if (new Date().getHours() > runTime.get('hours')) runTime.add(1, 'day');
      setNextRunDelay(runTime.toDate().getTime() - Date.now());
    };
  };

  useEffect(function () {
    if (nextRunDelay && !isDidMount.current && messageRef.current) {
      messageRef.current.classList.add('show');
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(function () {
        messageRef.current.classList.remove('show');
      }, 3000);
    }

    if (isDidMount.current) isDidMount.current = false;
  }, [nextRunDelay]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$N.schedule, className)
  }, t('runtime'), ":", /*#__PURE__*/React__default.createElement(Dropdown, {
    className: cx(css$N.dropdown, css$N.runtime),
    items: [{
      title: t('python'),
      onClick: runtimeChange('python')
    }, {
      title: t('r'),
      onClick: runtimeChange('r')
    }]
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$N.dropdownButton,
    color: "primary"
  }, t(data.runtime), /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-chevron-down"
  }))), t('jobIs'), " ", scheduleType !== 'unscheduled' && t('scheduled'), /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$N.dropdown,
    items: [{
      title: t('unscheduled'),
      onClick: scheduleTypeChange('unscheduled')
    }, {
      title: t('daily'),
      onClick: scheduleTypeChange('daily')
    }]
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$N.dropdownButton,
    color: "primary"
  }, t(scheduleType), /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-chevron-down"
  }))), scheduleType === 'daily' && /*#__PURE__*/React__default.createElement(Fragment, null, t('at'), /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$N.dropdown,
    items: new Array(24).fill(0).map(function (i, index) {
      var time = (index < 10 ? '0' + index : index) + ":00";
      return {
        title: time,
        onClick: scheduleTimeChange(time)
      };
    })
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$N.dropdownButton,
    color: "primary"
  }, scheduleTime, " UTC", /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-chevron-down"
  }))), /*#__PURE__*/React__default.createElement("div", {
    ref: messageRef,
    className: cx(css$N.message, 'green-text')
  }, "The next run starts in ", getFormattedDuration(nextRunDelay))));
};

var css$O = {"editor":"_m0hwp","token":"_281_3","atrule":"_1M8ph","attr-value":"_T6_N1","keyword":"_1gT7U","function":"_2ZXkX","class-name":"_upcGt","selector":"_3rmyW","attr-name":"_I3P48","string":"_hoRdC","char":"_1uxpB","builtin":"_3xCwG","inserted":"_2Lvrk","scroll":"_1yHaS","content":"_3cHiP","success":"_1Z8bo","lineNumbers":"_1CW5r"};

var CodeEditor = function CodeEditor(_ref) {
  var _ref$value = _ref.value,
      value = _ref$value === void 0 ? '' : _ref$value,
      onChange = _ref.onChange,
      language = _ref.language,
      className = _ref.className,
      saved = _ref.saved;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var successMessageRef = useRef();
  var lines = (value.match(/\n/g) || []).length + 2;
  var lineNos = [].concat(Array(lines).keys()).slice(1).join('\n');
  var isDidMount = useRef(true);
  useEffect(function () {
    if (successMessageRef.current && !isDidMount.current) if (saved) {
      successMessageRef.current.classList.add('show');
      setTimeout(function () {
        if (successMessageRef.current) successMessageRef.current.classList.remove('show');
      }, 4000);
    } else {
      successMessageRef.current.classList.remove('show');
    }
    if (isDidMount.current) isDidMount.current = false;
  }, [saved]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$O.editor, className)
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$O.success,
    ref: successMessageRef
  }, t('changesSaved')), /*#__PURE__*/React__default.createElement("div", {
    className: css$O.scroll
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$O.content
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$O.lineNumbers,
    dangerouslySetInnerHTML: {
      __html: lineNos
    }
  }), /*#__PURE__*/React__default.createElement(Editor, {
    value: value,
    onValueChange: onChange,
    highlight: function highlight$1(code) {
      return highlight(code, languages[language]);
    },
    padding: 6,
    style: {
      width: '100%',
      fontFamily: '"Roboto Mono", monospace',
      fontSize: 12,
      lineHeight: '150%',
      outline: 'none'
    }
  }))));
};

var css$P = {"status":"_3Pfpo"};

var Status = function Status(_ref) {
  var data = _ref.data;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  if (!data.started) return null;
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$P.status
  }, t('lastRunning'), ' ', moment(data.started).format("MM-DD-YYYY [" + t('at') + "] HH:mm"), /*#__PURE__*/React__default.createElement("span", null, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-clock-outline"
  }), ['RUNNING', 'SCHEDULED'].indexOf(data.status) >= 0 ? /*#__PURE__*/React__default.createElement("span", null, ' ', t('inProgress'), "\u2026") : getFormattedDuration(data.finished - data.started)), data.status === 'FAILED' && /*#__PURE__*/React__default.createElement("span", {
    className: "red-text"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-close-octagon-outline"
  }), t('failed')), data.status === 'TIMEOUT' && /*#__PURE__*/React__default.createElement("span", {
    className: "red-text"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-close-octagon-outline"
  }), t('failedDueToTimeout')));
};

var css$Q = {"logs":"_1poNo","button":"_35eOC","text":"_2eQos","label":"_LksjJ"};

var Logs = function Logs(_ref) {
  var data = _ref.data,
      className = _ref.className;
  if (!data.logs) return null;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useState = useState(true),
      isShown = _useState[0],
      setIsShown = _useState[1];

  var _useState2 = useState(data.finished || data.started),
      updated = _useState2[0];

  var toggleShow = function toggleShow() {
    return setIsShown(!isShown);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$Q.logs, className)
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$Q.button,
    onClick: toggleShow,
    color: "primary",
    size: "small"
  }, t('logs')), /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$Q.text, {
      open: isShown
    })
  }, /*#__PURE__*/React__default.createElement("pre", null, data.logs), updated && /*#__PURE__*/React__default.createElement("div", {
    className: css$Q.label
  }, t('updated'), " ", moment(updated).fromNow())));
};

var css$R = {"loader":"_2nOeY","loader-pulse":"_1Aj7Q","title":"_RJ2x5","text1":"_2hZDH","text2":"_1-tIa","code":"_3LgqO"};

var Loader$6 = function Loader(_ref) {
  _objectDestructuringEmpty(_ref);

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$R.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$R.title
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$R.text1
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$R.text2
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$R.code
  }));
};

var css$S = {"details":"_1K_mA","header":"_1nmEh","dropdown":"_3RSoB","dropdownButton":"_2dnN2","title":"_3U50H","edit":"_bgkiC","side":"_3uIQ_","progress":"_1jRHi","button":"_2J0VV","schedule":"_2YXFa","codeEditor":"_1M2Sw","logs":"_ZQT6g"};

var REFRESH_TIMEOUT$1 = 3000;

var dataFormat$2 = function dataFormat(data) {
  return data.job;
};

var Details$2 = function Details(_ref) {
  var _currentUser$data;

  _objectDestructuringEmpty(_ref);

  var _useActions = useActions(),
      runJob = _useActions.runJob,
      stopJob = _useActions.stopJob,
      updateJob = _useActions.updateJob,
      removeJob = _useActions.removeJob;

  var _useAppProgress = useAppProgress(),
      setAppProgress = _useAppProgress.setAppProgress,
      resetAppProgress = _useAppProgress.resetAppProgress;

  var _useParams = useParams(),
      user = _useParams.user,
      id = _useParams.id;

  var _useState = useState(0),
      refreshInterval = _useState[0],
      setRefreshInterval = _useState[1];

  var _useAppStore = useAppStore(),
      _useAppStore$ = _useAppStore[0],
      currentUser = _useAppStore$.currentUser,
      apiUrl = _useAppStore$.apiUrl;

  var currentUserName = (_currentUser$data = currentUser.data) === null || _currentUser$data === void 0 ? void 0 : _currentUser$data.user;

  var _useSWR = useSWR([apiUrl + config.JOB_DETAILS(user, id), dataFormat$2], fetcher, {
    refreshInterval: refreshInterval
  }),
      jobData = _useSWR.data,
      error = _useSWR.error,
      mutate = _useSWR.mutate;

  var _useHistory = useHistory(),
      push = _useHistory.push;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useState2 = useState(''),
      titleValue = _useState2[0],
      setTitleValue = _useState2[1];

  var _useState3 = useState(''),
      code = _useState3[0],
      setCode = _useState3[1];

  var _useState4 = useState(false),
      running = _useState4[0],
      setRunning = _useState4[1];

  var _useState5 = useState(false),
      stopping = _useState5[0],
      setStopping = _useState5[1];

  var _useState6 = useState(true),
      codeSaved = _useState6[0],
      setCodeSaved = _useState6[1];

  var progressTimer = useRef(null);

  var update = function update(params) {
    try {
      return Promise.resolve(updateJob(params)).then(function (data) {
        mutate(_extends({}, jobData, data.job));
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var updateDebounce = useDebounce(update, 1000, []);
  var updateLongDebounce = useDebounce(update, 2000, []);
  var prevData = usePrevious(jobData);
  useEffect(function () {
    window.addEventListener('keydown', detectEnterPress);
    return function () {
      return window.removeEventListener('keydown', detectEnterPress);
    };
  }, [jobData, code]);
  useEffect(function () {
    if (jobData) {
      setTitleValue(jobData.title);
      setCode(jobData.code);
    }
  }, []);

  var detectEnterPress = function detectEnterPress(event) {
    if (event.code === 'Enter' && (event.shiftKey || event.ctrlKey)) {
      event.preventDefault();
      if (!running && !stopping) onClickRun();
    }
  };

  useEffect(function () {
    if (['RUNNING', 'SCHEDULED', 'STOPPING'].indexOf(jobData === null || jobData === void 0 ? void 0 : jobData.status) >= 0) {
      clearInterval(progressTimer.current);
      progressTimer.current = setInterval(function () {
        var _calculateJobProgress = calculateJobProgress(jobData),
            progress = _calculateJobProgress[0];

        setAppProgress(progress);
      }, 50);
    } else {
      clearInterval(progressTimer.current);
    }

    return function () {
      return clearInterval(progressTimer.current);
    };
  }, [refreshInterval, jobData]);
  useEffect(function () {
    if ((prevData === null || prevData === void 0 ? void 0 : prevData.id) !== (jobData === null || jobData === void 0 ? void 0 : jobData.id)) {
      setTitleValue(jobData.title);
      setCode(jobData.code);
    }

    if (['RUNNING', 'SCHEDULED'].indexOf(jobData === null || jobData === void 0 ? void 0 : jobData.status) >= 0) {
      if (!refreshInterval) setRefreshInterval(REFRESH_TIMEOUT$1);
    } else if (refreshInterval) {
      setRefreshInterval(0);
      resetAppProgress();
    }

    return function () {
      resetAppProgress();
    };
  }, [jobData]);

  var onChangeTitle = function onChangeTitle(value) {
    setTitleValue(value);
    updateDebounce({
      user: user,
      id: jobData === null || jobData === void 0 ? void 0 : jobData.id,
      title: value
    });
  };

  var onChangeCode = function onChangeCode(value) {
    setCode(value);
    setCodeSaved(false);
    updateLongDebounce({
      user: user,
      id: jobData === null || jobData === void 0 ? void 0 : jobData.id,
      code: value
    }, function () {
      return setCodeSaved(true);
    });
  };

  var onChangeRuntime = function onChangeRuntime(runtime) {
    update({
      user: user,
      id: jobData === null || jobData === void 0 ? void 0 : jobData.id,
      runtime: runtime
    });
  };

  var onChangeSchedule = function onChangeSchedule(schedule) {
    update({
      user: user,
      id: jobData === null || jobData === void 0 ? void 0 : jobData.id,
      schedule: schedule
    });
  };

  var onClickRun = function onClickRun() {
    try {
      var _temp3 = function _temp3() {
        setRunning(false);
      };

      setRunning(true);

      var _temp4 = _catch(function () {
        return Promise.resolve(runJob({
          user: user,
          id: jobData === null || jobData === void 0 ? void 0 : jobData.id,
          code: code
        })).then(function (data) {
          mutate(_extends({}, jobData, data));
          setRefreshInterval(REFRESH_TIMEOUT$1);
        });
      }, function (e) {
        console.log(e);
      });

      return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp3) : _temp3(_temp4));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var onClickStop = function onClickStop() {
    try {
      var _temp7 = function _temp7() {
        setStopping(false);
      };

      setStopping(true);

      var _temp8 = _catch(function () {
        return Promise.resolve(stopJob({
          user: user,
          id: jobData === null || jobData === void 0 ? void 0 : jobData.id
        })).then(function (data) {
          mutate(_extends({}, jobData, data));
        });
      }, function (e) {
        console.log(e);
      });

      return Promise.resolve(_temp8 && _temp8.then ? _temp8.then(_temp7) : _temp7(_temp8));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var onClickDelete = function onClickDelete() {
    try {
      return Promise.resolve(removeJob({
        user: user,
        id: jobData === null || jobData === void 0 ? void 0 : jobData.id
      })).then(function () {
        push(routes.jobs(user));
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  if (!jobData && !error) return /*#__PURE__*/React__default.createElement(Loader$6, null);
  if ((error === null || error === void 0 ? void 0 : error.status) === 403) return /*#__PURE__*/React__default.createElement(AccessForbidden, null, t('youDontHaveAnAccessToThisJob'), ".", isSignedIn() && /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement("br", null), /*#__PURE__*/React__default.createElement(Link, {
    to: routes.dashboards(currentUserName)
  }, t('goToMyJobs'))));
  if ((error === null || error === void 0 ? void 0 : error.status) === 404) return /*#__PURE__*/React__default.createElement(NotFound, null, t('theJobYouAreRookingForCouldNotBeFound'), ' ', isSignedIn() && /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement(Link, {
    to: routes.dashboards(currentUserName)
  }, t('goToMyJobs')), "."));
  if (!jobData) return null;
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$S.details
  }, /*#__PURE__*/React__default.createElement(Yield, {
    name: "header-yield"
  }, /*#__PURE__*/React__default.createElement(BackButton, {
    Component: Link,
    to: routes.jobs(user)
  }, currentUserName === user ? t('backToJobs') : t('backToJobsOf', {
    name: user
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: css$S.header
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$S.title
  }, /*#__PURE__*/React__default.createElement(StretchTitleField, {
    className: css$S.edit,
    value: titleValue,
    onChange: onChangeTitle,
    readOnly: currentUserName !== user,
    placeholder: t('newJob')
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$S.side
  }, jobData.status === 'RUNNING' && /*#__PURE__*/React__default.createElement(Progress, {
    onlyDuration: true,
    className: css$S.progress,
    data: jobData
  }), jobData.status === 'FAILED' && /*#__PURE__*/React__default.createElement("div", {
    className: "red-text"
  }, t('sorryButYourCodeDoesntLookLikePythonJob')), ['RUNNING', 'SCHEDULED', 'STOPPING'].indexOf(jobData.status) >= 0 ? /*#__PURE__*/React__default.createElement(Button, {
    className: css$S.button,
    color: "fail",
    size: "small",
    variant: "contained",
    disabled: stopping,
    onClick: onClickStop
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-pause"
  }), t('stop')) : /*#__PURE__*/React__default.createElement(Button, {
    className: css$S.button,
    color: "success",
    size: "small",
    variant: "contained",
    disabled: running,
    onClick: onClickRun
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-play"
  }), t('run'))), currentUserName === user && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$S.dropdown,
    items: [{
      title: t('delete'),
      onClick: onClickDelete
    }]
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$S.dropdownButton,
    color: "secondary"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-dots-horizontal"
  })))), /*#__PURE__*/React__default.createElement(Status, {
    data: jobData
  }), /*#__PURE__*/React__default.createElement(ScheduleSettings, {
    className: css$S.schedule,
    data: jobData,
    onChange: onChangeSchedule,
    onChangeRuntime: onChangeRuntime
  }), /*#__PURE__*/React__default.createElement(CodeEditor, {
    className: css$S.codeEditor,
    value: code,
    onChange: onChangeCode,
    language: jobData.runtime,
    saved: codeSaved
  }), /*#__PURE__*/React__default.createElement(Logs, {
    className: css$S.logs,
    data: jobData
  }));
};

var css$T = {"jobs":"_z2_YO"};

var Jobs = function Jobs(_ref) {
  _objectDestructuringEmpty(_ref);

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$T.jobs
  }, /*#__PURE__*/React__default.createElement(Switch, null, /*#__PURE__*/React__default.createElement(Route, {
    path: routes.jobs(),
    exact: true,
    component: List$2
  }), /*#__PURE__*/React__default.createElement(Route, {
    path: routes.jobsDetails(),
    component: Details$2
  })));
};

var logo = require("./logo~gyFSAwBb.svg");

var css$U = {"header":"_3C4T1","logo":"_1jfuS","buttons":"_2EQYi","button":"_3cb7N"};

var Header = function Header(_ref) {
  var className = _ref.className;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$U.header, className)
  }, /*#__PURE__*/React__default.createElement(Link, {
    to: "/",
    className: css$U.logo
  }, /*#__PURE__*/React__default.createElement("img", {
    width: "129",
    height: "35",
    src: logo,
    alt: "logo"
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$U.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    Component: Link,
    to: "/auth/login",
    className: css$U.button,
    color: "primary"
  }, t('logIn'))));
};

var css$V = {"layout":"_23bi3","header":"_1chFa","main":"_70hee"};

var UnAuthorizedLayout = function UnAuthorizedLayout(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$V.layout
  }, /*#__PURE__*/React__default.createElement(Header, {
    className: css$V.header
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$V.main
  }, children));
};

var css$W = {"infoButton":"_2zmYM"};

var SettingsInformation = function SettingsInformation(_ref) {
  var className = _ref.className,
      renderModalContent = _ref.renderModalContent;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useState = useState(false),
      isShowModal = _useState[0],
      setIsShowModal = _useState[1];

  var toggleModal = function toggleModal() {
    return setIsShowModal(function (value) {
      return !value;
    });
  };

  return /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement(Button, {
    className: cx(css$W.infoButton, className),
    size: "small",
    color: "secondary",
    onClick: toggleModal
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-information-outline"
  })), renderModalContent && /*#__PURE__*/React__default.createElement(Modal, {
    withCloseButton: true,
    title: t('howToConnectYourDataWithDStack'),
    isShow: isShowModal,
    size: "big",
    onClose: toggleModal
  }, renderModalContent()));
};

export { AccessForbidden, AppStoreProvider, Avatar, BackButton, Button, CheckboxField, CodeViewer, Copy, AddStacksModal as DashboardAddStacksModal, Details$1 as DashboardDetails, List$1 as DashboardList, Item$1 as DashboardListItem, GridContext as DnDGridContext, GridProvider as DnDGridContextProvider, DnDItem, Dropdown, FileDragnDrop$1 as FileDragnDrop, Jobs, Loader, MarkdownRender, Modal, NotFound, ProgressBar, SearchField, SelectField, SettingsInformation, SliderField, Spinner, Attachment as StackAttachment, StateProvider as StackAttachmentProvider, Details as StackDetails, StackFilters, Frames as StackFrames, HowTo as StackHowToFetchData, List as StackList, Item as StackListItem, Upload as StackUpload, StretchTitleField, Tabs, TextAreaField, TextField, Tooltip, UnAuthorizedLayout, UploadStack, ViewSwitcher, Yield, apiFabric, actionsTypes as appStoreActionTypes, config, useAppStore };
//# sourceMappingURL=index.modern.js.map

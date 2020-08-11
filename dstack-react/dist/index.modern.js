import React__default, { forwardRef, useState, useRef, useEffect, useCallback, createContext, useReducer, useContext, Fragment, Component, memo } from 'react';
import cx from 'classnames';
import Highlight from 'react-highlight.js';
import { useTranslation } from 'react-i18next';
import copy from 'copy-to-clipboard';
import RcTooltip from 'rc-tooltip';
import { get, isEqual, isString, debounce, unionBy } from 'lodash-es';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import MathJax from 'react-mathjax';
import RemarkMathPlugin from 'remark-math';
import { Portal } from 'react-portal';
import Select, { Option, OptGroup } from 'rc-select';
import Slider from 'rc-slider';
import axios from 'axios';
import Plot from 'react-plotly.js';
import { parse } from 'csv-string';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import { useDrag, useDrop } from 'react-dnd';
export { DndProvider } from 'react-dnd';
import { useParams } from 'react-router';

var config = {
  DOCS_URL: 'http://docs.dstack.ai',
  LOGIN_URL: '/users/login',
  VERIFY_EMAIL_URL: '/users/verify',
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
  DISCORD_URL: 'https://discord.gg/8xfhEYa',
  TWITTER_URL: 'https://twitter.com/dstackai',
  GITHUB_URL: 'https://github.com/dstackai',
  BLOG_URL: 'https://blog.dstack.ai',
  CONFIGURE_PYTHON_COMMAND: function CONFIGURE_PYTHON_COMMAND(token, userName) {
    if (token === void 0) {
      token = '<token>';
    }

    if (userName === void 0) {
      userName = '<username>';
    }

    var origin = window ? window.location.origin : '';
    return "dstack config add --token " + token + " --user " + userName + " --server " + origin + "/api";
  },
  CONFIGURE_R_COMMAND: function CONFIGURE_R_COMMAND(token, userName) {
    if (token === void 0) {
      token = '<token>';
    }

    if (userName === void 0) {
      userName = '<username>';
    }

    var origin = window ? window.location.origin : '';
    return "dstack::configure(user = \"" + userName + "\", token = \"" + token + "\", persist = \"global\"" + (", server = \"" + origin + "/api\")");
  }
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

var parseStackParams = (function (attachments) {
  var fields = {};
  if (!attachments || !attachments.length) return;
  attachments.forEach(function (i) {
    Object.keys(i.params).forEach(function (key) {
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

var css$9 = {"dnd":"_3uYii","file":"_2LG6L","fileExtend":"_3w6--","fileSection":"_B8y5t","fileName":"_3Juxo","fileSize":"_3G6N8","fileRemove":"_16dzP","placeholder":"_Wr_Zp","loading":"_2KndP","progressBar":"_DHbC1","progress":"_2-dth","animate-stripes":"_1Iecq"};

var FileDragnDrop = function FileDragnDrop(_ref) {
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
    className: cx(css$9.file, className)
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$9.fileExtend
  }, ".csv"), /*#__PURE__*/React__default.createElement("div", {
    className: css$9.fileSection
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$9.fileName
  }, selectedFile.name), /*#__PURE__*/React__default.createElement("div", {
    className: css$9.fileSize
  }, formatBytes(selectedFile.size))), /*#__PURE__*/React__default.createElement("div", {
    onClick: removeFile,
    className: cx(css$9.fileRemove, 'mdi mdi-close')
  }));
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
  }, t('dragHereAFile'), '', Boolean(formats) && "(" + formats.join(', ') + ")", ' ', t('or'), ' ', /*#__PURE__*/React__default.createElement("a", {
    onClick: onClick,
    href: "#"
  }, t('upload')), ' ', t('fromYourComputer'), "."));
};

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
  var ref = useRef(null);
  useEffect(function () {
    if (isActive) {
      setProgress(0);
      step.current = 0.01;
      currentProgress.current = 0;
      startCalculateProgress();
    }

    if (prevIsActive === true && isActive === false) {
      if (requestFrame.current) cancelAnimationFrame(requestFrame.current);
      setProgress(100);
      setTimeout(function () {
        return setProgress(0);
      }, 800);
    }

    if (isActive === null) {
      if (requestFrame.current) cancelAnimationFrame(requestFrame.current);
      setProgress(0);
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

  var startCalculateProgress = function startCalculateProgress() {
    requestAnimationFrame(calculateProgress);
  };

  var calculateProgress = useCallback(function () {
    currentProgress.current += step.current;
    var progress = Math.round(Math.atan(currentProgress.current) / (Math.PI / 2) * 100 * 1000) / 1000;
    setProgress(progress);
    if (progress > 70) step.current = 0.005;
    if (progress >= 100) cancelAnimationFrame(requestFrame.current);
    requestFrame.current = requestAnimationFrame(calculateProgress);
  }, [isActive]);

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
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$i.filters, className)
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
    'pointer-events': 'none'
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
  if (children) return /*#__PURE__*/React__default.createElement(Portal, {
    node: document && document.getElementById(name)
  }, children);
  return /*#__PURE__*/React__default.createElement("div", {
    className: className,
    id: name
  });
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

var css$o = {"table":"_3tMWP"};

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

var actionsTypes = {
  FETCH: 'stacks/attachments/FETCH',
  FETCH_SUCCESS: 'stacks/attachments/FETCH_SUCCESS',
  FETCH_FAIL: 'stacks/attachments/FETCH_FAIL'
};

var initialState = {
  data: {},
  errors: {},
  requestStatus: null
};
var reducer = function reducer(state, action) {
  var _extends2, _extends3, _extends4, _extends5, _extends6, _extends7;

  if (state === void 0) {
    state = initialState;
  }

  switch (action.type) {
    case actionsTypes.FETCH:
      return _extends({}, state, {
        data: _extends({}, state.data, (_extends3 = {}, _extends3[action.meta.frameId] = _extends({}, state.data[action.meta.frameId], (_extends2 = {}, _extends2[action.meta.id] = _extends({}, state.data[action.meta.frameId] ? state.data[action.meta.frameId][action.meta.id] : {}, {
          loading: true,
          requestStatus: null,
          error: null
        }), _extends2)), _extends3))
      });

    case actionsTypes.FETCH_SUCCESS:
      return _extends({}, state, {
        data: _extends({}, state.data, (_extends5 = {}, _extends5[action.meta.frameId] = _extends({}, state.data[action.meta.frameId], (_extends4 = {}, _extends4[action.meta.id] = _extends({}, action.payload, {
          loading: false
        }), _extends4)), _extends5))
      });

    case actionsTypes.FETCH_FAIL:
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
var StateContext = createContext();
var StateProvider = function StateProvider(_ref) {
  var children = _ref.children,
      apiUrl = _ref.apiUrl;
  return /*#__PURE__*/React__default.createElement(StateContext.Provider, {
    value: useReducer(reducer, _extends({}, initialState, {
      apiUrl: apiUrl
    }))
  }, children);
};
var useStateValue = function useStateValue() {
  return useContext(StateContext);
};

var actions = (function () {
  var _useStateValue = useStateValue(),
      apiUrl = _useStateValue[0].apiUrl,
      dispatch = _useStateValue[1];

  var fetchAttachment = function fetchAttachment(stack, frameId, id, onSuccess) {
    try {
      var token = localStorage.getItem('token');
      dispatch({
        type: actionsTypes.FETCH,
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
            type: actionsTypes.FETCH_SUCCESS,
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
          type: actionsTypes.FETCH_FAIL,
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

var css$p = {"attachment":"_3NILI","loading-pulse":"_IhCO3","view":"_3UWqG","text":"_MOcaD","message":"_1IDQc"};

var base64ToJSON = function base64ToJSON(base64) {
  var parsedJSON;

  try {
    parsedJSON = JSON.parse(atob(base64));
  } catch (e) {
    console.log(e);
  }

  return parsedJSON;
};

var base64ImagePrefixes = {
  'image/svg+xml': 'data:image/svg+xml;charset=utf-8;',
  'image/png': 'data:image/png;charset=utf-8;',
  'image/jpeg': 'data:image/jpeg;charset=utf-8;'
};

var isImageType = function isImageType(type) {
  return /^image/.test(type);
};

var Attachment = function Attachment(_ref) {
  var id = _ref.id,
      className = _ref.className,
      frameId = _ref.frameId,
      isList = _ref.isList,
      withLoader = _ref.withLoader,
      stack = _ref.stack;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _actions = actions(),
      fetchAttachment = _actions.fetchAttachment;

  var _useStateValue = useStateValue(),
      _useStateValue$ = _useStateValue[0],
      data = _useStateValue$.data,
      apiUrl = _useStateValue$.apiUrl;

  var _get = get(data, frameId + "." + id, {}),
      loading = _get.loading,
      error = _get.error,
      requestStatus = _get.requestStatus,
      attachment = _objectWithoutPropertiesLoose(_get, ["loading", "error", "requestStatus"]);

  var _useState = useState(1),
      tableScale = _useState[0],
      setTableScale = _useState[1];

  var _useState2 = useState(false),
      loadingFullAttachment = _useState2[0],
      setLoadingFullAttachment = _useState2[1];

  var _useState3 = useState(null),
      fullAttachment = _useState3[0],
      setFullAttachment = _useState3[1];

  var viewRef = useRef(null);
  var prevAttachment = usePrevious(attachment);
  useEffect(function () {
    if (window && isList) window.addEventListener('resize', onResizeCard);
    return function () {
      if (window && isList) window.removeEventListener('resize', onResizeCard);
    };
  }, []);

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

  useEffect(function () {
    if (attachment && attachment['application'] === 'bokeh' && Bokeh) {
      var json = base64ToJSON(attachment.data);
      if (json && document.querySelector("#bokeh-" + frameId)) Bokeh.embed.embed_item(json, "bokeh-" + frameId);
    }

    if (isList) setTimeout(function () {
      return onResizeCard();
    }, 10);
  }, [data]);

  var onResizeCard = function onResizeCard() {
    if (ref.current && viewRef.current) {
      var containerWidth = ref.current.offsetWidth;
      var viewWidth = viewRef.current.offsetWidth / tableScale;
      var newScale = containerWidth / viewWidth;
      if (newScale > 1) newScale = 1;
      setTableScale(newScale);
    }
  };

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
      var _data = parse(decodeCSV);

      if (Array.isArray(_data) && _data.length) return /*#__PURE__*/React__default.createElement(Table, {
        data: _data
      });
    }

    return /*#__PURE__*/React__default.createElement("div", {
      className: css$p.text
    }, t('notSupportedAttachment'));
  };

  var renderPlotly = function renderPlotly() {
    var json = base64ToJSON(attachment.data);
    if (!json) return null;
    json.layout.width = '100%';
    json.layout.margin = 0;
    json.layout.autosize = true;
    json.config = {
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
    if (loading) return null;
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
        return null;

      default:
        return /*#__PURE__*/React__default.createElement("div", {
          className: isList ? css$p.message : css$p.text
        }, t('notSupportedAttachment'));
    }
  };

  return /*#__PURE__*/React__default.createElement("div", {
    ref: ref,
    className: cx(css$p.attachment, className, {
      'is-list': isList,
      loading: loading && withLoader || loadingFullAttachment
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    ref: viewRef,
    className: cx(css$p.view, {
      'table': attachment && attachment.data && attachment['content_type'] === 'text/csv',
      'bokeh': attachment && attachment.data && attachment['application'] === 'bokeh'
    }),
    style: attachment && attachment['content_type'] === 'text/csv' ? {
      transform: "scale(" + tableScale + ")"
    } : {}
  }, renderAttachment()));
};

var css$q = {"item":"_fLtf5","preview":"_2dbXz","previewWrap":"_2tToy","emptyMessage":"_3HPC2","attachment":"_2ggOS","section":"_1ugjv","content":"_2S1Sc","name":"_147V3","by":"_3t2iA","permissions":"_2SUP0","dropdown":"_35FwM","preview-stack-pulse":"_YESUl"};

var Item = function Item(_ref) {
  var _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? 'div' : _ref$Component,
      onClick = _ref.onClick,
      data = _ref.data,
      deleteAction = _ref.deleteAction,
      otherOwner = _ref.otherOwner,
      renderContent = _ref.renderContent,
      rest = _objectWithoutPropertiesLoose(_ref, ["Component", "onClick", "data", "deleteAction", "otherOwner", "renderContent"]);

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var ref = useRef(null);
  return /*#__PURE__*/React__default.createElement(Component, _extends({
    className: css$q.item,
    ref: ref,
    onClick: onClick
  }, rest), /*#__PURE__*/React__default.createElement("div", {
    className: css$q.previewWrap
  }, data.head ? /*#__PURE__*/React__default.createElement(Attachment, {
    className: css$q.attachment,
    isList: true,
    withLoader: true,
    stack: data.user + "/" + data.name,
    frameId: data.head,
    id: 0
  }) : /*#__PURE__*/React__default.createElement("div", {
    className: css$q.emptyMessage
  }, t('emptyStack'))), /*#__PURE__*/React__default.createElement("div", {
    className: css$q.section
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$q.content
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$q.name
  }, data.name, ' ', /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-lock" + (data["private"] ? '' : '-open')
  })), otherOwner && /*#__PURE__*/React__default.createElement("div", {
    className: css$q.by
  }, t('by'), " ", data.user), renderContent && renderContent(data)), deleteAction && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$q.dropdown,
    items: [{
      title: t('delete'),
      onClick: function onClick() {
        return deleteAction(data.name);
      }
    }]
  })));
};

var css$r = {"howto":"_2kGrG","tabs":"_RLKw7","description":"_3Ul2-","code":"_11v2r","footer":"_nTy2P"};

var reportPlotPythonCode = "import matplotlib.pyplot as plt\nfrom dstack import push_frame\n\nfig = plt.figure()\nplt.plot([1, 2, 3, 4], [1, 4, 9, 16])\n\npush_frame(\"simple\", fig, \"My first plot\")";
var installRPackageCode = 'install.packages("dstack")';
var reportPlotRCode = "library(ggplot2)\nlibrary(dstack)\n\ndf <- data.frame(x = c(1, 2, 3, 4), y = c(1, 4, 9, 16))\nimage <- ggplot(data = df, aes(x = x, y = y)) + geom_line()\n\npush_frame(\"simple\", image, \"My first plot\")";

var HowTo = function HowTo(_ref) {
  var user = _ref.user,
      token = _ref.token;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useState = useState(1),
      activeCodeTab = _useState[0],
      setActiveCodeTab = _useState[1];

  var _useState2 = useState(1),
      activePlatformTab = _useState2[0],
      setActivePlatformTab = _useState2[1];

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$r.howto
  }, /*#__PURE__*/React__default.createElement(Tabs, {
    className: css$r.tabs,
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
    className: css$r.description
  }, t('installPipOrCondaPackage')), /*#__PURE__*/React__default.createElement(Tabs, {
    className: css$r.tabs,
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
    className: css$r.code,
    language: "bash"
  }, "pip install dstack"), activePlatformTab === 2 && /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "bash"
  }, "conda install dstack -c dstack.ai"), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('configureDStack')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "bash"
  }, config.CONFIGURE_PYTHON_COMMAND(token, user)), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('reportPlotIntro')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "python"
  }, reportPlotPythonCode)), activeCodeTab === 2 && /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('installRPackage')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "r"
  }, installRPackageCode), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('configureDStack')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "r"
  }, config.CONFIGURE_R_COMMAND(token, user)), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('reportPlotIntro')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "r"
  }, reportPlotRCode)), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.footer,
    dangerouslySetInnerHTML: {
      __html: t('notClearCheckTheDocks', {
        href: config.DOCS_URL
      })
    }
  }));
};

var css$s = {"list":"_3CcWo","title":"_2HbVV","side":"_I1N48","message":"_3XJKG","text":"_1_wO5","grid":"_1BjLa","search":"_3VlZv","mobileSearch":"_IxVfV","modal":"_1BJIQ","description":"_1U-iN","buttons":"_19NkE","button":"_3jLaw"};

var List = function List(_ref) {
  var _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      loading = _ref.loading,
      deleteStack = _ref.deleteStack,
      currentUser = _ref.currentUser,
      user = _ref.user,
      currentUserToken = _ref.currentUserToken,
      renderSideTitle = _ref.renderSideTitle,
      renderItemContent = _ref.renderItemContent;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useState = useState(null),
      deletingStack = _useState[0],
      setDeletingStack = _useState[1];

  var _useState2 = useState(false),
      isShowWelcomeModal = _useState2[0],
      setIsShowWelcomeModal = _useState2[1];

  var _useState3 = useState(false),
      isShowHowToModal = _useState3[0],
      setIsShowHowToModal = _useState3[1];

  var _useState4 = useState(''),
      search = _useState4[0],
      setSearch = _useState4[1];

  var isInitialMount = useRef(true);

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

  var showHowToModal = function showHowToModal(event) {
    event.preventDefault();
    setIsShowHowToModal(true);
  };

  var hideHowToModal = function hideHowToModal() {
    return setIsShowHowToModal(false);
  };

  var deleteItem = function deleteItem() {
    deleteStack(deletingStack);
    hideDeleteConfirmation();
  };

  var showDeleteConfirmation = function showDeleteConfirmation(name) {
    return setDeletingStack(name);
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
  }, /*#__PURE__*/React__default.createElement(Yield, {
    name: "header-yield"
  }, /*#__PURE__*/React__default.createElement(SearchField, {
    showEverything: true,
    isDark: true,
    className: css$s.search,
    placeholder: t('findStack'),
    size: "small",
    value: search,
    onChange: onChangeSearch
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$s.title
  }, currentUser === user ? t('stacks') : t('stacksOf', {
    name: user
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$s.side
  }, renderSideTitle && renderSideTitle())), loading && !Boolean(data.length) && /*#__PURE__*/React__default.createElement(Loader, null), !loading && !data.length && /*#__PURE__*/React__default.createElement("div", {
    className: css$s.message
  }, user === currentUser ? t('youHaveNoStacksYet') : t('theUserHasNoStacksYetByName', {
    name: user
  })), !loading && !Boolean(data.length) && currentUser === user && /*#__PURE__*/React__default.createElement(HowTo, {
    user: currentUser,
    token: currentUserToken
  }), Boolean(data.length && items.length) && currentUser === user && /*#__PURE__*/React__default.createElement("div", {
    className: css$s.text
  }, t('youHaveStacks', {
    count: data.length
  }), ' ', /*#__PURE__*/React__default.createElement("a", {
    href: "#",
    onClick: showHowToModal
  }, t('seeHowToGuide')), "."), Boolean(data.length) && /*#__PURE__*/React__default.createElement(SearchField, {
    placeholder: t('search'),
    className: css$s.mobileSearch,
    showEverything: true,
    size: "small",
    value: search,
    onChange: onChangeSearch
  }), Boolean(data.length && items.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$s.grid
  }, items.map(function (item, index) {
    return /*#__PURE__*/React__default.createElement(Item, {
      Component: Link,
      key: index,
      data: item,
      otherOwner: user !== item.user,
      to: "/" + item.user + "/" + item.name,
      deleteAction: currentUser === item.user && showDeleteConfirmation,
      renderItemContent: renderItemContent
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
  }, t('getStarted')))), /*#__PURE__*/React__default.createElement(Modal, {
    isShow: isShowHowToModal,
    withCloseButton: true,
    onClose: hideHowToModal,
    size: "big",
    title: t('howToConnectYourDataWithDStack'),
    className: css$s.modal
  }, /*#__PURE__*/React__default.createElement(HowTo, {
    user: currentUser,
    token: currentUserToken,
    modalMode: true
  })));
};

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

  return "import pandas as pd\nfrom dstack import pull\n\ndf = pull(" + a.join(', ') + ")";
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

var HowTo$1 = function HowTo(_ref) {
  var modalMode = _ref.modalMode,
      user = _ref.user,
      token = _ref.token,
      data = _ref.data;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var _useState = useState(1),
      activeCodeTab = _useState[0],
      setActiveCodeTab = _useState[1];

  var _useState2 = useState(1),
      activePlatformTab = _useState2[0],
      setActivePlatformTab = _useState2[1];

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$r.howto
  }, !modalMode && /*#__PURE__*/React__default.createElement("div", {
    className: css$r.title
  }, t('howToFetchDataUsingTheAPI')), /*#__PURE__*/React__default.createElement(Tabs, {
    className: css$r.tabs,
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
    className: css$r.description
  }, t('installPipOrCondaPackage')), /*#__PURE__*/React__default.createElement(Tabs, {
    className: css$r.tabs,
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
    className: css$r.code,
    language: "bash"
  }, "pip install dstack"), activePlatformTab === 2 && /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "bash"
  }, "conda install dstack -c dstack.ai"), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('configureDStack')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "bash"
  }, config.CONFIGURE_PYTHON_COMMAND(token, user)), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('pullDatasetIntro')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "python"
  }, pullPythonCode(data))), activeCodeTab === 2 && /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('installRPackage')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "r"
  }, "install.packages(\"dstack\")"), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('configureDStack')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "r"
  }, config.CONFIGURE_R_COMMAND(token, user)), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.description
  }, t('pullDatasetIntro')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$r.code,
    language: "r"
  }, pullRCode(data))), /*#__PURE__*/React__default.createElement("div", {
    className: css$r.footer,
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

var css$t = {"frames":"_3D3R4","frames-dropdown":"_3hapH","button":"_Tn4o_","name":"_YzOn7","label":"_Hg7hs","dropdown":"_16pcp","item":"_1q46l","mark":"_1h8Eq","info":"_2BnTD","modal":"_pk61B","description":"_2GOOp","buttons":"_3Ml-A"};

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
    className: cx(css$t.frames, className),
    ref: dropdownRef
  }, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$t['frames-dropdown']),
    ref: dropdownRef
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$t.button,
    onClick: toggleDropdown
  }, /*#__PURE__*/React__default.createElement("span", {
    className: css$t.name
  }, getFrameName(activeFrame)), headId === activeFrame.id && /*#__PURE__*/React__default.createElement("span", {
    className: css$t.label
  }, t('head')), /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-chevron-down"
  })), /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$t.dropdown, {
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
      className: css$t.item
    }, /*#__PURE__*/React__default.createElement("span", {
      className: css$t.name
    }, getFrameName(f)), headId === f.id && /*#__PURE__*/React__default.createElement("span", {
      className: css$t.label
    }, t('head')), headId !== f.id && /*#__PURE__*/React__default.createElement("div", {
      className: css$t.mark,
      onClick: onClickMarkAsHead(f)
    }, t('markAsHead'))));
  }))), activeFrame && activeFrame.description && /*#__PURE__*/React__default.createElement(Tooltip, {
    overlayContent: activeFrame.description
  }, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$t.info)
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-information-variant"
  }))), /*#__PURE__*/React__default.createElement(Modal, {
    isShow: Boolean(frameForMarkingAsHead),
    onClose: hideConfirmation,
    size: "confirmation",
    title: t('changeHeadRevision'),
    className: css$t.modal
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$t.description
  }, t('areYouSureYouWantToChangeTheCurrentHeadRevisionToByName', {
    frame: frameForMarkingAsHead && getFrameName(frameForMarkingAsHead)
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$t.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    variant: "contained",
    color: "primary",
    onClick: confirmMarkFrameAsHead,
    className: css$t.button
  }, t('yesChangeHead')), /*#__PURE__*/React__default.createElement(Button, {
    color: "secondary",
    variant: "contained",
    onClick: hideConfirmation,
    className: css$t.button
  }, t('cancel')))));
};

var css$u = {"loader":"_2wNmt","title":"_1Ms-2","stacks-pulse":"_FjfKI","label":"_1rFaq","description":"_1Rg_O","diagram":"_2Aj7C"};

var Loader$1 = function Loader(_ref) {
  _objectDestructuringEmpty(_ref);

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$u.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$u.title
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$u.label
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$u.description
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$u.diagram
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

var css$v = {"details":"_3iAZb","section":"__r9FQ","header":"_2kekg","title":"_1zGvd","sideHeader":"_1FUDu","dropdown":"_3axDI","attachment-head":"_282UU","description":"_Y6gJz","label":"_2FemD","label-tooltip":"_2Oe5S","actions":"_sZkKa","size":"_Ja107","revisions":"_bLqAO","filters":"_1-hdZ","attachment":"_3IGZo","sidebar":"_U0_wY","modal":"_2TdJX","buttons":"_RhHmq","button":"_26mqa"};

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
      currentUserToken = _ref.currentUserToken,
      toggleUpload = _ref.toggleUpload,
      backUrl = _ref.backUrl,
      user = _ref.user,
      stack = _ref.stack,
      renderHeader = _ref.renderHeader,
      renderSideHeader = _ref.renderSideHeader;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  var didMountRef = useRef(false);

  var _useForm = useForm({}),
      form = _useForm.form,
      setForm = _useForm.setForm,
      onChange = _useForm.onChange;

  var _useState = useState({}),
      fields = _useState[0],
      setFields = _useState[1];

  var prevFrame = usePrevious(frame);

  var _useState2 = useState(false),
      isShowHowToModal = _useState2[0],
      setIsShowHowToModal = _useState2[1];

  var showHowToModal = function showHowToModal(event) {
    event.preventDefault();
    setIsShowHowToModal(true);
  };

  var hideHowToModal = function hideHowToModal() {
    return setIsShowHowToModal(false);
  };

  useEffect(function () {
    if ((!isEqual(prevFrame, frame) || !didMountRef.current) && frame) parseParams();
  }, [frame]);

  var findAttach = function findAttach(form, attachmentIndex) {
    var attachments = get(frame, 'attachments');
    var fields = Object.keys(form);
    if (!attachments) return;

    if (fields.length) {
      attachments.some(function (attach, index) {
        var valid = true;
        fields.forEach(function (key) {
          if (!attach.params || !isEqual(attach.params[key], form[key])) valid = false;
        });
        if (valid && !(attachmentIndex === undefined && index === 0)) onChangeAttachmentIndex(index);
        return valid;
      });
    }
  };

  var findAttachDebounce = useCallback(debounce(findAttach, 300), [data, frame]);
  useEffect(function () {
    if (didMountRef.current) findAttachDebounce(form, attachmentIndex);else didMountRef.current = true;
  }, [form]);

  var parseParams = function parseParams() {
    var attachments = get(frame, 'attachments');
    if (!attachments || !attachments.length) return;
    var fields = parseStackParams(attachments);
    setFields(fields);

    if (attachmentIndex !== undefined) {
      if (attachments[attachmentIndex]) setForm(attachments[attachmentIndex].params);
    } else setForm(attachments[0].params);
  };

  var renderFields = function renderFields() {
    if (!Object.keys(fields).length) return null;
    var hasSelectField = Object.keys(fields).some(function (key) {
      return fields[key].type === 'select';
    });
    return /*#__PURE__*/React__default.createElement(StackFilters, {
      fields: fields,
      form: form,
      onChange: onChange,
      className: cx(css$v.filters, {
        'with-select': hasSelectField
      })
    });
  };

  var onClickDownloadAttachment = function onClickDownloadAttachment(event) {
    event.preventDefault();
    downloadAttachment();
  };

  var attachment = get(frame, "attachments[" + attachmentIndex + "]");
  if (loading) return /*#__PURE__*/React__default.createElement(Loader$1, null);
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$v.details
  }, /*#__PURE__*/React__default.createElement(Yield, {
    name: "header-yield"
  }, /*#__PURE__*/React__default.createElement(BackButton, {
    Component: Link,
    to: backUrl
  }, currentUser === user ? t('backToMyStacks') : t('backToStacksOF', {
    name: user
  }))), /*#__PURE__*/React__default.createElement("section", {
    className: css$v.section
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$v.header
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$v.title
  }, data.name, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-lock" + (data["private"] ? '' : '-open')
  })), renderHeader && renderHeader(), /*#__PURE__*/React__default.createElement("div", {
    className: css$v.sideHeader
  }, renderSideHeader && renderSideHeader(), data && data.user === currentUser && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$v.dropdown,
    items: [{
      title: t('upload'),
      onClick: toggleUpload
    }]
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$v['dropdown-button'],
    color: "secondary"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-dots-horizontal"
  }))))), /*#__PURE__*/React__default.createElement(Frames, {
    frames: get(data, 'frames', []),
    frame: currentFrameId,
    headId: headId,
    onMarkAsHead: onChangeHeadFrame,
    onChange: onChangeFrame,
    className: css$v.revisions
  }), renderFields(), attachment && /*#__PURE__*/React__default.createElement("div", {
    className: css$v['attachment-head']
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$v.description
  }, attachment.description && /*#__PURE__*/React__default.createElement(MarkdownRender, {
    source: attachment.description
  })), attachment['content_type'] === 'text/csv' && /*#__PURE__*/React__default.createElement("div", {
    className: css$v.actions
  }, attachment.preview && /*#__PURE__*/React__default.createElement("div", {
    className: css$v.label
  }, t('preview'), /*#__PURE__*/React__default.createElement("div", {
    className: css$v['label-tooltip']
  }, t('theTableBelowShowsOnlyAPreview'))), /*#__PURE__*/React__default.createElement("a", {
    href: "#",
    onClick: showHowToModal
  }, t('useThisStackViaAPI')), /*#__PURE__*/React__default.createElement("span", null, t('or')), /*#__PURE__*/React__default.createElement("a", {
    href: "#",
    onClick: onClickDownloadAttachment
  }, t('download')), attachment.length && /*#__PURE__*/React__default.createElement("span", {
    className: css$v.size
  }, "(", formatBytes(attachment.length), ")"))), frame && /*#__PURE__*/React__default.createElement(Attachment, {
    className: css$v.attachment,
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
    className: css$v.modal
  }, /*#__PURE__*/React__default.createElement(HowTo$1, {
    user: currentUser,
    token: currentUserToken,
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

var css$w = {"upload":"_1HGtr","content":"_zyXjr","subtitle":"_2QLXi","field":"_2kyid","dragndrop":"_1_81H","buttons":"_1PXB0","button":"_1nx-b"};

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
          var token = localStorage.getItem('token');
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
    className: cx(css$w.upload, className),
    size: "small",
    color: "secondary",
    onClick: toggleModal
  }, t('upload'))), /*#__PURE__*/React__default.createElement(Modal, {
    title: t('uploadFile'),
    isShow: isShowModal,
    size: "small"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$w.content
  }, !stack && /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: css$w.subtitle
  }, t('theUploadedFileWouldBeSavedAsANewStack')), /*#__PURE__*/React__default.createElement(TextField, {
    size: "middle",
    className: css$w.field,
    name: "stack",
    onChange: onChange,
    value: form.value,
    maxLength: 30,
    placeholder: t('stackName') + ", " + t('noSpaces') + ", " + t('maxSymbol', {
      count: 30
    }),
    errors: getErrorsText('stack')
  })), stack && file && /*#__PURE__*/React__default.createElement("div", {
    className: css$w.subtitle
  }, t('theUploadedFileWouldBeSavedAsANewRevisionOfTheStack')), /*#__PURE__*/React__default.createElement(FileDragnDrop, {
    className: css$w.dragndrop,
    formats: ['.csv', '.png', '.svg', '.jpg'],
    onChange: setFile,
    loading: uploading,
    progressPercent: progress
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$w.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$w.button,
    variant: "contained",
    color: "primary",
    disabled: !file || !form.stack.length || uploading,
    onClick: submit
  }, t('save')), /*#__PURE__*/React__default.createElement(Button, {
    onClick: closeHandle,
    className: css$w.button,
    variant: "contained",
    color: "secondary",
    disabled: uploading
  }, t('cancel')))));
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

var css$x = {"loader":"_2RpBO","text":"_3gk1Z","dashboards-details-pulse":"_3HZ82","filters":"_3ZZJL","grid":"_ZafPr","item":"_LIYeR"};

var Loader$2 = function Loader(_ref) {
  _objectDestructuringEmpty(_ref);

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$x.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$x.text
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$x.filters
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$x.grid
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$x.item
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$x.item
  })));
};

var css$y = {"card":"_17jo7","inner":"_YLuSm","head":"_2dKop","name":"_1blF_","nameEdit":"_3omHN","nameValue":"_wx2sM","info":"_1Tbhc","dropdown":"_1NvWp","button":"_d6fLT","move":"_312qk","link":"_NfDp4","infoTime":"_2QMrW","emptyMessage":"_7aBhX","attachment":"_2ajkc"};

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
    className: cx(css$y.card, "type-" + type, className),
    ref: forwardedRef
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$y.inner
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$y.head
  }, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$y.name, {
      readonly: !updateCardTitle
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$y.nameValue
  }, title.length ? title : t('title')), /*#__PURE__*/React__default.createElement("input", {
    value: title,
    type: "text",
    placeholder: t('title'),
    onChange: onChangeTitle,
    className: cx(css$y.nameEdit, {
      active: !title.length
    })
  })), /*#__PURE__*/React__default.createElement(Tooltip, {
    overlayContent: /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement("div", null, t('updatedByName', {
      name: stackOwner
    })), data.head && /*#__PURE__*/React__default.createElement("div", {
      className: css$y.infoTime
    }, moment(data.head.timestamp).format('D MMM YYYY')))
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$y.info
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-information-outline"
  }))), /*#__PURE__*/React__default.createElement(Button, {
    className: cx(css$y.button, css$y.link),
    color: "secondary",
    Component: Link,
    to: "/" + data.stack
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-open-in-new"
  })), Boolean(deleteCard) && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$y.dropdown,
    items: [].concat(deleteCard ? [{
      title: t('delete'),
      onClick: deleteCard
    }] : [])
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$y.button,
    color: "secondary"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-dots-horizontal"
  }))), moveAvailable && /*#__PURE__*/React__default.createElement(Button, {
    className: cx(css$y.button, css$y.move),
    color: "secondary"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-cursor-move"
  }))), headId ? /*#__PURE__*/React__default.createElement(Attachment, {
    className: css$y.attachment,
    isList: true,
    withLoader: true,
    stack: data.stack,
    frameId: headId,
    id: attachmentIndex
  }) : /*#__PURE__*/React__default.createElement("div", {
    className: css$y.emptyMessage
  }, t('emptyDashboard'))));
});

var css$z = {"details":"_2U9YD","header":"_2Lioj","title":"_353_b","edit":"_14H-Y","permissions":"_1up3B","dropdown":"_1OYBD","section":"_3ZM3A","cards":"_2idlU","fields":"_3zxn3","filters":"_QjWiF","controls":"_9DqNJ","addButton":"_ezy69","viewSwitcher":"_2LheQ","empty":"_j9SPi"};

var Details$1 = function Details(_ref) {
  var addCards = _ref.addCards,
      backUrl = _ref.backUrl,
      cards = _ref.cards,
      currentUser = _ref.currentUser,
      data = _ref.data,
      deleteCard = _ref.deleteCard,
      deleteDashboard = _ref.deleteDashboard,
      loading = _ref.loading,
      onChangeTitle = _ref.onChangeTitle,
      updateCard = _ref.updateCard,
      user = _ref.user,
      withSorting = _ref.withSorting;

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
    updateCard({
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
      className: cx(css$z.filters, {
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
    className: css$z.details
  }, /*#__PURE__*/React__default.createElement(Yield, {
    name: "header-yield"
  }, /*#__PURE__*/React__default.createElement(BackButton, {
    Component: Link,
    to: backUrl
  }, currentUser === user ? t('backToDashboards') : t('backToDashboardsOf', {
    name: user
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: css$z.header
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$z.title
  }, /*#__PURE__*/React__default.createElement(StretchTitleField, {
    className: css$z.edit,
    value: data === null || data === void 0 ? void 0 : data.title,
    onChange: onChangeTitleDebounce,
    readOnly: currentUser !== data.user,
    placeholder: t('newDashboard')
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-lock" + (data["private"] ? '' : '-open')
  })), Boolean(deleteDashboard) && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$z.dropdown,
    items: [].concat(Boolean(deleteDashboard) ? [{
      title: t('delete'),
      onClick: deleteDashboard
    }] : [])
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$z['dropdown-button'],
    color: "secondary"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-dots-horizontal"
  })))), Boolean(items.length) && /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: css$z.section
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$z.fields
  }, renderFilters()), /*#__PURE__*/React__default.createElement("div", {
    className: css$z.controls
  }, getAddClickAction() && /*#__PURE__*/React__default.createElement("a", {
    className: css$z.addButton,
    onClick: getAddClickAction(),
    href: "#"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-plus"
  }), t('addStack')), /*#__PURE__*/React__default.createElement(ViewSwitcher, {
    value: view,
    className: css$z.viewSwitcher,
    onChange: function onChange(view) {
      return setView(view);
    }
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$z.cards, view)
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
    className: css$z.empty
  }, t('thereAreNoStacksYet'), " ", /*#__PURE__*/React__default.createElement("br", null), t('youCanSendStacksYouWantToBeHereLaterOrAddItRightNow'), getAddClickAction() && /*#__PURE__*/React__default.createElement(Fragment, null, ' ', /*#__PURE__*/React__default.createElement("a", {
    className: css$z.addButton,
    onClick: getAddClickAction(),
    href: "#"
  }, t('addStack')), ".")));
};

var css$A = {"item":"_3urCL","preview":"_cxR4e","label":"_tCzQe","previewWrap":"_15fuU","emptyMessage":"_2pDKf","attachment":"_35KB8","section":"_LeHWu","content":"_Bgbe4","name":"_2PrtI","by":"_1_qsJ","permissions":"_3ZdE1","dropdown":"_vK4SD","preview-stack-pulse":"_3NFJT"};

var Item$1 = function Item(_ref) {
  var dashboard = _ref.dashboard,
      deleteDashboard = _ref.deleteDashboard,
      user = _ref.user;

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
    className: css$A.item,
    ref: ref
  }, Boolean(dashboard.cards.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$A.label
  }, t('stacksWithCount', {
    count: dashboard.cards.length
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$A.previewWrap
  }, hasStacks ? /*#__PURE__*/React__default.createElement(Attachment, {
    className: css$A.attachment,
    isList: true,
    withLoader: true,
    frameId: card.head.id,
    stack: card.stack,
    id: 0
  }) : /*#__PURE__*/React__default.createElement("div", {
    className: css$A.emptyMessage
  }, t('emptyDashboard'))), /*#__PURE__*/React__default.createElement("div", {
    className: css$A.section
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$A.content
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$A.name
  }, dashboard.title, ' ', /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-lock" + (dashboard["private"] ? '' : '-open')
  })), user !== dashboard.user && /*#__PURE__*/React__default.createElement("div", {
    className: css$A.by
  }, t('by'), " ", dashboard.user)), isShowDropdown && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$A.dropdown,
    items: [{
      title: t('delete'),
      onClick: onClickDelete
    }]
  })));
};

var css$B = {"loader":"_PK0JP","text":"_1F-rx","dashboards-pulse":"_29IbF","grid":"_ef-jq","item":"_1HBd8","pic":"_1z0LR","section":"_14O5G"};

var Loader$3 = function Loader(_ref) {
  _objectDestructuringEmpty(_ref);

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$B.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$B.text
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$B.grid
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$B.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$B.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$B.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$B.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$B.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$B.section
  }))));
};

var css$C = {"list":"_2tGd9","title":"_lNufF","search":"_3Vnt-","mobileSearch":"_28J_R","text":"_2QiEZ","grid":"_31LQw","add":"_1VMC5","caption":"_pTzl3"};

var List$1 = function List(_ref) {
  var addDashboard = _ref.addDashboard,
      addDashboardDisable = _ref.addDashboardDisable,
      currentUser = _ref.currentUser,
      data = _ref.data,
      deleteDashboard = _ref.deleteDashboard,
      loading = _ref.loading,
      user = _ref.user;

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
    className: css$C.list
  }, /*#__PURE__*/React__default.createElement(Yield, {
    name: "header-yield"
  }, /*#__PURE__*/React__default.createElement(SearchField, {
    showEverything: true,
    isDark: true,
    className: css$C.search,
    placeholder: t('findDashboard'),
    size: "small",
    value: search,
    onChange: onChangeSearch
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$C.title
  }, currentUser === user ? t('myDashboards') : t('dashboardsOf', {
    name: user
  }), data && Boolean(data.length) && /*#__PURE__*/React__default.createElement("span", null, data.length)), data && Boolean(data.length) && /*#__PURE__*/React__default.createElement(SearchField, {
    placeholder: t('search'),
    className: css$C.mobileSearch,
    showEverything: true,
    size: "small",
    value: search,
    onChange: onChangeSearch
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$C.grid
  }, currentUser === user && /*#__PURE__*/React__default.createElement("div", {
    onClick: addDashboard,
    className: cx(css$C.add, {
      disabled: addDashboardDisable
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$C.caption
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-plus"
  }), t('newDashboard'))), items.map(function (item, index) {
    return /*#__PURE__*/React__default.createElement(Item$1, {
      key: index,
      user: user,
      dashboard: item,
      deleteDashboard: currentUser === item.user && deleteDashboard
    });
  })));
};

var css$D = {"loader":"_FMgKh","text":"_3kMB4","stacks-pulse":"_2uZ4b","grid":"_1i-Vy","item":"_3Q6le","pic":"_2gd5L","section":"_BzTYi"};

var Loader$4 = function Loader(_ref) {
  _objectDestructuringEmpty(_ref);

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$D.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$D.text
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$D.grid
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$D.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$D.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$D.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$D.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$D.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$D.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$D.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$D.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$D.section
  }))));
};

var css$E = {"stacks":"_1YlOe","grid":"_2Xblj","search":"_2JDJR","message":"_30aty","text":"_1qJHA","item":"_1AIvq","checkbox":"_I8MzQ","buttons":"_3uEfC","button":"_22J0P"};

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
    dialogClassName: css$E.stacks,
    isShow: isShow,
    title: t('selectStacks'),
    onClose: onClose,
    withCloseButton: true
  }, !loading && Boolean(stacks.length) && /*#__PURE__*/React__default.createElement(SearchField, {
    className: css$E.search,
    isDark: true,
    size: "middle",
    showEverything: true,
    placeholder: t('findStack'),
    value: searchQuery,
    onChange: onChangeSearch
  }), loading && /*#__PURE__*/React__default.createElement(Loader$4, null), !loading && !stacks.length && /*#__PURE__*/React__default.createElement("div", {
    className: css$E.message
  }, user === currentUser ? t('youHaveNoStacksYet') : t('theUserHasNoStacksYetByName', {
    name: params.user
  })), !loading && Boolean(stacks.length && !items.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$E.text
  }, t('noStacksAreFoundedMatchedTheSearchCriteria')), !loading && Boolean(stacks.length && items.length) && /*#__PURE__*/React__default.createElement(Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: css$E.grid
  }, items.map(function (item, index) {
    return /*#__PURE__*/React__default.createElement("div", {
      className: css$E.item,
      key: index,
      onClick: getOnClickStack(item)
    }, /*#__PURE__*/React__default.createElement(CheckboxField, {
      className: css$E.checkbox,
      value: isChecked(item),
      readOnly: true
    }), /*#__PURE__*/React__default.createElement(Item, {
      data: item,
      otherOwner: params.user !== item.user
    }));
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$E.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$E.button,
    color: "primary",
    variant: "contained",
    disabled: !selected.length,
    onClick: submit
  }, t('addSelectedStacks')), /*#__PURE__*/React__default.createElement(Button, {
    className: css$E.button,
    color: "secondary",
    variant: "contained",
    onClick: onClose
  }, t('cancel')))));
};

var logo = require("./logo~gyFSAwBb.svg");

var css$F = {"header":"_3C4T1","logo":"_1jfuS","buttons":"_2EQYi","button":"_3cb7N"};

var Header = function Header(_ref) {
  var className = _ref.className;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t;

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$F.header, className)
  }, /*#__PURE__*/React__default.createElement(Link, {
    to: "/",
    className: css$F.logo
  }, /*#__PURE__*/React__default.createElement("img", {
    width: "129",
    height: "35",
    src: logo,
    alt: "logo"
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$F.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    Component: Link,
    to: "/auth/login",
    className: css$F.button,
    color: "primary"
  }, t('logIn'))));
};

var css$G = {"layout":"_23bi3","header":"_1chFa","main":"_70hee"};

var UnAuthorizedLayout = function UnAuthorizedLayout(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$G.layout
  }, /*#__PURE__*/React__default.createElement(Header, {
    className: css$G.header
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$G.main
  }, children));
};

export { AccessForbidden, Avatar, BackButton, Button, CheckboxField, CodeViewer, Copy, AddStacksModal as DashboardAddStacksModal, Details$1 as DashboardDetails, List$1 as DashboardList, Item$1 as DashboardListItem, GridContext as DnDGridContext, GridProvider as DnDGridContextProvider, DnDItem, Dropdown, FileDragnDrop, Loader, MarkdownRender, Modal, NotFound, ProgressBar, SearchField, SelectField, SliderField, Spinner, Attachment as StackAttachment, StateProvider as StackAttachmentProvider, Details as StackDetails, StackFilters, Frames as StackFrames, HowTo as StackHowTo, HowTo$1 as StackHowToFetchData, List as StackList, Item as StackListItem, Upload as StackUpload, StretchTitleField, Tabs, TextAreaField, TextField, Tooltip, UnAuthorizedLayout, ViewSwitcher, Yield, config };
//# sourceMappingURL=index.modern.js.map

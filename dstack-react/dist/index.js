function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var cx = _interopDefault(require('classnames'));
var Highlight = _interopDefault(require('react-highlight.js'));
var reactI18next = require('react-i18next');
var copy = _interopDefault(require('copy-to-clipboard'));
var RcTooltip = _interopDefault(require('rc-tooltip'));
var lodashEs = require('lodash-es');
var moment = _interopDefault(require('moment'));
var ReactMarkdown = _interopDefault(require('react-markdown'));
var MathJax = _interopDefault(require('react-mathjax'));
var RemarkMathPlugin = _interopDefault(require('remark-math'));
var reactPortal = require('react-portal');
var Select = require('rc-select');
var Select__default = _interopDefault(Select);
var Slider = _interopDefault(require('rc-slider'));
var axios = _interopDefault(require('axios'));
var Plot = _interopDefault(require('react-plotly.js'));
var CSV = require('csv-string');
var reactRouterDom = require('react-router-dom');
var uuid = require('uuid');
var reactDnd = require('react-dnd');
var reactRouter = require('react-router');

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
  DISCORD_URL: 'https://discord.gg/8xfhEYa',
  TWITTER_URL: 'https://twitter.com/dstackai',
  GITHUB_URL: 'https://github.com/dstackai',
  BLOG_URL: 'https://blog.dstack.ai'
};
var reportPlotPythonCode = "import matplotlib.pyplot as plt\nimport dstack as ds\n\nfig = plt.figure()\nplt.plot([1, 2, 3, 4], [1, 4, 9, 16])\n\nds.push_frame(\"simple\", fig, \"My first plot\")";
var installRPackageCode = 'install.packages("dstack")';
var reportPlotRCode = "library(ggplot2)\nlibrary(dstack)\n\ndf <- data.frame(x = c(1, 2, 3, 4), y = c(1, 4, 9, 16))\nimage <- ggplot(data = df, aes(x = x, y = y)) + geom_line()\n\npush_frame(\"simple\", image, \"My first plot\")";

var image = require("./lock~ZBorChcU.svg");

var css = {"forbidden":"_style-module__forbidden__3PN84","message":"_style-module__message__2i8KH"};

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

var css$1 = {"avatar":"_styles-module__avatar__3xvkT"};

var Avatar = React.forwardRef(function (_ref, ref) {
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

var css$2 = {"back":"_styles-module__back__1MuhU"};

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

var css$3 = {"button":"_style-module__button__2lKoS","spinner":"_style-module__spinner__31PPt"};

var css$4 = {"spinner":"_styles-module__spinner__3XhrC","spinner-animation":"_styles-module__spinner-animation__2UA3s"};

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

var Button = React.forwardRef(function (_ref, ref) {
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

var css$5 = {"checkbox":"_styles-module__checkbox__3lqFk","toggle-label":"_styles-module__toggle-label__1aLAG","label":"_styles-module__label__2PZb-","wrapper":"_styles-module__wrapper__2Vufp","mark":"_styles-module__mark__2Pb2f"};

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

var css$6 = {"copy":"_styles-module__copy__3J5hd","message":"_styles-module__message__3RWnQ","button":"_styles-module__button__2YqEb","icon":"_styles-module__icon__25GMO"};

var Copy = function Copy(_ref) {
  var children = _ref.children,
      className = _ref.className,
      copyText = _ref.copyText,
      successMessage = _ref.successMessage,
      buttonTitle = _ref.buttonTitle;

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var _useState = React.useState(false),
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

var css$7 = {"code":"_styles-module__code__3gARj","copy":"_styles-module__copy__m44gX","icon":"_styles-module__icon__ZmZbg"};

var CodeViewer = function CodeViewer(_ref) {
  var className = _ref.className,
      language = _ref.language,
      children = _ref.children,
      fontSize = _ref.fontSize;

  var _useTranslation = reactI18next.useTranslation(),
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

var css$8 = {"dropdown":"_styles-module__dropdown__1qRCw","button":"_styles-module__button__fzNEm","menu":"_styles-module__menu__AJ1Y3","item":"_styles-module__item__3lbfY"};

var Dropdown = function Dropdown(_ref) {
  var className = _ref.className,
      buttonClassName = _ref.buttonClassName,
      children = _ref.children,
      items = _ref.items;

  var _useState = React.useState(false),
      isShow = _useState[0],
      setIsShow = _useState[1];

  var buttonRef = React.useRef(null);
  var dropdownRef = React.useRef(null);
  React.useEffect(function () {
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

var css$9 = {"dnd":"_style-module__dnd__3uYii","fileWrapper":"_style-module__fileWrapper__1GUx_","file":"_style-module__file__2LG6L","fileExtend":"_style-module__fileExtend__3w6--","fileSection":"_style-module__fileSection__B8y5t","fileName":"_style-module__fileName__3Juxo","fileSize":"_style-module__fileSize__3G6N8","fileRemove":"_style-module__fileRemove__16dzP","placeholder":"_style-module__placeholder__Wr_Zp","button":"_style-module__button__14ku1","loading":"_style-module__loading__2KndP","progressBar":"_style-module__progressBar__DHbC1","progress":"_style-module__progress__2-dth","animate-stripes":"_style-module__animate-stripes__1Iecq"};

var FileDragnDrop = function FileDragnDrop(_ref, ref) {
  var formats = _ref.formats,
      className = _ref.className,
      loading = _ref.loading,
      _ref$progressPercent = _ref.progressPercent,
      progressPercent = _ref$progressPercent === void 0 ? null : _ref$progressPercent,
      onChange = _ref.onChange;

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var inputRef = React.useRef(null);

  var _useState = React.useState(false),
      active = _useState[0],
      setActive = _useState[1];

  var _useState2 = React.useState(),
      selectedFile = _useState2[0],
      setSelectedFile = _useState2[1];

  var isDidMount = React.useRef(true);
  React.useImperativeHandle(ref, function () {
    return {
      clear: function clear() {
        return removeFile();
      }
    };
  });
  React.useEffect(function () {
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

var FileDragnDrop$1 = React.forwardRef(FileDragnDrop);

var css$a = {"loader":"_styles-module__loader__18_Ho","text":"_styles-module__text__3dZu_","stacks-pulse":"_styles-module__stacks-pulse__350eA","grid":"_styles-module__grid__Uki0v","item":"_styles-module__item__MvjKB","pic":"_styles-module__pic__Pc6fT","section":"_styles-module__section__2EIKh"};

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

var css$b = {"modal":"_styles-module__modal__3FQ59","dialog":"_styles-module__dialog__268e0","close":"_styles-module__close__1Y7yz","title":"_styles-module__title__knxNI"};

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

  return /*#__PURE__*/React__default.createElement(reactPortal.Portal, null, /*#__PURE__*/React__default.createElement("div", {
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

var css$c = {"not-found":"_style-module__not-found__tAZyq","message":"_style-module__message__3Ok1U","help":"_style-module__help__Aa8x8"};

var NotFound = function NotFound(_ref) {
  var children = _ref.children;

  var _useTranslation = reactI18next.useTranslation(),
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
  var ref = React.useRef(value);
  React.useEffect(function () {
    ref.current = value;
  }, [value]);
  return ref.current;
});

var css$d = {"bar":"_styles-module__bar__12oWc","progress":"_styles-module__progress__3JWjz"};

var ProgressBar = function ProgressBar(_ref) {
  var className = _ref.className,
      isActive = _ref.isActive,
      globalProgress = _ref.progress;

  var _useState = React.useState(0),
      progress = _useState[0],
      setProgress = _useState[1];

  var _useState2 = React.useState(1000),
      width = _useState2[0],
      setWidth = _useState2[1];

  var prevIsActive = usePrevious(isActive);
  var step = React.useRef(0.01);
  var currentProgress = React.useRef(0);
  var requestFrame = React.useRef(null);
  var ref = React.useRef(null);
  React.useEffect(function () {
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
  React.useEffect(function () {
    if (globalProgress !== null) setProgress(globalProgress);else {
      setProgress(0);
    }
  }, [globalProgress]);
  React.useEffect(function () {
    window.addEventListener('resize', onResize);
    if (ref.current) setWidth(ref.current.offsetWidth);
    return function () {
      return window.removeEventListener('resize', onResize);
    };
  }, []);

  var startCalculateProgress = function startCalculateProgress() {
    requestAnimationFrame(calculateProgress);
  };

  var calculateProgress = function calculateProgress() {
    currentProgress.current += step.current;
    var progress = Math.round(Math.atan(currentProgress.current) / (Math.PI / 2) * 100 * 1000) / 1000;
    setProgress(progress);
    if (progress > 70) step.current = 0.005;
    if (progress >= 100 || !isActive) cancelAnimationFrame(requestFrame.current);
    if (isActive) requestFrame.current = requestAnimationFrame(calculateProgress);
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

var css$e = {"field":"_styles-module__field__3WCaE","input":"_styles-module__input__9Tk5W","label":"_styles-module__label__1mHtq","error":"_styles-module__error__3jOrk"};

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

var css$f = {"search":"_styles-module__search__3s1gr","field":"_styles-module__field__17rsB","clear":"_styles-module__clear__3oKZ5","button":"_styles-module__button__3BfRl"};

var SearchField = function SearchField(_ref) {
  var className = _ref.className,
      showEverything = _ref.showEverything,
      isDark = _ref.isDark,
      props = _objectWithoutPropertiesLoose(_ref, ["className", "showEverything", "isDark"]);

  var _useState = React.useState(showEverything || props.value && props.value.length),
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

var css$g = {"field":"_styles-module__field__2jF9E","label":"_styles-module__label__iehEi","rcSelectLoadingIcon":"_styles-module__rcSelectLoadingIcon__VtsrG","rcSelectDropdownSlideUpIn":"_styles-module__rcSelectDropdownSlideUpIn__27wr-","rcSelectDropdownSlideUpOut":"_styles-module__rcSelectDropdownSlideUpOut__1QVN6","rcSelectDropdownSlideDownIn":"_styles-module__rcSelectDropdownSlideDownIn__1vYLX","rcSelectDropdownSlideDownOut":"_styles-module__rcSelectDropdownSlideDownOut__1-lNh","select-field":"_styles-module__select-field__1mUh_","select-field-selector":"_styles-module__select-field-selector__V9Ufm","select-field-arrow":"_styles-module__select-field-arrow__c4k8s","mdi":"_styles-module__mdi__2hNDK","select-field-selection-placeholder":"_styles-module__select-field-selection-placeholder__2Vdv0","select-field-selection-search":"_styles-module__select-field-selection-search__3GdNa","select-field-selection-search-input":"_styles-module__select-field-selection-search-input__3BOaB","select-field-selection-item":"_styles-module__select-field-selection-item__2uDu7","select-field-item-option-checkbox":"_styles-module__select-field-item-option-checkbox__2K_G1","select-field-selection-item-remove":"_styles-module__select-field-selection-item-remove__1k1IW","select-field-show-search":"_styles-module__select-field-show-search__3EVnU","select-field-show-arrow":"_styles-module__select-field-show-arrow__1xlmm","select-field-open":"_styles-module__select-field-open___jEZ1","select-field-multiple":"_styles-module__select-field-multiple__2YFSs","select-field-single":"_styles-module__select-field-single__1n3qF","select-field-clear":"_styles-module__select-field-clear__Mg5xq","select-field-item-option-state":"_styles-module__select-field-item-option-state__2yGkG","select-field-selection__choice-zoom":"_styles-module__select-field-selection__choice-zoom__3NUb5","select-field-selection__choice-zoom-appear":"_styles-module__select-field-selection__choice-zoom-appear__ZO73y","select-field-selection__choice-zoom-leave":"_styles-module__select-field-selection__choice-zoom-leave__2i54q","select-field-dropdown":"_styles-module__select-field-dropdown__14ngc"};

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
      return /*#__PURE__*/React__default.createElement(Select.Option, {
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
  }, /*#__PURE__*/React__default.createElement(Select__default, _extends({
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
  }, props), options.length && mode === 'multiple' && /*#__PURE__*/React__default.createElement(Select.Option, {
    key: allValue,
    value: allValue
  }, /*#__PURE__*/React__default.createElement(CheckboxField, {
    readOnly: true,
    className: "select-field-item-option-checkbox",
    value: propValue.length === options.length
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "select-field-item-option-label"
  }, "Select all")), mode === 'multiple' ? /*#__PURE__*/React__default.createElement(Select.OptGroup, null, renderOptions()) : renderOptions()), label && /*#__PURE__*/React__default.createElement("label", {
    className: css$g.label
  }, label));
};

var css$h = {"field":"_styles-module__field__2_NXc","rcSliderTooltipZoomDownIn":"_styles-module__rcSliderTooltipZoomDownIn__2jvao","rcSliderTooltipZoomDownOut":"_styles-module__rcSliderTooltipZoomDownOut__2HgMB","slider":"_styles-module__slider__31Ylv","label":"_styles-module__label__Zo_r8","rc-slider":"_styles-module__rc-slider__1hLjI","rc-slider-rail":"_styles-module__rc-slider-rail__v9bxI","rc-slider-track":"_styles-module__rc-slider-track___3emJ","rc-slider-handle":"_styles-module__rc-slider-handle__12sQ3","rc-slider-handle-dragging":"_styles-module__rc-slider-handle-dragging__2u63-","rc-slider-handle-click-focused":"_styles-module__rc-slider-handle-click-focused__7xSSR","rc-slider-mark":"_styles-module__rc-slider-mark__1l2Qm","rc-slider-mark-text":"_styles-module__rc-slider-mark-text__2zf2c","rc-slider-mark-text-active":"_styles-module__rc-slider-mark-text-active__25tuh","rc-slider-step":"_styles-module__rc-slider-step__3wC_L","rc-slider-dot":"_styles-module__rc-slider-dot__17-SM","rc-slider-dot-active":"_styles-module__rc-slider-dot-active__1eLwY","rc-slider-dot-reverse":"_styles-module__rc-slider-dot-reverse__Ewb1d","rc-slider-disabled":"_styles-module__rc-slider-disabled__1YO43","rc-slider-vertical":"_styles-module__rc-slider-vertical__12Juq","rc-slider-tooltip-zoom-down-enter":"_styles-module__rc-slider-tooltip-zoom-down-enter__2a95b","rc-slider-tooltip-zoom-down-appear":"_styles-module__rc-slider-tooltip-zoom-down-appear__2wvsD","rc-slider-tooltip-zoom-down-leave":"_styles-module__rc-slider-tooltip-zoom-down-leave__3jMC3","rc-slider-tooltip-zoom-down-enter-active":"_styles-module__rc-slider-tooltip-zoom-down-enter-active__1M8Be","rc-slider-tooltip-zoom-down-appear-active":"_styles-module__rc-slider-tooltip-zoom-down-appear-active__3tu2z","rc-slider-tooltip-zoom-down-leave-active":"_styles-module__rc-slider-tooltip-zoom-down-leave-active__P9_lk","rc-slider-tooltip":"_styles-module__rc-slider-tooltip__1PZK2","rc-slider-tooltip-hidden":"_styles-module__rc-slider-tooltip-hidden__2CvyB","rc-slider-tooltip-placement-top":"_styles-module__rc-slider-tooltip-placement-top__qzmlA","rc-slider-tooltip-inner":"_styles-module__rc-slider-tooltip-inner__27Bp4","rc-slider-tooltip-arrow":"_styles-module__rc-slider-tooltip-arrow__35-HY"};

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

var css$i = {"filters":"_styles-module__filters__kiZkv","select":"_styles-module__select__4Up3c","field":"_styles-module__field__3_9Ku"};

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

var css$j = {"field":"_styles-module__field__2DYF1","hidden":"_styles-module__hidden__3z5o2"};

var StretchTitleField = function StretchTitleField(_ref) {
  var propValue = _ref.value,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? '' : _ref$placeholder,
      className = _ref.className,
      onChangeProp = _ref.onChange,
      props = _objectWithoutPropertiesLoose(_ref, ["value", "placeholder", "className", "onChange"]);

  var _useState = React.useState(propValue),
      value = _useState[0],
      set = _useState[1];

  var onChange = function onChange(event) {
    if (onChangeProp) onChangeProp(event.target.value);
    set(event.target.value);
  };

  React.useEffect(function () {
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

var css$k = {"tabs":"_styles-module__tabs__-hQvT","tab":"_styles-module__tab__2dsXN","soon":"_styles-module__soon__2_DJa"};

var Tabs = function Tabs(_ref) {
  var className = _ref.className,
      value = _ref.value,
      tabs = _ref.tabs,
      onChange = _ref.onChange;

  var _useTranslation = reactI18next.useTranslation(),
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

var css$l = {"field":"_styles-module__field__3PgPN","textarea":"_styles-module__textarea__2Ok_K","label":"_styles-module__label__1qnsP","error":"_styles-module__error__1C6bH"};

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

var css$m = {"tooltip":"_style-module__tooltip__rE8Jn"};

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

var css$n = {"switcher":"_styles-module__switcher__3NMzC"};

var ViewSwitcher = function ViewSwitcher(_ref) {
  var _ref$value = _ref.value,
      value = _ref$value === void 0 ? 'grid' : _ref$value,
      onChange = _ref.onChange,
      className = _ref.className;

  var _useState = React.useState(value),
      stateValue = _useState[0],
      setStateValue = _useState[1];

  React.useEffect(function () {
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
    return /*#__PURE__*/React__default.createElement(reactPortal.Portal, {
      node: node
    }, children);
  }

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

var css$o = {"table":"_styles-module__table__2TzH3"};

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

var css$p = {"view":"_styles-module__view__1T-AH","text":"_styles-module__text__6S5f-","message":"_styles-module__message__1p-0w"};

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

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var viewRef = React.useRef();

  var _useState = React.useState(1),
      tableScale = _useState[0],
      setTableScale = _useState[1];

  var _useState2 = React.useState(0),
      viewWidth = _useState2[0],
      setVieWidth = _useState2[1];

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

  React.useEffect(function () {
    if (window && isList) window.addEventListener('resize', onResizeCard);
    return function () {
      if (window && isList) window.removeEventListener('resize', onResizeCard);
    };
  }, []);
  React.useEffect(function () {
    if (attachment && attachment['application'] === 'bokeh' && Bokeh) {
      var json = base64ToJSON(attachment.data);
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
      var data = CSV.parse(decodeCSV);
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
      case lodashEs.isEqual(attachment, {}):
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
  return lodashEs.isEqual(prevProps.attachment, nextProps.attachment);
};

var View$1 = React.memo(View, areEqual);

var useIntersectionObserver = (function (callBack, _ref, deps) {
  var _ref$rootMargin = _ref.rootMargin,
      rootMargin = _ref$rootMargin === void 0 ? '0px' : _ref$rootMargin,
      _ref$threshold = _ref.threshold,
      threshold = _ref$threshold === void 0 ? 0.01 : _ref$threshold,
      _ref$root = _ref.root,
      root = _ref$root === void 0 ? null : _ref$root;
  var ref = React.useRef(null);
  var intersectionCallback = React.useCallback(function (_ref2) {
    var target = _ref2[0];

    if (target.isIntersecting) {
      callBack();
    }
  }, deps);
  React.useEffect(function () {
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
var StateContext = React.createContext();
var StateProvider = function StateProvider(_ref) {
  var children = _ref.children,
      apiUrl = _ref.apiUrl;
  return /*#__PURE__*/React__default.createElement(StateContext.Provider, {
    value: React.useReducer(reducer, _extends({}, initialState, {
      apiUrl: apiUrl
    }))
  }, children);
};
var useStateValue = function useStateValue() {
  return React.useContext(StateContext);
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
          error = JSON.parse(lodashEs.get(e, 'request.response')).message;
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

var css$q = {"attachment":"_styles-module__attachment__3NILI","loading-pulse":"_styles-module__loading-pulse__IhCO3","view":"_styles-module__view__3UWqG","text":"_styles-module__text__MOcaD"};

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

  var attachment = lodashEs.get(data, frameId + "." + id, {});
  var loading = attachment.loading,
      error = attachment.error,
      requestStatus = attachment.requestStatus;

  var _useState = React.useState(false),
      loadingFullAttachment = _useState[0],
      setLoadingFullAttachment = _useState[1];

  var _useState2 = React.useState(null),
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

  React.useEffect(function () {
    if (!isList && attachment && !lodashEs.isEqual(prevAttachment, attachment) && attachment.preview && isImageType(attachment['content_type'])) {
      fetchFullAttachment();
    }
  }, [data]);
  React.useEffect(function () {
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

var css$r = {"item":"_styles-module__item__fLtf5","name":"_styles-module__name__147V3","delete":"_styles-module__delete__2PoaL","icon":"_styles-module__icon__3yxhI","top":"_styles-module__top__3aJqR","date":"_styles-module__date__2c9og"};

var Item = function Item(_ref) {
  var className = _ref.className,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? 'div' : _ref$Component,
      data = _ref.data,
      deleteAction = _ref.deleteAction,
      renderContent = _ref.renderContent,
      rest = _objectWithoutPropertiesLoose(_ref, ["className", "Component", "data", "deleteAction", "renderContent"]);

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var ref = React.useRef(null);

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
  settings: function settings() {
    return '/settings';
  }
};

var useListViewSwitcher = (function (id, defaultValue) {
  if (defaultValue === void 0) {
    defaultValue = 'list';
  }

  var _useState = React.useState(null),
      value = _useState[0],
      setValue = _useState[1];

  React.useEffect(function () {
    var savedValue = localStorage.getItem("list-view-value-" + id);
    if (savedValue) setValue(savedValue);else setValue(defaultValue);
  }, []);

  var onChange = function onChange(value) {
    setValue(value);
    localStorage.setItem("list-view-value-" + id, value);
  };

  return [value, onChange];
});

var css$s = {"list":"_styles-module__list__3CcWo","header":"_styles-module__header__3MHvB","title":"_styles-module__title__2HbVV","headerSide":"_styles-module__headerSide__TN8Ts","search":"_styles-module__search__3VlZv","uploadButton":"_styles-module__uploadButton__35PkI","controls":"_styles-module__controls__ee5au","viewSwitcher":"_styles-module__viewSwitcher__1boU7","sorting":"_styles-module__sorting__1S_L9","sortingButton":"_styles-module__sortingButton__1c0ym","message":"_styles-module__message__3XJKG","text":"_styles-module__text__1_wO5","itemList":"_styles-module__itemList__1fksy","item":"_styles-module__item__1RHsG","loadingItem":"_styles-module__loadingItem__1uHPv","stacks-pulse":"_styles-module__stacks-pulse__1qO_N","modal":"_styles-module__modal__1BJIQ","description":"_styles-module__description__1U-iN","buttons":"_styles-module__buttons__19NkE","button":"_styles-module__button__3jLaw"};

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

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var _useListViewSwitcher = useListViewSwitcher('stack-list'),
      view = _useListViewSwitcher[0],
      setView = _useListViewSwitcher[1];

  var _useState = React.useState(null),
      deletingStack = _useState[0],
      setDeletingStack = _useState[1];

  var _useState2 = React.useState(false),
      isShowWelcomeModal = _useState2[0],
      setIsShowWelcomeModal = _useState2[1];

  var _useState3 = React.useState(false),
      isShowUploadStackModal = _useState3[0],
      setIsShowUploadStackModal = _useState3[1];

  var _useState4 = React.useState(''),
      search = _useState4[0],
      setSearch = _useState4[1];

  var isInitialMount = React.useRef(true);

  var _useState5 = React.useState(null);

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

  React.useEffect(function () {
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
      Component: reactRouterDom.Link,
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

var css$t = {"howto":"_styles-module__howto__3e8x1","tabs":"_styles-module__tabs__2M-II","description":"_styles-module__description__1cd6d","code":"_styles-module__code__1VE_j","footer":"_styles-module__footer__1gsjy"};

var pullPythonCode = function pullPythonCode(data) {
  var a = ["'/" + data.stack + "'"];
  var params = Object.keys(data.params);

  if (params.length > 0) {
    var p = [];
    params.forEach(function (key) {
      if (lodashEs.isString(data.params[key])) p.push("'" + key + "': '" + data.params[key] + "'");else p.push("'" + key + "': " + data.params[key]);
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
      if (lodashEs.isString(data.params[key])) a.push("\"" + key + "\" = \"" + data.params[key] + "\"");else a.push("\"" + key + "\" = " + data.params[key]);
    });
  }

  return "library(dstack)\n\ndf <- read.csv(pull(" + a.join(', ') + "))";
};

var HowTo = function HowTo(_ref) {
  var modalMode = _ref.modalMode,
      data = _ref.data,
      configurePythonCommand = _ref.configurePythonCommand,
      configureRCommand = _ref.configureRCommand;

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var _useState = React.useState(1),
      activeCodeTab = _useState[0],
      setActiveCodeTab = _useState[1];

  var _useState2 = React.useState(1),
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
  React.useEffect(function () {
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

var css$u = {"frames":"_styles-module__frames__3D3R4","frames-dropdown":"_styles-module__frames-dropdown__3hapH","button":"_styles-module__button__Tn4o_","name":"_styles-module__name__YzOn7","label":"_styles-module__label__Hg7hs","dropdown":"_styles-module__dropdown__16pcp","item":"_styles-module__item__1q46l","mark":"_styles-module__mark__1h8Eq","info":"_styles-module__info__2BnTD","modal":"_styles-module__modal__pk61B","description":"_styles-module__description__2GOOp","buttons":"_styles-module__buttons__3Ml-A"};

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

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var _useState = React.useState(false),
      isShowDropdown = _useState[0],
      setIsShowDropdown = _useState[1];

  var toggleDropdown = function toggleDropdown() {
    return setIsShowDropdown(!isShowDropdown);
  };

  var _useState2 = React.useState(null),
      frameForMarkingAsHead = _useState2[0],
      setFrameForMarkingAsHead = _useState2[1];

  var dropdownRef = React.useRef(null);
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

var css$v = {"loader":"_styles-module__loader__2wNmt","title":"_styles-module__title__1Ms-2","stacks-pulse":"_styles-module__stacks-pulse__FjfKI","label":"_styles-module__label__1rFaq","description":"_styles-module__description__1Rg_O","diagram":"_styles-module__diagram__2Aj7C"};

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

  var _useState = React.useState(initialFormState),
      form = _useState[0],
      setForm = _useState[1];

  var _useState2 = React.useState({}),
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

var css$w = {"details":"_styles-module__details__3iAZb","section":"_styles-module__section___r9FQ","header":"_styles-module__header__2kekg","title":"_styles-module__title__1zGvd","sideHeader":"_styles-module__sideHeader__1FUDu","dropdown":"_styles-module__dropdown__3axDI","attachment-head":"_styles-module__attachment-head__282UU","description":"_styles-module__description__Y6gJz","label":"_styles-module__label__2FemD","label-tooltip":"_styles-module__label-tooltip__2Oe5S","actions":"_styles-module__actions__sZkKa","size":"_styles-module__size__Ja107","revisions":"_styles-module__revisions__bLqAO","filters":"_styles-module__filters__1-hdZ","attachment":"_styles-module__attachment__3IGZo","sidebar":"_styles-module__sidebar__U0_wY","modal":"_styles-module__modal__2TdJX","buttons":"_styles-module__buttons__RhHmq","button":"_styles-module__button__26mqa"};

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

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var didMountRef = React.useRef(false);

  var _useForm = useForm({}),
      form = _useForm.form,
      setForm = _useForm.setForm,
      onChange = _useForm.onChange;

  var _useState = React.useState({}),
      fields = _useState[0],
      setFields = _useState[1];

  var prevFrame = usePrevious(frame);

  var _useState2 = React.useState(false),
      isShowHowToModal = _useState2[0],
      setIsShowHowToModal = _useState2[1];

  var showHowToModal = function showHowToModal(event) {
    event.preventDefault();
    setIsShowHowToModal(true);
  };

  var hideHowToModal = function hideHowToModal() {
    return setIsShowHowToModal(false);
  };

  React.useEffect(function () {
    if ((!lodashEs.isEqual(prevFrame, frame) || !didMountRef.current) && frame) parseParams();
  }, [frame]);

  var findAttach = function findAttach(form, attachmentIndex) {
    var attachments = lodashEs.get(frame, 'attachments');
    var fields = Object.keys(form);
    if (!attachments) return;

    if (fields.length) {
      attachments.some(function (attach, index) {
        var valid = true;
        fields.forEach(function (key) {
          if (!attach.params || !lodashEs.isEqual(attach.params[key], form[key])) valid = false;
        });
        if (valid && !(attachmentIndex === undefined && index === 0)) onChangeAttachmentIndex(index);
        return valid;
      });
    }
  };

  var findAttachDebounce = React.useCallback(lodashEs.debounce(findAttach, 300), [data, frame]);
  React.useEffect(function () {
    if (didMountRef.current) findAttachDebounce(form, attachmentIndex);else didMountRef.current = true;
  }, [form]);

  var parseParams = function parseParams() {
    var attachments = lodashEs.get(frame, 'attachments');
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
      className: cx(css$w.filters, {
        'with-select': hasSelectField
      })
    });
  };

  var onClickDownloadAttachment = function onClickDownloadAttachment(event) {
    event.preventDefault();
    downloadAttachment();
  };

  var attachment = lodashEs.get(frame, "attachments[" + attachmentIndex + "]");
  if (loading) return /*#__PURE__*/React__default.createElement(Loader$1, null);
  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$w.details, {
      'with-sidebar': Boolean(renderSidebar)
    })
  }, /*#__PURE__*/React__default.createElement(Yield, {
    name: "header-yield"
  }, /*#__PURE__*/React__default.createElement(BackButton, {
    Component: reactRouterDom.Link,
    to: backUrl
  }, currentUser === user ? t('backToMyStacks') : t('backToStacksOF', {
    name: user
  }))), /*#__PURE__*/React__default.createElement("section", {
    className: css$w.section
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$w.header
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$w.title
  }, data.name, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-lock" + (data["private"] ? '' : '-open')
  })), renderHeader && renderHeader(), /*#__PURE__*/React__default.createElement("div", {
    className: css$w.sideHeader
  }, renderSideHeader && renderSideHeader(), data && data.user === currentUser && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$w.dropdown,
    items: [{
      title: t('upload'),
      onClick: toggleUpload
    }]
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$w['dropdown-button'],
    color: "secondary"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-dots-horizontal"
  }))))), /*#__PURE__*/React__default.createElement(Frames, {
    frames: lodashEs.get(data, 'frames', []),
    frame: currentFrameId,
    headId: headId,
    onMarkAsHead: onChangeHeadFrame,
    onChange: onChangeFrame,
    className: css$w.revisions
  }), renderFields(), attachment && /*#__PURE__*/React__default.createElement("div", {
    className: css$w['attachment-head']
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$w.description
  }, attachment.description && /*#__PURE__*/React__default.createElement(MarkdownRender, {
    source: attachment.description
  })), attachment['content_type'] === 'text/csv' && /*#__PURE__*/React__default.createElement("div", {
    className: css$w.actions
  }, attachment.preview && /*#__PURE__*/React__default.createElement("div", {
    className: css$w.label
  }, t('preview'), /*#__PURE__*/React__default.createElement("div", {
    className: css$w['label-tooltip']
  }, t('theTableBelowShowsOnlyAPreview'))), /*#__PURE__*/React__default.createElement("a", {
    href: "#",
    onClick: showHowToModal
  }, t('useThisStackViaAPI')), /*#__PURE__*/React__default.createElement("span", null, t('or')), /*#__PURE__*/React__default.createElement("a", {
    href: "#",
    onClick: onClickDownloadAttachment
  }, t('download')), attachment.length && /*#__PURE__*/React__default.createElement("span", {
    className: css$w.size
  }, "(", formatBytes(attachment.length), ")"))), frame && /*#__PURE__*/React__default.createElement(Attachment, {
    className: css$w.attachment,
    withLoader: true,
    stack: user + "/" + stack,
    frameId: frame.id,
    id: attachmentIndex || 0
  })), Boolean(renderSidebar) && /*#__PURE__*/React__default.createElement("aside", {
    className: css$w.sidebar
  }, renderSidebar()), /*#__PURE__*/React__default.createElement(Modal, {
    isShow: isShowHowToModal,
    withCloseButton: true,
    onClose: hideHowToModal,
    size: "big",
    title: t('howToFetchDataUsingTheAPI'),
    className: css$w.modal
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
  return React.useCallback(lodashEs.debounce(callback, delay), deps);
});

var css$x = {"upload":"_style-module__upload__1HGtr","content":"_style-module__content__zyXjr","subtitle":"_style-module__subtitle__2QLXi","field":"_style-module__field__2kyid","dragndrop":"_style-module__dragndrop__1_81H","buttons":"_style-module__buttons__1PXB0","button":"_style-module__button__1nx-b"};

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

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var _useState = React.useState(false),
      isShowModal = _useState[0],
      setIsShowModal = _useState[1];

  var _useState2 = React.useState(null),
      uploading = _useState2[0],
      setUploading = _useState2[1];

  var _useState3 = React.useState(null),
      progress = _useState3[0],
      setProgress = _useState3[1];

  var _useState4 = React.useState(null),
      file = _useState4[0],
      setFile = _useState4[1];

  var isDidMount = React.useRef(true);

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
  React.useEffect(function () {
    if (!isDidMount.current) runValidation();else isDidMount.current = false;
  }, [form.stack]);
  React.useEffect(function () {
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
        id: uuid.v4(),
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

  return /*#__PURE__*/React__default.createElement(React.Fragment, null, withButton && /*#__PURE__*/React__default.createElement(Tooltip, {
    overlayContent: t('uploadTooltip')
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: cx(css$x.upload, className),
    size: "small",
    color: "secondary",
    onClick: toggleModal
  }, t('upload'))), /*#__PURE__*/React__default.createElement(Modal, {
    title: t('uploadFile'),
    isShow: isShowModal,
    size: "small"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$x.content
  }, !stack && /*#__PURE__*/React__default.createElement(React.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: css$x.subtitle
  }, t('theUploadedFileWouldBeSavedAsANewStack')), /*#__PURE__*/React__default.createElement(TextField, {
    size: "middle",
    className: css$x.field,
    name: "stack",
    onChange: onChange,
    value: form.value,
    maxLength: 30,
    placeholder: t('stackName') + ", " + t('noSpaces') + ", " + t('maxSymbol', {
      count: 30
    }),
    errors: getErrorsText('stack')
  })), stack && file && /*#__PURE__*/React__default.createElement("div", {
    className: css$x.subtitle
  }, t('theUploadedFileWouldBeSavedAsANewRevisionOfTheStack')), /*#__PURE__*/React__default.createElement(FileDragnDrop$1, {
    className: css$x.dragndrop,
    formats: ['.csv', '.png', '.svg', '.jpg'],
    onChange: setFile,
    loading: uploading,
    progressPercent: progress
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$x.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$x.button,
    variant: "contained",
    color: "primary",
    disabled: !file || !form.stack.length || uploading,
    onClick: submit
  }, t('save')), /*#__PURE__*/React__default.createElement(Button, {
    onClick: closeHandle,
    className: css$x.button,
    variant: "contained",
    color: "secondary",
    disabled: uploading
  }, t('cancel')))));
};

var css$y = {"upload":"_style-module__upload__2UOiz","content":"_style-module__content__22x3Q","subtitle":"_style-module__subtitle__2sXDC","field":"_style-module__field__3icVJ","dragndrop":"_style-module__dragndrop__30Hxh","buttons":"_style-module__buttons__3VDuj","button":"_style-module__button__2bzId"};

var MB$1 = 1048576;

var Upload$1 = function Upload(_ref) {
  var stack = _ref.stack,
      className = _ref.className,
      refresh = _ref.refresh,
      apiUrl = _ref.apiUrl,
      user = _ref.user;

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var _useState = React.useState(null),
      uploading = _useState[0],
      setUploading = _useState[1];

  var _useState2 = React.useState(null),
      progress = _useState2[0],
      setProgress = _useState2[1];

  var _useState3 = React.useState(null),
      file = _useState3[0],
      setFile = _useState3[1];

  var isDidMount = React.useRef(true);
  var fileFieldRef = React.useRef(null);

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
  React.useEffect(function () {
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
        id: uuid.v4(),
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
    className: cx(css$y.upload, className)
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$y.content
  }, !stack && /*#__PURE__*/React__default.createElement(React.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: css$y.subtitle
  }, t('stackName')), /*#__PURE__*/React__default.createElement(TextField, {
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
    ref: fileFieldRef,
    className: css$y.dragndrop,
    formats: ['.csv', '.png', '.svg', '.jpg'],
    onChange: setFile,
    loading: uploading,
    progressPercent: progress
  })), file && /*#__PURE__*/React__default.createElement("div", {
    className: css$y.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$y.button,
    variant: "contained",
    color: "primary",
    disabled: !file || !form.stack.length || uploading,
    onClick: submit
  }, t('save')), /*#__PURE__*/React__default.createElement(Button, {
    onClick: clearForm,
    className: css$y.button,
    variant: "contained",
    color: "secondary",
    disabled: uploading
  }, t('cancel'))));
};

var css$z = {"howto":"_styles-module__howto__362z-","tabs":"_styles-module__tabs__h6zun","description":"_styles-module__description__SODNv","code":"_styles-module__code__WU2Z-","footer":"_styles-module__footer__1DRv-"};

var UploadStack = function UploadStack(_ref) {
  var user = _ref.user,
      refresh = _ref.refresh,
      apiUrl = _ref.apiUrl,
      configurePythonCommand = _ref.configurePythonCommand,
      configureRCommand = _ref.configureRCommand;

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var _useState = React.useState(1),
      activeCodeTab = _useState[0],
      setActiveCodeTab = _useState[1];

  var _useState2 = React.useState(1),
      activePlatformTab = _useState2[0],
      setActivePlatformTab = _useState2[1];

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$z.howto
  }, /*#__PURE__*/React__default.createElement(Tabs, {
    className: css$z.tabs,
    value: activeCodeTab,
    onChange: setActiveCodeTab,
    tabs: [{
      label: t('python'),
      value: 1
    }, {
      label: t('r'),
      value: 2
    }, {
      label: t('upload'),
      value: 3
    }]
  }), activeCodeTab === 1 && /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: css$z.description
  }, t('installPipOrCondaPackage')), /*#__PURE__*/React__default.createElement(Tabs, {
    className: css$z.tabs,
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
    className: css$z.code,
    language: "bash"
  }, "pip install dstack"), activePlatformTab === 2 && /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$z.code,
    language: "bash"
  }, "conda install dstack -c dstack.ai"), /*#__PURE__*/React__default.createElement("div", {
    className: css$z.description
  }, t('configureDStack')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$z.code,
    language: "bash"
  }, configurePythonCommand), /*#__PURE__*/React__default.createElement("div", {
    className: css$z.description
  }, t('reportPlotIntro')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$z.code,
    language: "python"
  }, reportPlotPythonCode)), activeCodeTab === 2 && /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("div", {
    className: css$z.description
  }, t('installRPackage')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$z.code,
    language: "r"
  }, installRPackageCode), /*#__PURE__*/React__default.createElement("div", {
    className: css$z.description
  }, t('configureDStack')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$z.code,
    language: "r"
  }, configureRCommand), /*#__PURE__*/React__default.createElement("div", {
    className: css$z.description
  }, t('reportPlotIntro')), /*#__PURE__*/React__default.createElement(CodeViewer, {
    className: css$z.code,
    language: "r"
  }, reportPlotRCode)), activeCodeTab === 3 && /*#__PURE__*/React__default.createElement(Upload$1, {
    user: user,
    refresh: refresh,
    apiUrl: apiUrl
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$z.footer,
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

var GridContext = React.createContext({
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
}(React.Component);

var DnDItem = React.memo(function (_ref) {
  var id = _ref.id,
      onMoveItem = _ref.onMoveItem,
      children = _ref.children;
  var ref = React.useRef(null);

  var _useDrag = reactDnd.useDrag({
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

  var _useDrop = reactDnd.useDrop({
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

var css$A = {"loader":"_styles-module__loader__2RpBO","text":"_styles-module__text__3gk1Z","dashboards-details-pulse":"_styles-module__dashboards-details-pulse__3HZ82","filters":"_styles-module__filters__3ZZJL","grid":"_styles-module__grid__ZafPr","item":"_styles-module__item__LIYeR"};

var Loader$2 = function Loader(_ref) {
  _objectDestructuringEmpty(_ref);

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$A.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$A.text
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$A.filters
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$A.grid
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$A.item
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$A.item
  })));
};

var css$B = {"card":"_styles-module__card__17jo7","inner":"_styles-module__inner__YLuSm","head":"_styles-module__head__2dKop","name":"_styles-module__name__1blF_","nameEdit":"_styles-module__nameEdit__3omHN","nameValue":"_styles-module__nameValue__wx2sM","info":"_styles-module__info__1Tbhc","dropdown":"_styles-module__dropdown__1NvWp","button":"_styles-module__button__d6fLT","move":"_styles-module__move__312qk","link":"_styles-module__link__NfDp4","infoTime":"_styles-module__infoTime__2QMrW","emptyMessage":"_styles-module__emptyMessage__7aBhX","attachment":"_styles-module__attachment__2ajkc"};

var Card = React.memo(function (_ref) {
  var data = _ref.data,
      className = _ref.className,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'grid' : _ref$type,
      deleteCard = _ref.deleteCard,
      updateCardTitle = _ref.updateCardTitle,
      filters = _ref.filters,
      forwardedRef = _ref.forwardedRef,
      moveAvailable = _ref.moveAvailable;

  var _useState = React.useState(data.title),
      title = _useState[0],
      setTitle = _useState[1];

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var headId = lodashEs.get(data, 'head.id');
  var stackOwner = data.stack.split('/')[0];

  var _useState2 = React.useState(0),
      attachmentIndex = _useState2[0],
      setAttachmentIndex = _useState2[1];

  var _useState3 = React.useState([]),
      cardParams = _useState3[0],
      setCardParams = _useState3[1];

  React.useEffect(function () {
    var params = parseStackParams(lodashEs.get(data, 'head.attachments', []));
    if (params) setCardParams(Object.keys(params));
  }, [data]);
  React.useEffect(function () {
    findAttach();
  }, [filters]);

  var findAttach = function findAttach() {
    var attachments = lodashEs.get(data, 'head.attachments');
    var fields = Object.keys(filters).filter(function (f) {
      return cardParams.indexOf(f) >= 0;
    });
    if (!attachments) return;

    if (fields.length) {
      attachments.some(function (attach, index) {
        var valid = true;
        fields.forEach(function (key) {
          if (!attach.params || !lodashEs.isEqual(attach.params[key], filters[key])) valid = false;
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
    className: cx(css$B.card, "type-" + type, className),
    ref: forwardedRef
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$B.inner
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$B.head
  }, /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$B.name, {
      readonly: !updateCardTitle
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$B.nameValue
  }, title.length ? title : t('title')), /*#__PURE__*/React__default.createElement("input", {
    value: title,
    type: "text",
    placeholder: t('title'),
    onChange: onChangeTitle,
    className: cx(css$B.nameEdit, {
      active: !title.length
    })
  })), /*#__PURE__*/React__default.createElement(Tooltip, {
    overlayContent: /*#__PURE__*/React__default.createElement(React.Fragment, null, /*#__PURE__*/React__default.createElement("div", null, t('updatedByName', {
      name: stackOwner
    })), data.head && /*#__PURE__*/React__default.createElement("div", {
      className: css$B.infoTime
    }, moment(data.head.timestamp).format('D MMM YYYY')))
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$B.info
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-information-outline"
  }))), /*#__PURE__*/React__default.createElement(Button, {
    className: cx(css$B.button, css$B.link),
    color: "secondary",
    Component: reactRouterDom.Link,
    to: "/" + data.stack
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-open-in-new"
  })), Boolean(deleteCard) && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$B.dropdown,
    items: [].concat(deleteCard ? [{
      title: t('delete'),
      onClick: deleteCard
    }] : [])
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$B.button,
    color: "secondary"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-dots-horizontal"
  }))), moveAvailable && /*#__PURE__*/React__default.createElement(Button, {
    className: cx(css$B.button, css$B.move),
    color: "secondary"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-cursor-move"
  }))), headId ? /*#__PURE__*/React__default.createElement(Attachment, {
    className: css$B.attachment,
    isList: true,
    withLoader: true,
    stack: data.stack,
    frameId: headId,
    id: attachmentIndex
  }) : /*#__PURE__*/React__default.createElement("div", {
    className: css$B.emptyMessage
  }, t('emptyDashboard'))));
});

var css$C = {"details":"_styles-module__details__2U9YD","header":"_styles-module__header__2Lioj","title":"_styles-module__title__353_b","edit":"_styles-module__edit__14H-Y","sideHeader":"_styles-module__sideHeader__3zX4a","dropdown":"_styles-module__dropdown__1OYBD","section":"_styles-module__section__3ZM3A","cards":"_styles-module__cards__2idlU","fields":"_styles-module__fields__3zxn3","filters":"_styles-module__filters__QjWiF","controls":"_styles-module__controls__9DqNJ","addButton":"_styles-module__addButton__ezy69","viewSwitcher":"_styles-module__viewSwitcher__2LheQ","empty":"_styles-module__empty__j9SPi"};

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

  var _useContext = React.useContext(GridContext),
      items = _useContext.items,
      moveItem = _useContext.moveItem,
      setItems = _useContext.setItems;

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var _useState = React.useState('grid'),
      view = _useState[0],
      setView = _useState[1];

  var _useForm = useForm({}),
      form = _useForm.form,
      setForm = _useForm.setForm,
      onChange = _useForm.onChange;

  var _useState2 = React.useState({}),
      fields = _useState2[0],
      setFields = _useState2[1];

  var prevData = usePrevious(data);
  var isDidMount = React.useRef(true);
  var onChangeTitleDebounce = React.useCallback(lodashEs.debounce(onChangeTitle, 300), []);

  var setGridItems = function setGridItems(cardsItems) {
    return setItems(cardsItems.map(function (card) {
      return {
        id: card.index,
        card: card
      };
    }));
  };

  React.useEffect(function () {
    if (window) window.dispatchEvent(new Event('resize'));
  }, [view]);
  React.useEffect(function () {
    if (cards) setGridItems(cards);
    return function () {
      return setGridItems([]);
    };
  }, [cards]);
  React.useEffect(function () {
    if ((!lodashEs.isEqual(prevData, data) || isDidMount.current) && data) parseParams();
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
      var cardFields = parseStackParams(lodashEs.get(card, 'head.attachments', [])) || {};
      Object.keys(cardFields).forEach(function (fieldName) {
        if (result[fieldName]) {
          if (cardFields[fieldName].type === 'select') {
            result[fieldName].options = lodashEs.unionBy(result[fieldName].options, cardFields[fieldName].options, 'value');
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
      className: cx(css$C.filters, {
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
  var CardWrapComponent = withSorting ? DnDItem : React.Fragment;
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$C.details
  }, /*#__PURE__*/React__default.createElement(Yield, {
    name: "header-yield"
  }, /*#__PURE__*/React__default.createElement(BackButton, {
    Component: reactRouterDom.Link,
    to: backUrl
  }, currentUser === user ? t('backToDashboards') : t('backToDashboardsOf', {
    name: user
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: css$C.header
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$C.title
  }, /*#__PURE__*/React__default.createElement(StretchTitleField, {
    className: css$C.edit,
    value: data === null || data === void 0 ? void 0 : data.title,
    onChange: onChangeTitleDebounce,
    readOnly: currentUser !== data.user,
    placeholder: t('newDashboard')
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-lock" + (data["private"] ? '' : '-open')
  })), renderHeader && renderHeader(), /*#__PURE__*/React__default.createElement("div", {
    className: css$C.sideHeader
  }, renderSideHeader && renderSideHeader(), Boolean(deleteDashboard) && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$C.dropdown,
    items: [].concat(Boolean(deleteDashboard) ? [{
      title: t('delete'),
      onClick: deleteDashboard
    }] : [])
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$C['dropdown-button'],
    color: "secondary"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-dots-horizontal"
  }))))), Boolean(items.length) && /*#__PURE__*/React__default.createElement(React.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: css$C.section
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$C.fields
  }, renderFilters()), /*#__PURE__*/React__default.createElement("div", {
    className: css$C.controls
  }, getAddClickAction() && /*#__PURE__*/React__default.createElement("a", {
    className: css$C.addButton,
    onClick: getAddClickAction(),
    href: "#"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-plus"
  }), t('addStack')), /*#__PURE__*/React__default.createElement(ViewSwitcher, {
    value: view,
    className: css$C.viewSwitcher,
    onChange: function onChange(view) {
      return setView(view);
    }
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$C.cards, view)
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
    className: css$C.empty
  }, t('thereAreNoStacksYet'), " ", /*#__PURE__*/React__default.createElement("br", null), t('youCanSendStacksYouWantToBeHereLaterOrAddItRightNow'), getAddClickAction() && /*#__PURE__*/React__default.createElement(React.Fragment, null, ' ', /*#__PURE__*/React__default.createElement("a", {
    className: css$C.addButton,
    onClick: getAddClickAction(),
    href: "#"
  }, t('addStack')), ".")));
};

var css$D = {"item":"_styles-module__item__3urCL","preview":"_styles-module__preview__cxR4e","label":"_styles-module__label__tCzQe","previewWrap":"_styles-module__previewWrap__15fuU","emptyMessage":"_styles-module__emptyMessage__2pDKf","attachment":"_styles-module__attachment__35KB8","section":"_styles-module__section__LeHWu","content":"_styles-module__content__Bgbe4","name":"_styles-module__name__2PrtI","by":"_styles-module__by__1_qsJ","permissions":"_styles-module__permissions__3ZdE1","dropdown":"_styles-module__dropdown__vK4SD","preview-stack-pulse":"_styles-module__preview-stack-pulse__3NFJT"};

var Item$1 = function Item(_ref) {
  var dashboard = _ref.dashboard,
      deleteDashboard = _ref.deleteDashboard,
      user = _ref.user,
      renderContent = _ref.renderContent;

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var ref = React.useRef(null);
  var hasStacks = dashboard.cards && Boolean(dashboard.cards.length);
  var card = dashboard.cards.find(function (c) {
    return lodashEs.get(c, 'head.id');
  });

  var onClickDelete = function onClickDelete() {
    deleteDashboard({
      user: user,
      id: dashboard.id
    });
  };

  var isShowDropdown = Boolean(deleteDashboard);
  return /*#__PURE__*/React__default.createElement(reactRouterDom.Link, {
    to: "/" + user + "/d/" + dashboard.id,
    className: css$D.item,
    ref: ref
  }, Boolean(dashboard.cards.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$D.label
  }, t('stacksWithCount', {
    count: dashboard.cards.length
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$D.previewWrap
  }, hasStacks ? /*#__PURE__*/React__default.createElement(Attachment, {
    className: css$D.attachment,
    isList: true,
    withLoader: true,
    frameId: card.head.id,
    stack: card.stack,
    id: 0
  }) : /*#__PURE__*/React__default.createElement("div", {
    className: css$D.emptyMessage
  }, t('emptyDashboard'))), /*#__PURE__*/React__default.createElement("div", {
    className: css$D.section
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$D.content
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$D.name
  }, dashboard.title, ' ', /*#__PURE__*/React__default.createElement("span", {
    className: "mdi mdi-lock" + (dashboard["private"] ? '' : '-open')
  })), user !== dashboard.user && /*#__PURE__*/React__default.createElement("div", {
    className: css$D.by
  }, t('by'), " ", dashboard.user), renderContent && renderContent(dashboard)), isShowDropdown && /*#__PURE__*/React__default.createElement(Dropdown, {
    className: css$D.dropdown,
    items: [{
      title: t('delete'),
      onClick: onClickDelete
    }]
  })));
};

var css$E = {"loader":"_styles-module__loader__PK0JP","text":"_styles-module__text__1F-rx","dashboards-pulse":"_styles-module__dashboards-pulse__29IbF","grid":"_styles-module__grid__ef-jq","item":"_styles-module__item__1HBd8","pic":"_styles-module__pic__1z0LR","section":"_styles-module__section__14O5G"};

var Loader$3 = function Loader(_ref) {
  _objectDestructuringEmpty(_ref);

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$E.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$E.text
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$E.grid
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$E.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$E.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$E.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$E.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$E.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$E.section
  }))));
};

var css$F = {"list":"_styles-module__list__2tGd9","title":"_styles-module__title__lNufF","search":"_styles-module__search__3Vnt-","mobileSearch":"_styles-module__mobileSearch__28J_R","text":"_styles-module__text__2QiEZ","grid":"_styles-module__grid__31LQw","add":"_styles-module__add__1VMC5","caption":"_styles-module__caption__pTzl3"};

var List$1 = function List(_ref) {
  var addDashboard = _ref.addDashboard,
      addDashboardDisable = _ref.addDashboardDisable,
      currentUser = _ref.currentUser,
      data = _ref.data,
      deleteDashboard = _ref.deleteDashboard,
      loading = _ref.loading,
      user = _ref.user,
      renderItemContent = _ref.renderItemContent;

  var _useState = React.useState(''),
      search = _useState[0],
      setSearch = _useState[1];

  var _useTranslation = reactI18next.useTranslation(),
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
    className: css$F.list
  }, /*#__PURE__*/React__default.createElement(Yield, {
    name: "header-yield"
  }, /*#__PURE__*/React__default.createElement(SearchField, {
    showEverything: true,
    isDark: true,
    className: css$F.search,
    placeholder: t('findDashboard'),
    size: "small",
    value: search,
    onChange: onChangeSearch
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$F.title
  }, currentUser === user ? t('myDashboards') : t('dashboardsOf', {
    name: user
  }), data && Boolean(data.length) && /*#__PURE__*/React__default.createElement("span", null, data.length)), data && Boolean(data.length) && /*#__PURE__*/React__default.createElement(SearchField, {
    placeholder: t('search'),
    className: css$F.mobileSearch,
    showEverything: true,
    size: "small",
    value: search,
    onChange: onChangeSearch
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$F.grid
  }, currentUser === user && /*#__PURE__*/React__default.createElement("div", {
    onClick: addDashboard,
    className: cx(css$F.add, {
      disabled: addDashboardDisable
    })
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$F.caption
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

var css$G = {"loader":"_styles-module__loader__FMgKh","text":"_styles-module__text__3kMB4","stacks-pulse":"_styles-module__stacks-pulse__2uZ4b","grid":"_styles-module__grid__1i-Vy","item":"_styles-module__item__3Q6le","pic":"_styles-module__pic__2gd5L","section":"_styles-module__section__BzTYi"};

var Loader$4 = function Loader(_ref) {
  _objectDestructuringEmpty(_ref);

  return /*#__PURE__*/React__default.createElement("div", {
    className: css$G.loader
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$G.text
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$G.grid
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$G.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$G.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$G.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$G.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$G.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$G.section
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$G.item
  }, /*#__PURE__*/React__default.createElement("div", {
    className: css$G.pic
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$G.section
  }))));
};

var css$H = {"stacks":"_style-module__stacks__1YlOe","grid":"_style-module__grid__2Xblj","search":"_style-module__search__2JDJR","message":"_style-module__message__30aty","text":"_style-module__text__1qJHA","item":"_style-module__item__1AIvq","checkbox":"_style-module__checkbox__I8MzQ","buttons":"_style-module__buttons__3uEfC","button":"_style-module__button__22J0P"};

var AddStacksModal = function AddStacksModal(_ref) {
  var _ref$stacks = _ref.stacks,
      stacks = _ref$stacks === void 0 ? [] : _ref$stacks,
      loading = _ref.loading,
      isShow = _ref.isShow,
      onClose = _ref.onClose,
      onAddStacks = _ref.onAddStacks,
      currentUser = _ref.currentUser,
      user = _ref.user;

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  var params = reactRouter.useParams();

  var _useState = React.useState(''),
      searchQuery = _useState[0],
      setSearchQuery = _useState[1];

  var _useState2 = React.useState([]),
      selected = _useState2[0],
      setSelected = _useState2[1];

  React.useEffect(function () {
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
    dialogClassName: css$H.stacks,
    isShow: isShow,
    title: t('selectStacks'),
    onClose: onClose,
    withCloseButton: true
  }, !loading && Boolean(stacks.length) && /*#__PURE__*/React__default.createElement(SearchField, {
    className: css$H.search,
    isDark: true,
    size: "middle",
    showEverything: true,
    placeholder: t('findStack'),
    value: searchQuery,
    onChange: onChangeSearch
  }), loading && /*#__PURE__*/React__default.createElement(Loader$4, null), !loading && !stacks.length && /*#__PURE__*/React__default.createElement("div", {
    className: css$H.message
  }, user === currentUser ? t('youHaveNoStacksYet') : t('theUserHasNoStacksYetByName', {
    name: params.user
  })), !loading && Boolean(stacks.length && !items.length) && /*#__PURE__*/React__default.createElement("div", {
    className: css$H.text
  }, t('noStacksAreFoundedMatchedTheSearchCriteria')), !loading && Boolean(stacks.length && items.length) && /*#__PURE__*/React__default.createElement(React.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: css$H.grid
  }, items.map(function (item, index) {
    return /*#__PURE__*/React__default.createElement("div", {
      className: css$H.item,
      key: index,
      onClick: getOnClickStack(item)
    }, /*#__PURE__*/React__default.createElement(CheckboxField, {
      className: css$H.checkbox,
      value: isChecked(item),
      readOnly: true
    }), /*#__PURE__*/React__default.createElement(Item, {
      data: item,
      otherOwner: params.user !== item.user
    }));
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$H.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    className: css$H.button,
    color: "primary",
    variant: "contained",
    disabled: !selected.length,
    onClick: submit
  }, t('addSelectedStacks')), /*#__PURE__*/React__default.createElement(Button, {
    className: css$H.button,
    color: "secondary",
    variant: "contained",
    onClick: onClose
  }, t('cancel')))));
};

var logo = require("./logo~gyFSAwBb.svg");

var css$I = {"header":"_styles-module__header__3C4T1","logo":"_styles-module__logo__1jfuS","buttons":"_styles-module__buttons__2EQYi","button":"_styles-module__button__3cb7N"};

var Header = function Header(_ref) {
  var className = _ref.className;

  var _useTranslation = reactI18next.useTranslation(),
      t = _useTranslation.t;

  return /*#__PURE__*/React__default.createElement("div", {
    className: cx(css$I.header, className)
  }, /*#__PURE__*/React__default.createElement(reactRouterDom.Link, {
    to: "/",
    className: css$I.logo
  }, /*#__PURE__*/React__default.createElement("img", {
    width: "129",
    height: "35",
    src: logo,
    alt: "logo"
  })), /*#__PURE__*/React__default.createElement("div", {
    className: css$I.buttons
  }, /*#__PURE__*/React__default.createElement(Button, {
    Component: reactRouterDom.Link,
    to: "/auth/login",
    className: css$I.button,
    color: "primary"
  }, t('logIn'))));
};

var css$J = {"layout":"_styles-module__layout__23bi3","header":"_styles-module__header__1chFa","main":"_styles-module__main__70hee"};

var UnAuthorizedLayout = function UnAuthorizedLayout(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React__default.createElement("div", {
    className: css$J.layout
  }, /*#__PURE__*/React__default.createElement(Header, {
    className: css$J.header
  }), /*#__PURE__*/React__default.createElement("div", {
    className: css$J.main
  }, children));
};

Object.defineProperty(exports, 'DndProvider', {
    enumerable: true,
    get: function () {
        return reactDnd.DndProvider;
    }
});
exports.AccessForbidden = AccessForbidden;
exports.Avatar = Avatar;
exports.BackButton = BackButton;
exports.Button = Button;
exports.CheckboxField = CheckboxField;
exports.CodeViewer = CodeViewer;
exports.Copy = Copy;
exports.DashboardAddStacksModal = AddStacksModal;
exports.DashboardDetails = Details$1;
exports.DashboardList = List$1;
exports.DashboardListItem = Item$1;
exports.DnDGridContext = GridContext;
exports.DnDGridContextProvider = GridProvider;
exports.DnDItem = DnDItem;
exports.Dropdown = Dropdown;
exports.FileDragnDrop = FileDragnDrop$1;
exports.Loader = Loader;
exports.MarkdownRender = MarkdownRender;
exports.Modal = Modal;
exports.NotFound = NotFound;
exports.ProgressBar = ProgressBar;
exports.SearchField = SearchField;
exports.SelectField = SelectField;
exports.SliderField = SliderField;
exports.Spinner = Spinner;
exports.StackAttachment = Attachment;
exports.StackAttachmentProvider = StateProvider;
exports.StackDetails = Details;
exports.StackFilters = StackFilters;
exports.StackFrames = Frames;
exports.StackHowToFetchData = HowTo;
exports.StackList = List;
exports.StackListItem = Item;
exports.StackUpload = Upload;
exports.StretchTitleField = StretchTitleField;
exports.Tabs = Tabs;
exports.TextAreaField = TextAreaField;
exports.TextField = TextField;
exports.Tooltip = Tooltip;
exports.UnAuthorizedLayout = UnAuthorizedLayout;
exports.UploadStack = UploadStack;
exports.ViewSwitcher = ViewSwitcher;
exports.Yield = Yield;
exports.config = config;
//# sourceMappingURL=index.js.map
